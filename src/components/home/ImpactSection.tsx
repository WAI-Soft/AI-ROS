import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';

const ImpactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      icon: TrendingUp,
      value: 250,
      suffix: '+',
      label: 'Active Projects',
      color: 'text-blue-500',
    },
    {
      icon: Users,
      value: 10000,
      suffix: '+',
      label: 'Users Worldwide',
      color: 'text-green-500',
    },
    {
      icon: Award,
      value: 15,
      suffix: '+',
      label: 'Industry Awards',
      color: 'text-purple-500',
    },
    {
      icon: Zap,
      value: 99,
      suffix: '%',
      label: 'Uptime SLA',
      color: 'text-orange-500',
    },
  ];

  const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
      <span>
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--secondary)) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Driving Change Through Innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Measurable results that demonstrate our commitment to excellence and client success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 animate-fade-in-up hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated gradient orb */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-[2] transition-transform duration-700 animate-glow-pulse" />
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent"
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s linear infinite'
                  }}
                />
              </div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 via-accent/50 to-secondary/50 blur-sm animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />
              </div>
              
              <div className="relative z-10">
                <metric.icon className={`w-12 h-12 mb-4 ${metric.color} group-hover:scale-110 transition-transform duration-500 animate-float`} style={{ animationDelay: `${index * 300}ms` }} />
                
                <div className="text-4xl font-bold text-foreground mb-2 animate-counter group-hover:text-secondary transition-colors duration-300">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </div>
                
                <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
