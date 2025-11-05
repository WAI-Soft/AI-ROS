import { useState } from 'react';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import SectionContainer from '@/components/shared/SectionContainer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  demoVideo?: string;
}

interface FeatureGridProps {
  features: Feature[];
}

const FeatureGrid = ({ features }: FeatureGridProps) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  return (
    <>
      <SectionContainer background="default" className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div ref={sectionRef} className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30 backdrop-blur-sm transition-all duration-700 shadow-lg shadow-secondary/10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Sparkles className="w-4 h-4 animate-glow-pulse" />
              Key Features
            </div>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
                Powerful Capabilities
              </span>
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Advanced features designed to maximize efficiency and drive measurable results
            </p>
          </div>

          {/* Features Grid - Redesigned */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={feature.title}
                  className={cn(
                    'group relative transition-all duration-700',
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => feature.demoVideo && setSelectedFeature(feature)}
                >
                  {/* Card Container */}
                  <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-card/80 to-muted/50 backdrop-blur-sm border border-border hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20 cursor-pointer overflow-hidden">
                    
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Rotating Orb */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl group-hover:scale-150 group-hover:rotate-180 transition-all duration-1000" />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon Container */}
                      <div className="relative mb-6">
                        {/* Glow Effect */}
                        <div className={cn(
                          "absolute inset-0 bg-secondary/30 blur-2xl rounded-full transition-all duration-700",
                          isHovered ? "scale-150 opacity-100" : "scale-100 opacity-0"
                        )} />
                        
                        {/* Icon Background */}
                        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 animate-pulse" />
                          <Icon className="relative w-10 h-10 text-secondary group-hover:scale-110 transition-transform duration-300" />
                        </div>

                        {/* Feature Number Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-xs font-bold shadow-lg">
                          {index + 1}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors duration-300">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6 min-h-[4.5rem]">
                        {feature.description}
                      </p>

                      {/* Bottom Section */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50 group-hover:border-secondary/30 transition-colors">
                        {/* Demo Video Indicator */}
                        {feature.demoVideo ? (
                          <div className="flex items-center gap-2 text-sm text-secondary font-semibold group-hover:gap-3 transition-all">
                            <Play className="w-4 h-4" />
                            <span>Watch Demo</span>
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground font-medium">
                            Learn More
                          </div>
                        )}

                        {/* Arrow Icon */}
                        <div className="w-8 h-8 rounded-full bg-secondary/10 group-hover:bg-secondary/20 flex items-center justify-center transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Decorative Corner Accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div
            className={`mt-16 text-center transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-muted-foreground mb-4">
              Want to see these features in action?
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Schedule a Demo
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </SectionContainer>

      {/* Demo Video Modal */}
      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              {selectedFeature && (
                <>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                    <selectedFeature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <span>{selectedFeature.title}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            {selectedFeature?.demoVideo && (
              <div className="relative aspect-video bg-muted rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={selectedFeature.demoVideo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}
            {selectedFeature && (
              <div className="mt-6 p-6 rounded-xl bg-muted/50">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {selectedFeature.description}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeatureGrid;
