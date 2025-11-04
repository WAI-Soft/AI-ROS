import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AI-ROS Technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="max-w-4xl">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30">
              Transforming Industries with AI
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up leading-tight">
            Smart Solutions for a
            <span className="block mt-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Connected Future
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl animate-fade-in-up leading-relaxed">
            AI-ROS delivers cutting-edge AI-driven solutions for smart agriculture, intelligent cities, 
            and industrial automation. Empowering businesses to achieve operational excellence through innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm font-semibold text-lg px-8 h-14"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 animate-fade-in">
            <div className="text-center md:text-left">
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-sm text-primary-foreground/70">Projects Completed</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-4xl font-bold text-secondary mb-2">95%</div>
              <div className="text-sm text-primary-foreground/70">Client Satisfaction</div>
            </div>
            <div className="text-center md:text-left col-span-2 md:col-span-1">
              <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-sm text-primary-foreground/70">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
