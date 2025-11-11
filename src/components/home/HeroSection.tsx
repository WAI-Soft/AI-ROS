import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/background1.jpg';
import heroSectionImage from '@/assets/herosection.png';
import { useStats } from '@/hooks/useStats';

const HeroSection = () => {
  const { stats, loading } = useStats();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AI-ROS Technology"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for dark mode */}
        <div className="absolute inset-0 bg-black/0 dark:bg-black/50 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="max-w-4xl">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 my-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30">
              Transforming Industries with AI
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
            Smart Solutions for a
            <span className="block mt-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Connected Future
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white bg-black/10 backdrop-blur-md px-6 py-4 rounded-lg mb-8 max-w-2xl animate-fade-in-up leading-relaxed font-semibold shadow-lg border border-white/20">
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
              className="group border-2 border-secondary/50 bg-white/20 hover:bg-gradient-to-r hover:from-secondary hover:to-accent backdrop-blur-md font-semibold text-lg px-8 h-14 shadow-lg transition-all"
            >
              <Play className="mr-2 w-5 h-5 text-secondary dark:text-white group-hover:text-white transition-colors" />
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent dark:text-white group-hover:text-white transition-colors">
                Watch Demo
              </span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in">
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">
                {loading ? '...' : `${stats?.total_projects || 0}+`}
              </div>
              <div className="text-sm text-secondary font-semibold">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">
                {loading ? '...' : `${stats?.co2_saved || 0}`}
              </div>
              <div className="text-sm text-secondary font-semibold">Tons CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">
                {loading ? '...' : `${stats?.partner_count || 0}+`}
              </div>
              <div className="text-sm text-secondary font-semibold">Global Partners</div>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center items-start animate-fade-in mt-8 lg:mt-0 lg:-mt-32">
          <img 
            src={heroSectionImage}
            alt="AI-ROS Hero"
            className="w-full max-w-2xl lg:max-w-3xl h-auto object-contain drop-shadow-2xl"
          />
        </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
