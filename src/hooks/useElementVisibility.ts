import { useState, useEffect, type RefObject } from 'react';

interface UseElementVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook to detect element visibility inside the viewport using IntersectionObserver.
 * Returns true if the referenced element is intersecting (visible), and false otherwise.
 */
export const useElementVisibility = (
  elementRef: RefObject<Element | null>,
  options: UseElementVisibilityOptions = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true);
  const { threshold = 0.15, rootMargin = '0px' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined' || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [elementRef, threshold, rootMargin]);

  return isIntersecting;
};
