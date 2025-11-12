import { useEffect, useRef, useState } from 'react';
import { Award } from 'lucide-react';

// Import logos
import TCLogo from '@/assets/logos/TC.png';
import ASLogo from '@/assets/logos/AS.png';
import UTLogo from '@/assets/logos/UT.png';
import IALogo from '@/assets/logos/IA.png';
import SFLogo from '@/assets/logos/SF.png';
import CFLogo from '@/assets/logos/CF.png';
import AXLogo from '@/assets/logos/AX.png';
import GTLogo from '@/assets/logos/GT.png';

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const partners = [
    { name: 'TechCorp', abbreviation: 'TC', logo: TCLogo },
    { name: 'AgriSolutions', abbreviation: 'AS', logo: ASLogo },
    { name: 'UrbanTech', abbreviation: 'UT', logo: UTLogo },
    { name: 'IndustrialAI', abbreviation: 'IA', logo: IALogo },
    { name: 'SmartFarms', abbreviation: 'SF', logo: SFLogo },
    { name: 'CityFlow', abbreviation: 'CF', logo: CFLogo },
    { name: 'AutomateX', abbreviation: 'AX', logo: AXLogo },
    { name: 'GreenTech', abbreviation: 'GT', logo: GTLogo },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-muted border-y border-border/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--secondary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30 backdrop-blur-sm">
            <Award className="w-4 h-4 animate-glow-pulse" />
            Trusted Partners
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powering Innovation Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Collaborating with industry leaders to deliver exceptional results
          </p>
        </div>

        <div className={`relative overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
          {/* Gradient Fade Effects */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted via-muted to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted via-muted to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="flex animate-scroll gap-12">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div
                key={`${partner.name}-1-${index}`}
                className="flex-shrink-0 w-36 h-24 perspective-1000"
              >
                <div className="flip-card-inner w-full h-full relative">
                  {/* Front - Logo */}
                  <div className="flip-card-front absolute w-full h-full bg-card/80 backdrop-blur-sm border border-border rounded-2xl flex items-center justify-center p-4">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  {/* Back - Name and Abbreviation */}
                  <div className="flip-card-back absolute w-full h-full bg-gradient-to-br from-secondary/90 to-secondary backdrop-blur-sm border border-secondary rounded-2xl flex flex-col items-center justify-center p-4">
                    <div className="text-2xl font-bold text-white mb-1">
                      {partner.abbreviation}
                    </div>
                    <div className="text-xs text-white/90 font-medium text-center">
                      {partner.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`${partner.name}-2-${index}`}
                className="flex-shrink-0 w-36 h-24 perspective-1000"
              >
                <div className="flip-card-inner w-full h-full relative">
                  {/* Front - Logo */}
                  <div className="flip-card-front absolute w-full h-full bg-card/80 backdrop-blur-sm border border-border rounded-2xl flex items-center justify-center p-4">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  {/* Back - Name and Abbreviation */}
                  <div className="flip-card-back absolute w-full h-full bg-gradient-to-br from-secondary/90 to-secondary backdrop-blur-sm border border-secondary rounded-2xl flex flex-col items-center justify-center p-4">
                    <div className="text-2xl font-bold text-white mb-1">
                      {partner.abbreviation}
                    </div>
                    <div className="text-xs text-white/90 font-medium text-center">
                      {partner.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 8s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .flip-card-inner {
          transition: transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .perspective-1000:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
