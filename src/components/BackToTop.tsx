import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-amber-900 via-amber-950 to-stone-950 hover:from-secondary hover:via-secondary/90 hover:to-secondary/80 text-white border-0 hover:shadow-secondary/50'
              : 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:from-secondary hover:via-secondary/90 hover:to-secondary/80 text-white border-2 border-primary/30 hover:shadow-secondary/50'
          }`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};

export default BackToTop;
