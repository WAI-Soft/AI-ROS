import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ProjectBannerProps {
  title: string;
  categories: string[];
  image: string;
  video?: string;
}

const ProjectBanner = ({ title, categories, image, video }: ProjectBannerProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
      {/* Background Image/Video with Parallax */}
      <div className="absolute inset-0 z-0" style={parallaxStyle}>
        {video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,40%,8%)] via-[hsl(210,40%,8%)]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210,40%,8%)]/80 via-transparent to-[hsl(210,40%,8%)]/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
        {/* Back Button */}
        <Link to="/projects" className="inline-block mb-8">
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up">
          {categories.map((category) => (
            <span
              key={category}
              className="px-4 py-2 rounded-full bg-secondary/90 backdrop-blur-sm text-white text-sm font-semibold shadow-lg"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 animate-fade-in-up max-w-5xl leading-tight">
          {title}
        </h1>
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

export default ProjectBanner;
