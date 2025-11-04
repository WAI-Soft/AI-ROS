import { ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Smart Irrigation System',
      category: 'Smart Agriculture',
      description: 'AI-powered irrigation management system that reduced water consumption by 40% while increasing crop yields.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
      stats: ['40% Water Saved', '25% Yield Increase', '500+ Farms'],
      tags: ['IoT', 'AI', 'Agriculture'],
    },
    {
      title: 'Urban Traffic Management',
      category: 'Smart Cities',
      description: 'Intelligent traffic system that optimized flow and reduced congestion by 35% in metropolitan areas.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format&fit=crop',
      stats: ['35% Less Congestion', '20% Faster Commute', '3M Citizens'],
      tags: ['AI', 'Smart City', 'Transportation'],
    },
    {
      title: 'Predictive Maintenance Suite',
      category: 'Industrial Automation',
      description: 'Machine learning platform that predicts equipment failures, reducing downtime by 60% for manufacturers.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
      stats: ['60% Less Downtime', '$2M Saved', '100+ Factories'],
      tags: ['ML', 'Industry 4.0', 'Automation'],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30">
            Featured Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world implementations delivering measurable impact across industries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="group relative overflow-hidden border-border hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 animate-fade-in-up hover:-translate-y-3"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-accent/20 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />
              </div>

              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                
                {/* Animated overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                
                <div className="absolute bottom-4 left-4 right-4 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-secondary/90 rounded-full animate-glow-pulse shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 relative">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-border group-hover:border-secondary/30 transition-colors duration-300">
                  {project.stats.map((stat, idx) => (
                    <div 
                      key={stat} 
                      className="text-center transform group-hover:scale-105 transition-transform duration-300"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <div className="text-xs font-semibold text-secondary whitespace-nowrap animate-glow-pulse">
                        {stat.split(' ')[0]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.split(' ').slice(1).join(' ')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded group-hover:bg-secondary/10 group-hover:text-secondary transition-all duration-300 transform group-hover:scale-105"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="group/btn relative text-secondary hover:text-secondary p-0 h-auto font-semibold w-full justify-center overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    View Project
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 group-hover/btn:rotate-12 transition-all duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold px-8"
          >
            View All Projects
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
