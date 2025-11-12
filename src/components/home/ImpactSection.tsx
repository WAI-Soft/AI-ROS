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
      color: 'text-secondary',
    },
    {
      icon: Users,
      value: 10000,
      suffix: '+',
      label: 'Users Worldwide',
      color: 'text-secondary',
    },
    {
      icon: Award,
      value: 15,
      suffix: '+',
      label: 'Industry Awards',
      color: 'text-secondary',
    },
    {
      icon: Zap,
      value: 99,
      suffix: '%',
      label: 'Uptime SLA',
      color: 'text-secondary',
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 animate-gradient-shift" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--secondary)) 2px, transparent 2px), radial-gradient(circle at 80% 50%, hsl(var(--accent)) 2px, transparent 2px)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px',
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse" />
            Our Impact
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text">
            Driving Change Through Innovation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Measurable results that demonstrate our commitment to excellence and client success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`group relative p-10 rounded-3xl bg-card/80 backdrop-blur-sm border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-2 hover:scale-105 overflow-hidden ${isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-16 scale-90'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Rotating gradient orb */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl group-hover:scale-150 group-hover:rotate-180 transition-all duration-1000" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon container with glow */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 ${metric.color} opacity-20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700`} />
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-card to-muted group-hover:scale-110 transition-transform duration-300">
                    <metric.icon className={`w-12 h-12 ${metric.color}`} />
                  </div>
                </div>

                {/* Counter */}
                <div className={`text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 ${isVisible ? 'animate-counter' : ''
                  }`}>
                  <Counter value={metric.value} suffix={metric.suffix} />
                </div>

                {/* Label */}
                <div className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300 uppercase tracking-wide">
                  {metric.label}
                </div>

                {/* Decorative line */}
                <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
