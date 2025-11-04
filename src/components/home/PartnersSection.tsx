import { useEffect, useRef, useState } from 'react';
import { Award } from 'lucide-react';

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

  // Mock partner logos - in production these would be real company logos
  const partners = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'AgriSolutions', logo: 'AS' },
    { name: 'UrbanTech', logo: 'UT' },
    { name: 'IndustrialAI', logo: 'IA' },
    { name: 'SmartFarms', logo: 'SF' },
    { name: 'CityFlow', logo: 'CF' },
    { name: 'AutomateX', logo: 'AX' },
    { name: 'GreenTech', logo: 'GT' },
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
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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

        <div className={`relative overflow-hidden transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
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
                className="flex-shrink-0 w-36 h-24 bg-card/80 backdrop-blur-sm border border-border rounded-2xl flex items-center justify-center hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 group hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-muted-foreground group-hover:text-secondary transition-all duration-300 group-hover:scale-110">
                    {partner.logo}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 font-medium group-hover:text-foreground transition-colors">{partner.name}</div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`${partner.name}-2-${index}`}
                className="flex-shrink-0 w-36 h-24 bg-card/80 backdrop-blur-sm border border-border rounded-2xl flex items-center justify-center hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 group hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-muted-foreground group-hover:text-secondary transition-all duration-300 group-hover:scale-110">
                    {partner.logo}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 font-medium group-hover:text-foreground transition-colors">{partner.name}</div>
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
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
