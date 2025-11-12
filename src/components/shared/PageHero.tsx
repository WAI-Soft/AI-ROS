import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ShaderBackground } from '@/components/ui/hero-shader';

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaButtons?: CTAButton[];
  badge?: string;
  parallax?: boolean;
  fullHeight?: boolean;
}

const PageHero = ({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  ctaButtons,
  badge,
  parallax = false,
  fullHeight = false,
}: PageHeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax]);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  const parallaxStyle = parallax
    ? { transform: `translateY(${scrollY * 0.5}px)` }
    : {};

  const heightClass = fullHeight 
    ? 'min-h-screen' 
    : 'min-h-[60vh] md:min-h-[70vh]';

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}>
      {/* Background */}
      <div className="absolute inset-0 z-0" style={parallaxStyle}>
        {backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/webm" />
            <source src={backgroundVideo.replace('.webm', '.mp4')} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <ShaderBackground darkMode={isDark}>
            <div className="absolute inset-0" />
          </ShaderBackground>
        ) : (
          <ShaderBackground darkMode={isDark}>
            <div className="absolute inset-0" />
          </ShaderBackground>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <div className="animate-fade-in-up mb-6">
              <span className="inline-block px-4 py-2 text-sm font-semibold text-[#1a1a1a] dark:text-white bg-secondary/10 rounded-full border border-secondary/30">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
            {title.split(' ').map((word, index) => {
              // Check if word should be gradient (you can customize this logic)
              const isGradient = index >= title.split(' ').length - 2;
              return isGradient ? (
                <span
                  key={index}
                  className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"
                >
                  {word}{' '}
                </span>
              ) : (
                <span key={index}>{word} </span>
              );
            })}
          </h1>

          {subtitle && (
            <p className="text-lg sm:text-xl text-[#000000] dark:text-white bg-white/40 dark:bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg mb-8 max-w-2xl mx-auto animate-fade-in-up leading-relaxed shadow-lg border border-secondary/20 dark:border-white/20">
              {subtitle}
            </p>
          )}

          {ctaButtons && ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              {ctaButtons.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={button.variant === 'primary' ? 'default' : 'outline'}
                  className={
                    button.variant === 'primary'
                      ? 'bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all'
                      : 'border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold text-lg px-8 h-14'
                  }
                  onClick={button.onClick}
                  asChild={!!button.href}
                >
                  {button.href ? (
                    <a href={button.href}>
                      {button.label}
                      {button.variant === 'primary' && <ArrowRight className="ml-2 w-5 h-5" />}
                    </a>
                  ) : (
                    <>
                      {button.label}
                      {button.variant === 'primary' && <ArrowRight className="ml-2 w-5 h-5" />}
                    </>
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
