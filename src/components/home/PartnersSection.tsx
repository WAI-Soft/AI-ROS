const PartnersSection = () => {
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
    <section className="py-16 bg-muted border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30">
            Trusted Partners
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Powering Innovation Together
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Collaborating with industry leaders to deliver exceptional results
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient Fade Effects */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="flex animate-scroll gap-12">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div
                key={`${partner.name}-1-${index}`}
                className="flex-shrink-0 w-32 h-20 bg-card border border-border rounded-xl flex items-center justify-center hover:border-secondary/50 transition-colors group"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground group-hover:text-secondary transition-colors">
                    {partner.logo}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{partner.name}</div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`${partner.name}-2-${index}`}
                className="flex-shrink-0 w-32 h-20 bg-card border border-border rounded-xl flex items-center justify-center hover:border-secondary/50 transition-colors group"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground group-hover:text-secondary transition-colors">
                    {partner.logo}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{partner.name}</div>
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
