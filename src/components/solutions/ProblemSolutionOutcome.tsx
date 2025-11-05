import { AlertCircle, Lightbulb, CheckCircle, Bot } from 'lucide-react';
import SectionContainer from '@/components/shared/SectionContainer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ProblemSolutionOutcomeProps {
  problem: string;
  solution: string;
  outcome: string;
}

const ProblemSolutionOutcome = ({
  problem,
  solution,
  outcome,
}: ProblemSolutionOutcomeProps) => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const items = [
    {
      icon: AlertCircle,
      title: 'The Problem',
      description: problem,
      color: 'text-red-500',
      bgGradient: 'from-red-500/20 via-red-500/10 to-transparent',
      borderColor: 'border-red-500/30',
      position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full',
    },
    {
      icon: Lightbulb,
      title: 'Our Solution',
      description: solution,
      color: 'text-secondary',
      bgGradient: 'from-secondary/20 via-secondary/10 to-transparent',
      borderColor: 'border-secondary/30',
      position: 'bottom-0 left-0 translate-y-full -translate-x-1/4',
    },
    {
      icon: CheckCircle,
      title: 'The Outcome',
      description: outcome,
      color: 'text-green-500',
      bgGradient: 'from-green-500/20 via-green-500/10 to-transparent',
      borderColor: 'border-green-500/30',
      position: 'bottom-0 right-0 translate-y-full translate-x-1/4',
    },
  ];

  return (
    <SectionContainer background="muted">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-32">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            How We Transform Your Business
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            From challenge to success: our AI-powered approach to delivering results
          </p>
        </div>

        {/* Circular Layout with Robot in Center */}
        <div className="relative min-h-[800px] flex items-center justify-center">
          {/* Central Robot Icon */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'
          }`}>
            <div className="relative">
              {/* Rotating Circle */}
              <div className="absolute inset-0 -inset-20">
                <div className="w-full h-full rounded-full border-2 border-dashed border-secondary/30 animate-spin-slow" />
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/30 blur-3xl rounded-full animate-pulse" />
              
              {/* Robot Container */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-2xl shadow-secondary/50 border-4 border-background">
                <Bot className="w-16 h-16 text-white animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>

          {/* Cards Positioned Around Robot */}
          {items.map((item, index) => {
            const Icon = item.icon;
            const angle = (index * 120) - 90; // 120 degrees apart, starting from top
            const radius = 280; // Distance from center
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <div
                key={item.title}
                className={`absolute top-1/2 left-1/2 w-80 transition-all duration-1000 delay-${(index + 1) * 200} ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  animation: isVisible ? `float-${index} 6s ease-in-out infinite` : 'none',
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                <div className="group relative">
                  {/* Connecting Line to Center */}
                  <div className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-b from-secondary/50 to-transparent origin-top -translate-x-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                      transformOrigin: 'center',
                    }}
                  />
                  
                  {/* Card */}
                  <div className={`relative p-6 rounded-2xl bg-card border-2 ${item.borderColor} hover:border-opacity-100 transition-all duration-500 hover:shadow-2xl hover:scale-105 overflow-hidden`}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Content */}
                    <div className="relative">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-shrink-0">
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} blur-xl rounded-full`} />
                          <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-card to-background border-2 border-border flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <Icon className={`w-7 h-7 ${item.color}`} />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`text-xl font-bold ${item.color}`}>
                              {item.title}
                            </h3>
                            <span className="px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-secondary to-accent rounded-full">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Decorative Corner */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${item.bgGradient} opacity-20 rounded-bl-full`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add custom animations */}
        <style>{`
          @keyframes float-0 {
            0%, 100% { transform: translate(calc(-50% + ${Math.cos((-90 * Math.PI) / 180) * 280}px), calc(-50% + ${Math.sin((-90 * Math.PI) / 180) * 280}px)) translateY(0px); }
            50% { transform: translate(calc(-50% + ${Math.cos((-90 * Math.PI) / 180) * 280}px), calc(-50% + ${Math.sin((-90 * Math.PI) / 180) * 280}px)) translateY(-10px); }
          }
          @keyframes float-1 {
            0%, 100% { transform: translate(calc(-50% + ${Math.cos((30 * Math.PI) / 180) * 280}px), calc(-50% + ${Math.sin((30 * Math.PI) / 180) * 280}px)) translateY(0px); }
            50% { transform: translate(calc(-50% + ${Math.cos((30 * Math.PI) / 180) * 280}px), calc(-50% + ${Math.sin((30 * Math.PI) / 180) * 280}px)) translateY(-10px); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translate(calc(-50% + ${Math.cos((150 * Math.PI) / 180) * 280}px), calc(-50% + ${Math.sin((150 * Math.PI) / 180) * 280}px)) translateY(0px); }
            50% { transform: translate(calc(-50% + ${Math.cos((150 * Math.PI) / 180) * 280}px), calc(-50% + ${Math.sin((150 * Math.PI) / 180) * 280}px)) translateY(-10px); }
          }
        `}</style>
      </div>
    </SectionContainer>
  );
};

export default ProblemSolutionOutcome;
