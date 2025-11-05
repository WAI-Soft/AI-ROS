import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'muted' | 'gradient';
  id?: string;
}

const SectionContainer = ({
  children,
  className,
  background = 'default',
  id,
}: SectionContainerProps) => {
  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-gradient-to-b from-background via-muted/30 to-background',
    gradient: 'bg-gradient-to-br from-[hsl(210,40%,8%)] via-[hsl(210,40%,12%)] to-[hsl(210,40%,8%)]',
  };

  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-24 relative overflow-hidden',
        backgroundClasses[background],
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
