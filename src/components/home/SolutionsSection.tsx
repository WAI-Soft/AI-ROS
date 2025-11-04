import { useEffect, useRef, useState } from 'react';
import { Sprout, Building2, Factory, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SolutionsSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        },
        { threshold: 0.2 }
      );

      if (card) observer.observe(card);
      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  const solutions = [
    {
      icon: Sprout,
      title: 'Smart Agriculture',
      description:
        'Precision farming solutions powered by AI and IoT. Monitor crop health, optimize irrigation, and maximize yields with data-driven insights.',
      features: ['Crop Monitoring', 'Automated Irrigation', 'Yield Prediction'],
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 via-emerald-500/5 to-transparent',
    },
    {
      icon: Building2,
      title: 'Smart Cities',
      description:
        'Transform urban spaces with intelligent infrastructure. Traffic optimization, energy management, and enhanced public services for sustainable living.',
      features: ['Traffic Management', 'Energy Optimization', 'Public Safety'],
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    },
    {
      icon: Factory,
      title: 'Industrial Automation',
      description:
        'Streamline operations with AI-powered automation. Predictive maintenance, quality control, and process optimization for maximum efficiency.',
      features: ['Predictive Maintenance', 'Quality Control', 'Process Optimization'],
      color: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 via-red-500/5 to-transparent',
    },
  ];

  return (
    <section ref={sectionRef} id="solutions" className="py-24 bg-gradient-to-b from-muted via-background to-muted relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--secondary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-20 left-10 w-4 h-4 text-secondary animate-float opacity-20" style={{ animationDelay: '0s' }} />
        <Sparkles className="absolute top-40 right-20 w-3 h-3 text-accent animate-float opacity-20" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-32 left-1/4 w-5 h-5 text-secondary animate-float opacity-20" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 animate-glow-pulse" />
            Our Solutions
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text">
            Transforming Industries with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to revolutionize your operations and drive sustainable growth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              ref={el => cardRefs.current[index] = el}
              className={`transition-all duration-1000 ${
                visibleCards[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className="group relative h-full overflow-hidden border-border hover:border-secondary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-secondary/20 bg-card/50 backdrop-blur-sm">
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.bgGradient} animate-gradient-shift`} style={{ backgroundSize: '200% 200%' }} />
                </div>
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-r ${solution.color} opacity-20 blur-xl rounded-xl`} />
                </div>

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${solution.color} opacity-0 group-hover:opacity-100 transition-all duration-700 transform origin-left scale-x-0 group-hover:scale-x-100`} />

                <CardContent className="p-10 relative z-10 flex flex-col h-full">
                  {/* Icon with animated background */}
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700`} />
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                      <solution.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors duration-500">
                    {solution.title}
                  </h3>

                  <p className="text-muted-foreground mb-8 leading-relaxed flex-grow text-lg">
                    {solution.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {solution.features.map((feature, idx) => (
                      <div 
                        key={feature} 
                        className={`flex items-center text-sm font-medium text-muted-foreground transition-all duration-500 ${
                          visibleCards[index] ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                        }`}
                        style={{ transitionDelay: `${(index * 200) + (idx * 150)}ms` }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${solution.color} mr-3 group-hover:scale-150 transition-transform duration-300`} />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="group/btn text-secondary hover:text-secondary p-0 h-auto font-semibold relative self-start mt-auto"
                  >
                    <span className="relative z-10 flex items-center">
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </span>
                    <div className={`absolute inset-0 -inset-x-2 bg-gradient-to-r ${solution.color} opacity-0 group-hover/btn:opacity-10 rounded transition-opacity duration-300`} />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
