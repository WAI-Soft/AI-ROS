import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale';
  animateOnScroll?: boolean;
  delay?: number;
}

const AnimatedCard = ({
  children,
  className,
  hoverEffect = 'lift',
  animateOnScroll = true,
  delay = 0,
}: AnimatedCardProps) => {
  const [elementRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const hoverClasses = {
    lift: 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20',
    glow: 'hover:shadow-2xl hover:shadow-secondary/30 hover:border-secondary/50',
    scale: 'hover:scale-105 hover:shadow-2xl hover:shadow-secondary/20',
  };

  useEffect(() => {
    if (cardRef.current && animateOnScroll) {
      if (isVisible) {
        cardRef.current.style.transitionDelay = `${delay}ms`;
        cardRef.current.style.opacity = '1';
        cardRef.current.style.transform = 'translateY(0) scale(1)';
      }
    }
  }, [isVisible, delay, animateOnScroll]);

  return (
    <div
      ref={(node) => {
        cardRef.current = node;
        if (animateOnScroll) {
          (elementRef as any).current = node;
        }
      }}
      className={cn(
        'group relative rounded-2xl md:rounded-3xl bg-card/80 backdrop-blur-sm border border-border transition-all duration-300',
        hoverClasses[hoverEffect],
        animateOnScroll && 'opacity-0 translate-y-8',
        className
      )}
      style={
        animateOnScroll
          ? {
              transition: 'opacity 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            }
          : undefined
      }
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl md:rounded-3xl" />

      {/* Rotating gradient orb */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl group-hover:scale-150 group-hover:rotate-180 transition-all duration-1000 pointer-events-none" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl md:rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedCard;
