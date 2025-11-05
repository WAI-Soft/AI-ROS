import { useEffect, useRef } from 'react';

interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
}

export function useAnimation(
  isVisible: boolean,
  animationType: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in',
  options: AnimationOptions = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const { duration = 500, delay = 0, easing = 'cubic-bezier(0.4, 0, 0.2, 1)' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (isVisible) {
      // Apply animation
      element.style.transition = `all ${duration}ms ${easing} ${delay}ms`;
      element.style.opacity = '1';
      element.style.transform = 'translate(0, 0) scale(1)';
    } else {
      // Reset to initial state
      element.style.opacity = '0';
      
      switch (animationType) {
        case 'fade-in-up':
          element.style.transform = 'translateY(30px)';
          break;
        case 'fade-in-down':
          element.style.transform = 'translateY(-30px)';
          break;
        case 'slide-in-left':
          element.style.transform = 'translateX(-30px)';
          break;
        case 'slide-in-right':
          element.style.transform = 'translateX(30px)';
          break;
        case 'scale-in':
          element.style.transform = 'scale(0.9)';
          break;
        default:
          element.style.transform = 'none';
      }
    }
  }, [isVisible, animationType, duration, delay, easing]);

  return elementRef;
}

// Stagger animation helper
export function useStaggerAnimation(
  isVisible: boolean,
  itemCount: number,
  baseDelay: number = 0,
  staggerDelay: number = 100
): number[] {
  return Array.from({ length: itemCount }, (_, index) => 
    baseDelay + (index * staggerDelay)
  );
}
