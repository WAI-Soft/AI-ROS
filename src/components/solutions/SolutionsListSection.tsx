import { useEffect, useRef, useState } from 'react';
import { Sprout, Wind, Droplets, Brain, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

const SolutionsListSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const solutions = [
    {
      icon: Sprout,
      number: '1',
      title: 'GROW+ – Smart Plant Doctor',
      description: 'An AI-based plant disease detection platform supporting over 30 species. It empowers farmers with early diagnosis, reduces pesticide dependency, and increases yields sustainably.',
      impact: 'Reduces crop loss, improves food security',
      tech: 'AI-based image recognition + plant pathology models',
      color: 'text-green-500',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: Wind,
      number: '2',
      title: 'Cozy Earth – Air Quality by Design',
      description: 'A VR-powered, AI-guided plant recommendation engine that chooses the best greenery for your space based on local pollution data and oxygen needs. Users can visualize and place plants in their home or office virtually.',
      impact: 'Improves indoor air, promotes urban greening',
      tech: 'AI + VR + environmental data analytics',
      color: 'text-cyan-500',
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      icon: Droplets,
      number: '3',
      title: 'Soil-Sense – Precision Irrigation for a Thirsty World',
      description: 'A smart irrigation assistant using IoT sensors and AI algorithms to monitor moisture, nutrients, and environmental conditions. It automates water and fertilizer usage for efficient, sustainable farming.',
      impact: 'Saves water, reduces over-fertilization',
      tech: 'AI + IoT + real-time soil analytics',
      color: 'text-blue-500',
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      icon: Brain,
      number: '4',
      title: 'RaG SaaS – AI That Thinks With You',
      description: 'A Retrieval-Augmented Generation (RaG) platform that allows users to build decision-support agents trained on their own policies, documents, and data. Ideal for sustainability planning, governance, and research.',
      impact: 'Smarter decisions, faster policy design',
      tech: 'LLMs + vector databases + GenAI frameworks',
      color: 'text-purple-500',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: GraduationCap,
      number: '5',
      title: 'AI LearnLab – Personalized Education with AI',
      description: 'A platform combining intelligent tutoring, curriculum personalization, and interactive tools to make education more accessible and effective. Whether you\'re a student struggling with math or a professional entering AI from scratch, LearnLab adapts to your needs.',
      impact: 'Equity in education, democratizing AI skills globally',
      tech: 'NLP + adaptive learning engines + interactive simulations',
      color: 'text-orange-500',
      gradient: 'from-orange-500/20 to-red-500/20',
      features: [
        'For Students: AI-powered apps that break down complex STEM subjects into intuitive, visual lessons.',
        'For Lifelong Learners: Beginner-to-advanced AI courses for non-tech backgrounds, guiding learners from zero to practical mastery.',
        'For Institutions: Plug-and-play AI curriculum modules and custom integrations for schools and universities.',
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 animate-gradient-shift" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 2px, transparent 2px), radial-gradient(circle at 80% 50%, hsl(var(--secondary)) 2px, transparent 2px)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px',
        }} />
      </div>

      {/* Multiple glowing orbs for depth */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-semibold text-primary bg-primary/10 rounded-full border border-primary/30 backdrop-blur-sm shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>🧬 Tech That Matters</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text animate-gradient-x">
            Our Solutions
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            AIROS focuses on technology that creates real impact — from sustainable agriculture to democratizing AI education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.slice(0, 3).map((solution, index) => (
            <div
              key={solution.title}
              className={`group relative rounded-3xl bg-card/60 backdrop-blur-md border-2 border-border/50 hover:border-primary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden hover:-translate-y-2 ${isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-20 scale-95'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Rotating gradient orb */}
              <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br ${solution.gradient} rounded-full blur-3xl group-hover:scale-150 group-hover:rotate-180 transition-all duration-1000 opacity-50`} />

              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Icon and Number */}
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    {/* Pulsing glow effect */}
                    <div className={`absolute inset-0 ${solution.color} opacity-20 blur-2xl rounded-full animate-pulse group-hover:scale-150 transition-transform duration-700`} />

                    {/* Icon container with enhanced styling */}
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-br from-card to-muted border-2 border-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <solution.icon className={`w-10 h-10 ${solution.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Large number with gradient */}
                  <div className={`text-5xl font-black bg-gradient-to-br ${solution.gradient} bg-clip-text text-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500`}>
                    {solution.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {solution.features && (
                    <div className="space-y-2 pl-3 border-l-2 border-primary/30 flex-1">
                      {solution.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-300"
                        >
                          <div className={`${solution.color} mt-1 flex-shrink-0`}>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                          <span className="text-xs text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 pt-4 mt-auto">
                    <div className={`group/card p-4 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                      <div className={`text-xs font-bold uppercase tracking-wider ${solution.color} mb-1 flex items-center gap-2`}>
                        <Sparkles className="w-3 h-3" />
                        Impact
                      </div>
                      <div className="text-xs font-medium text-foreground">{solution.impact}</div>
                    </div>
                    <div className={`group/card p-4 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                      <div className={`text-xs font-bold uppercase tracking-wider ${solution.color} mb-1 flex items-center gap-2`}>
                        <Sparkles className="w-3 h-3" />
                        Tech Stack
                      </div>
                      <div className="text-xs font-medium text-foreground">{solution.tech}</div>
                    </div>
                  </div>

                  {/* Enhanced decorative line with arrow */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className={`h-0.5 w-12 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-700`} />
                    <ArrowRight className={`w-3 h-3 ${solution.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered last 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {solutions.slice(3).map((solution, index) => (
            <div
              key={solution.title}
              className={`group relative rounded-3xl bg-card/60 backdrop-blur-md border-2 border-border/50 hover:border-primary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden hover:-translate-y-2 ${isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-20 scale-95'
                }`}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Rotating gradient orb */}
              <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br ${solution.gradient} rounded-full blur-3xl group-hover:scale-150 group-hover:rotate-180 transition-all duration-1000 opacity-50`} />

              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Icon and Number */}
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    {/* Pulsing glow effect */}
                    <div className={`absolute inset-0 ${solution.color} opacity-20 blur-2xl rounded-full animate-pulse group-hover:scale-150 transition-transform duration-700`} />

                    {/* Icon container with enhanced styling */}
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-br from-card to-muted border-2 border-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <solution.icon className={`w-10 h-10 ${solution.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Large number with gradient */}
                  <div className={`text-5xl font-black bg-gradient-to-br ${solution.gradient} bg-clip-text text-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500`}>
                    {solution.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {solution.features && (
                    <div className="space-y-2 pl-3 border-l-2 border-primary/30 flex-1">
                      {solution.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-300"
                        >
                          <div className={`${solution.color} mt-1 flex-shrink-0`}>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                          <span className="text-xs text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 pt-4 mt-auto">
                    <div className={`group/card p-4 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                      <div className={`text-xs font-bold uppercase tracking-wider ${solution.color} mb-1 flex items-center gap-2`}>
                        <Sparkles className="w-3 h-3" />
                        Impact
                      </div>
                      <div className="text-xs font-medium text-foreground">{solution.impact}</div>
                    </div>
                    <div className={`group/card p-4 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                      <div className={`text-xs font-bold uppercase tracking-wider ${solution.color} mb-1 flex items-center gap-2`}>
                        <Sparkles className="w-3 h-3" />
                        Tech Stack
                      </div>
                      <div className="text-xs font-medium text-foreground">{solution.tech}</div>
                    </div>
                  </div>

                  {/* Enhanced decorative line with arrow */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className={`h-0.5 w-12 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-700`} />
                    <ArrowRight className={`w-3 h-3 ${solution.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsListSection;
