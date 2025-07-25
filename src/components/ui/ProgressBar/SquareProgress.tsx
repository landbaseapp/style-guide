export const SquareProgress = () => (
  <div
    className="w-4 h-4 grid scale-x-[-1] animate-lb-line"
    style={{
      gridArea: '1/1',
      backgroundImage: `
        linear-gradient(90deg, #0000 calc(100% / 3), #00a09a 0 calc(2 * 100% / 3), #0000 0),
        linear-gradient(0deg, #0000 calc(100% / 3), #00a09a 0 calc(2 * 100% / 3), #0000 0),
        linear-gradient(90deg, #0000 calc(100% / 3), #00a09a 0 calc(2 * 100% / 3), #0000 0),
        linear-gradient(0deg, #0000 calc(100% / 3), #00a09a 0 calc(2 * 100% / 3), #0000 0)
      `,
      backgroundSize: '300% 2px, 2px 300%',
      backgroundRepeat: 'no-repeat',
    }}
  />
);
