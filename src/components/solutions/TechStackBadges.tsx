import SectionContainer from '@/components/shared/SectionContainer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface TechStackBadgesProps {
  technologies: string[];
}

const TechStackBadges = ({ technologies }: TechStackBadgesProps) => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true,
  });

  return (
    <SectionContainer background="muted">
      <div ref={sectionRef} className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Powered By Cutting-Edge Technology
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Built with industry-leading tools and frameworks for maximum reliability
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech, index) => (
            <div
              key={tech}
              className={cn(
                'group relative px-6 py-3 rounded-full bg-gradient-to-r from-card to-muted border border-border hover:border-secondary/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/20',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{
                transitionDelay: `${index * 50}ms`,
                animation: isVisible ? `bounce 0.6s ease-out ${index * 50}ms` : 'none',
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

              {/* Badge Content */}
              <span className="relative text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">
                {tech}
              </span>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Integration Note */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-muted-foreground">
            Seamlessly integrates with your existing infrastructure
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </SectionContainer>
  );
};

export default TechStackBadges;
