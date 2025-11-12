import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
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
  const projects = [
    {
      title: 'Smart Irrigation System',
      slug: 'green-delta-project',
      category: 'Smart Agriculture',
      description: 'AI-powered irrigation management system that reduced water consumption by 40% while increasing crop yields.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
      stats: ['40% Water Saved', '25% Yield Increase', '500+ Farms'],
      tags: ['IoT', 'AI', 'Agriculture'],
    },
    {
      title: 'Urban Traffic Management',
      slug: 'urban-wellness-labs',
      category: 'Smart Cities',
      description: 'Intelligent traffic system that optimized flow and reduced congestion by 35% in metropolitan areas.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format&fit=crop',
      stats: ['35% Less Congestion', '20% Faster Commute', '3M Citizens'],
      tags: ['AI', 'Smart City', 'Transportation'],
    },
    {
      title: 'Predictive Maintenance Suite',
      slug: 'agroedge',
      category: 'Industrial Automation',
      description: 'Machine learning platform that predicts equipment failures, reducing downtime by 60% for manufacturers.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
      stats: ['60% Less Downtime', '$2M Saved', '100+ Factories'],
      tags: ['ML', 'Industry 4.0', 'Automation'],
    },
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-muted via-background to-background relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--secondary)) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-32 right-1/4 w-6 h-6 text-secondary animate-float opacity-20" style={{ animationDelay: '0s' }} />
        <Sparkles className="absolute bottom-40 left-1/3 w-4 h-4 text-accent animate-float opacity-20" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 animate-glow-pulse" />
            Featured Projects
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real-world implementations delivering measurable impact across industries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => cardRefs.current[index] = el}
              className={`transition-all duration-1000 ${
                visibleCards[index] 
                  ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
                  : 'opacity-0 translate-y-24 scale-95 rotate-2'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className="group relative overflow-hidden border-border hover:border-secondary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-3 hover:scale-105 bg-card h-full flex flex-col">
                {/* Ambient glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />
                </div>

                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-500">
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-secondary to-accent rounded-full shadow-xl backdrop-blur-sm">
                      <div className="w-2 h-2 rounded-full bg-white animate-glow-pulse" />
                      {project.category}
                    </span>
                  </div>

                  {/* Gradient overlay line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <CardContent className="p-8 relative flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors duration-500">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={tag}
                        className={`px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted rounded-full group-hover:bg-gradient-to-r group-hover:from-secondary/20 group-hover:to-accent/20 group-hover:text-secondary transition-all duration-500 ${
                          visibleCards[index] ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                        }`}
                        style={{ transitionDelay: `${(index * 200) + (idx * 100)}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="group/btn relative w-full bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-white font-bold shadow-lg hover:shadow-xl hover:shadow-secondary/50 transition-all duration-500 hover:scale-105 mt-auto overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Project Details
                      <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all duration-300" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            onClick={() => navigate('/projects')}
            className="group relative bg-gradient-to-r from-secondary to-accent hover:shadow-2xl hover:shadow-secondary/50 text-white font-semibold px-10 py-6 text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
          >
            <span className="relative z-10 flex items-center">
              View All Projects
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
