import { useState, useEffect } from 'react';

/**
 * Hook to detect document/tab visibility state.
 * Returns true when the page is active/visible, and false when the tab is hidden.
 */
export const usePageVisibility = (): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};
