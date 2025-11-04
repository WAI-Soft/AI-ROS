import { Sprout, Building2, Factory, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SolutionsSection = () => {
  const solutions = [
    {
      icon: Sprout,
      title: 'Smart Agriculture',
      description:
        'Precision farming solutions powered by AI and IoT. Monitor crop health, optimize irrigation, and maximize yields with data-driven insights.',
      features: ['Crop Monitoring', 'Automated Irrigation', 'Yield Prediction'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Building2,
      title: 'Smart Cities',
      description:
        'Transform urban spaces with intelligent infrastructure. Traffic optimization, energy management, and enhanced public services for sustainable living.',
      features: ['Traffic Management', 'Energy Optimization', 'Public Safety'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Factory,
      title: 'Industrial Automation',
      description:
        'Streamline operations with AI-powered automation. Predictive maintenance, quality control, and process optimization for maximum efficiency.',
      features: ['Predictive Maintenance', 'Quality Control', 'Process Optimization'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30">
            Our Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transforming Industries with AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions tailored to revolutionize your operations and drive sustainable growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card
              key={solution.title}
              className="group relative overflow-hidden hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 border-border animate-fade-in-up hover:-translate-y-3"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} animate-gradient-shift`} style={{ backgroundSize: '200% 200%' }} />
              </div>
              
              {/* Border beam effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${solution.color} opacity-50 blur-xl`} style={{ width: '50%', height: '2px', top: 0, left: 0 }} />
              </div>

              <CardContent className="p-8 relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg animate-float`} style={{ animationDelay: `${index * 200}ms` }}>
                  <solution.icon className="w-7 h-7 text-white animate-glow-pulse" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                  {solution.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {solution.description}
                </p>

                <div className="space-y-2 mb-6">
                  {solution.features.map((feature, idx) => (
                    <div 
                      key={feature} 
                      className="flex items-center text-sm text-muted-foreground opacity-0 animate-fade-in"
                      style={{ animationDelay: `${(index * 150) + (idx * 100)}ms`, animationFillMode: 'forwards' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-3 animate-glow-pulse" style={{ animationDelay: `${idx * 200}ms` }} />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="group/btn text-secondary hover:text-secondary p-0 h-auto font-semibold relative overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-secondary/10 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
