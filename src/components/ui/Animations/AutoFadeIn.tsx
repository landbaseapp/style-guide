import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

export const AutoFadeInContext = React.createContext<{
  mountAnimation: (viewId: string, animationDelayMs: number) => number;
  unmount: (viewId: string, animationDelayMs: number) => void;
  animationFinished: (viewId: string, animationDelayMs: number) => void;
  isAllAnimationFinished: boolean;
  debugViewSet: Set<string>;
}>({
  mountAnimation: () => 0,
  unmount: () => 0,
  animationFinished: () => 0,
  isAllAnimationFinished: true,
  debugViewSet: new Set(),
});

export const AutoFadeInProvider = ({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) => {
  const viewSetRef = useRef(new Set<string>());
  const animationFinishedViewSetRef = useRef(new Set<string>());
  const animationDelayMsRef = useRef(0);
  const [isAllAnimationFinished, setAllAnimationFinished] = useState(true);

  const mountAnimation = useCallback((viewId: string, animationDelayMs: number) => {
    if (!enabled) return 0;

    if (!viewSetRef.current.has(viewId)) {
      viewSetRef.current.add(viewId);
      animationFinishedViewSetRef.current.delete(viewId);
      animationDelayMsRef.current += animationDelayMs;
      setAllAnimationFinished(false);
    }

    return animationDelayMsRef.current;
  }, []);

  const animationFinished = useCallback((viewId: string, animationDelayMs: number) => {
    if (!enabled) return 0;

    if (!animationFinishedViewSetRef.current.has(viewId)) {
      animationFinishedViewSetRef.current.add(viewId);
      animationDelayMsRef.current = Math.max(0, animationDelayMsRef.current - animationDelayMs);
      setAllAnimationFinished(calcIsAllAnimationFinished());
    }

    return animationDelayMsRef.current;
  }, []);

  const unmount = useCallback((viewId: string, animationDelayMs: number) => {
    if (!enabled) return 0;

    if (!animationFinishedViewSetRef.current.has(viewId)) {
      animationFinishedViewSetRef.current.add(viewId);
      animationDelayMsRef.current = Math.max(0, animationDelayMsRef.current - animationDelayMs);
      setAllAnimationFinished(calcIsAllAnimationFinished());
    }
    return animationDelayMsRef.current;
  }, []);

  const calcIsAllAnimationFinished = useCallback(() => {
    if (!enabled) return true;

    for (const viewId of viewSetRef.current.values()) {
      if (!animationFinishedViewSetRef.current.has(viewId)) {
        return false;
      }
    }

    return true;
  }, []);

  return (
    <AutoFadeInContext.Provider
      value={{
        mountAnimation,
        unmount,
        animationFinished,
        isAllAnimationFinished: isAllAnimationFinished,
        debugViewSet: viewSetRef.current,
      }}
    >
      {children}
    </AutoFadeInContext.Provider>
  );
};

export const AutoFadeInAnimation = ({
  children,
  viewId,
  animationDelayMs,
}: {
  children: React.ReactNode;
  viewId: string;
  animationDelayMs: number;
}) => {
  const { mountAnimation, animationFinished, unmount } = useContext(AutoFadeInContext);
  const delayRef = useRef(mountAnimation(viewId, animationDelayMs));

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (delayRef.current) {
        animationFinished(viewId, animationDelayMs);
      }
    }, delayRef.current);

    return () => {
      clearTimeout(timeout);
      unmount(viewId, animationDelayMs);
    };
  }, [viewId, animationFinished, unmount, animationDelayMs]);

  if (animationDelayMs === 0) {
    return children;
  }

  return (
    <>
      {/* uncommment this for debug */}
      {/* {delayRef.current} */}
      <div
        style={{
          animation: `fadeIn ${animationDelayMs / 1000}s ${delayRef.current / 1000}s both`,
        }}
      >
        {children}
      </div>
    </>
  );
};
