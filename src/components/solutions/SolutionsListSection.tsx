import { useEffect, useRef, useState } from 'react';
import { Sprout, Wind, Droplets, Brain, GraduationCap, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SolutionsListSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
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
      title: 'GROW+ – Smart Plant Doctor',
      description: 'An AI-based plant disease detection platform supporting over 30 species. It empowers farmers with early diagnosis, reduces pesticide dependency, and increases yields sustainably.',
      impact: 'Reduces crop loss, improves food security',
      tech: 'AI-based image recognition + plant pathology models',
      color: 'text-green-500',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: Wind,
      title: 'Cozy Earth – Air Quality by Design',
      description: 'A VR-powered, AI-guided plant recommendation engine that chooses the best greenery for your space based on local pollution data and oxygen needs. Users can visualize and place plants in their home or office virtually.',
      impact: 'Improves indoor air, promotes urban greening',
      tech: 'AI + VR + environmental data analytics',
      color: 'text-cyan-500',
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      icon: Droplets,
      title: 'Soil-Sense – Precision Irrigation for a Thirsty World',
      description: 'A smart irrigation assistant using IoT sensors and AI algorithms to monitor moisture, nutrients, and environmental conditions. It automates water and fertilizer usage for efficient, sustainable farming.',
      impact: 'Saves water, reduces over-fertilization',
      tech: 'AI + IoT + real-time soil analytics',
      color: 'text-blue-500',
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      icon: Brain,
      title: 'RaG SaaS – AI That Thinks With You',
      description: 'A Retrieval-Augmented Generation (RaG) platform that allows users to build decision-support agents trained on their own policies, documents, and data. Ideal for sustainability planning, governance, and research.',
      impact: 'Smarter decisions, faster policy design',
      tech: 'LLMs + vector databases + GenAI frameworks',
      color: 'text-purple-500',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: GraduationCap,
      title: 'AI LearnLab – Personalized Education with AI',
      description: 'A platform combining intelligent tutoring, curriculum personalization, and interactive tools to make education more accessible and effective. Whether you\'re a student struggling with math or a professional entering AI from scratch, LearnLab adapts to your needs.',
      impact: 'Equity in education, democratizing AI skills globally',
      tech: 'NLP + adaptive learning engines + interactive simulations',
      color: 'text-orange-500',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
  ];

  return (
    <>
      <section ref={sectionRef} className="py-32 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 animate-gradient-shift" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary)) 2px, transparent 2px), radial-gradient(circle at 80% 50%, hsl(var(--secondary)) 2px, transparent 2px)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
          }} />
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-semibold text-primary bg-primary/10 rounded-full border border-primary/30 backdrop-blur-sm shadow-lg">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Tech That Matters</span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8">
              Our Solutions
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              AIROS focuses on technology that creates real impact — from sustainable agriculture to democratizing AI education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                onClick={() => setSelectedSolution(solution)}
                className={`group relative rounded-3xl bg-card/80 backdrop-blur-md border-2 border-border/50 hover:border-secondary transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/30 overflow-hidden hover:-translate-y-3 cursor-pointer ${isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-20 scale-95'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Rotating gradient orb */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl group-hover:scale-150 group-hover:rotate-180 transition-all duration-1000 opacity-40" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-10 flex flex-col items-center text-center h-full justify-center min-h-[350px]">
                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-secondary opacity-20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-card to-muted border-2 border-secondary/20 group-hover:border-secondary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                      <solution.icon className="w-20 h-20 text-secondary group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-300 mb-2">
                    {solution.title.split('–')[0].trim()}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-4">
                    {solution.title.split('–')[1]?.trim()}
                  </p>

                  {/* Decorative line */}
                  <div className="h-1 w-16 bg-gradient-to-r from-secondary to-accent rounded-full mb-4 group-hover:w-24 transition-all duration-500" />

                  {/* Click hint */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">Click to explore</span>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 rounded-tl-full transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedSolution(null)}>
          <div 
            className="relative bg-card rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-primary/30 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSolution(null)}
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Modal content */}
            <div className="p-8 md:p-12">
              {/* Icon and Title */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className={`absolute inset-0 ${selectedSolution.color} opacity-20 blur-2xl rounded-full`} />
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-br from-card to-muted border-2 border-primary/20 shadow-lg`}>
                    <selectedSolution.icon className={`w-12 h-12 ${selectedSolution.color}`} />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {selectedSolution.title}
                </h2>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Description */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedSolution.description}
                  </p>
                </div>

                {/* Right Side - Impact & Tech Stack */}
                <div className="space-y-6">
                  {/* Impact */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm border border-primary/20">
                    <h3 className={`text-lg font-semibold ${selectedSolution.color} mb-3 flex items-center gap-2`}>
                      <Sparkles className="w-5 h-5" />
                      Impact
                    </h3>
                    <p className="text-foreground font-medium">
                      {selectedSolution.impact}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm border border-primary/20">
                    <h3 className={`text-lg font-semibold ${selectedSolution.color} mb-3 flex items-center gap-2`}>
                      <Sparkles className="w-5 h-5" />
                      Tech Stack
                    </h3>
                    <p className="text-foreground font-medium">
                      {selectedSolution.tech}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SolutionsListSection;
