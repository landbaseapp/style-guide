import { defineConfig, Plugin, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from '@svgr/rollup';
import tailwindcss from '@tailwindcss/vite';

const muteWarningsPlugin = (warningsToIgnore: string[][]): Plugin => {
  const mutedMessages = new Set();
  return {
    name: 'mute-warnings',
    enforce: 'pre',
    config: (userConfig) => ({
      build: {
        rollupOptions: {
          onwarn(warning, defaultHandler) {
            if (warning.code) {
              const muted = warningsToIgnore.find(
                ([code, message]) => code == warning.code && warning.message.includes(message)
              );

              if (muted) {
                mutedMessages.add(muted.join());
                return;
              }
            }

            if (userConfig.build?.rollupOptions?.onwarn) {
              userConfig.build.rollupOptions.onwarn(warning, defaultHandler);
            } else {
              defaultHandler(warning);
            }
          },
        },
      },
    }),
    closeBundle() {
      const diff = warningsToIgnore.filter((x) => !mutedMessages.has(x.join()));
      if (diff.length > 0) {
        this.warn('Some of your muted warnings never appeared during the build process:');
        diff.forEach((m) => this.warn(`- ${m.join(': ')}`));
      }
    },
  };
};

const warningsToIgnore = [
  ['SOURCEMAP_ERROR', "Can't resolve original location of error"],
  ['INVALID_ANNOTATION', 'contains an annotation that Rollup cannot interpret'],
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss(), muteWarningsPlugin(warningsToIgnore)],

  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      'react-virtualized': path.resolve(__dirname, 'node_modules/react-virtualized/dist/commonjs'),
    },
  },

  optimizeDeps: {
    include: ['react-virtualized'],
  },

  server: {
    watch: {
      usePolling: true,
    },
  },

  test: {
    coverage: {
      reporter: ['lcov', 'html'],
      provider: 'v8',
      include: ['**/*.ts'],
      exclude: [
        '**/*.tsx',
        '**/index.ts',
        '**/constants.ts',
        '**/index.type.ts',
        '**/schema.ts',
        '**/types.ts',
        '**/*.api.ts',
        '**/config.ts',
        '**/*.config.ts',
        '**/style.ts',
        '**/*.model.ts',
        'vite.config.ts',
        '.storybook/**',
        '**/*.d.ts',
        'constants/**',
      ],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
  },
} as UserConfig);
