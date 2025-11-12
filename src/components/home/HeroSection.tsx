import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShaderBackground } from '@/components/ui/hero-shader';
import TypewriterText from '@/components/ui/TypewriterText';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isDark, setIsDark] = useState(false);

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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Shader Background for Both Modes */}
      <div className="absolute inset-0 z-0">
        <ShaderBackground darkMode={isDark}>
          <div className="absolute inset-0" />
        </ShaderBackground>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-4">
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 my-6 text-sm font-semibold text-[#1a1a1a] dark:text-white bg-secondary/10 rounded-full border border-secondary/30">
              Transforming Industries with AI
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground dark:text-white mb-6 animate-fade-in-up leading-tight">
            Smart Solutions for a
            <span className="block mt-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Connected Future
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#000000] dark:text-white bg-white/40 dark:bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg mb-8 max-w-3xl animate-fade-in-up leading-relaxed shadow-lg border border-secondary/20 dark:border-white/20 min-h-[120px] flex items-center justify-center">
            <TypewriterText 
              text="AI-ROS delivers cutting-edge AI-driven solutions for smart agriculture, intelligent cities, and industrial automation. Empowering businesses to achieve operational excellence through innovation."
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-foreground dark:text-white font-semibold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-secondary/50 bg-white/40 dark:bg-white/20 hover:bg-gradient-to-r hover:from-secondary hover:to-accent backdrop-blur-md font-semibold text-lg px-8 h-14 shadow-lg transition-all"
            >
              <Play className="mr-2 w-5 h-5 text-foreground dark:text-secondary group-hover:text-foreground dark:group-hover:text-white transition-colors" />
              <span className="text-foreground dark:text-white group-hover:text-foreground dark:group-hover:text-white transition-colors">
                Watch Demo
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
