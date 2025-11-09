import { useEffect, useRef, useState } from 'react';
import { Brain, Bot, Cloud, FlaskConical, GraduationCap } from 'lucide-react';

const ServicesSection = () => {
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

  const services = [
    {
      icon: Brain,
      title: 'AI Consulting & Solution Design',
      description: 'Custom-tailored AI architectures to digitize workflows, analyze data, and automate decisions.',
      color: 'text-blue-500',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: Bot,
      title: 'Robotics System Integration',
      description: 'Embedded intelligence for drones, field robots, and automation hardware in agriculture and beyond.',
      color: 'text-green-500',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: Cloud,
      title: 'SaaS Platforms & Smart Dashboards',
      description: 'Cloud-native applications powered by AI to optimize operations, manage assets, and improve sustainability metrics.',
      color: 'text-purple-500',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: FlaskConical,
      title: 'R&D-as-a-Service',
      description: 'We co-build early-stage solutions with partners, delivering prototypes, feasibility studies, and proof-of-concept demos.',
      color: 'text-orange-500',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
    {
      icon: GraduationCap,
      title: 'AI-Powered Education & Training',
      description: 'Customized AI learning tools, adaptive tutoring systems, and hands-on courses to empower students, educators, and professionals.',
      color: 'text-indigo-500',
      gradient: 'from-indigo-500/20 to-violet-500/20',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 animate-gradient-shift" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 2px, transparent 2px), radial-gradient(circle at 80% 50%, hsl(var(--secondary)) 2px, transparent 2px)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px',
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full border border-primary/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            What We Offer
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 overflow-hidden ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-16'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Rotating gradient orb */}
              <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl group-hover:scale-150 group-hover:rotate-180 transition-all duration-1000`} />

              <div className="relative z-10">
                {/* Icon container */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 ${service.color} opacity-20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700`} />
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-card to-muted group-hover:scale-110 transition-transform duration-300 w-fit">
                    <service.icon className={`w-10 h-10 ${service.color}`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
