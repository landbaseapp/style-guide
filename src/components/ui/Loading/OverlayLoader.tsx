import { Loading } from 'src/components/ui/Loading';

export const OverlayLoader = () => {
  return (
    <div className="fixed inset-0 z-[100]">
      {/* background overlay */}
      <div className="absolute inset-0 bg-on-disabled opacity-50" />

      {/* loading spinner */}
      <div className="relative flex items-center justify-center w-full h-full">
        <Loading className="text-primary" size={40} />
      </div>
    </div>
  );
};
