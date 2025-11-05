import { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import SectionContainer from '@/components/shared/SectionContainer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface Milestone {
  year: number;
  title: string;
  description: string;
  image?: string;
}

const milestones: Milestone[] = [
  {
    year: 2015,
    title: 'Company Founded',
    description:
      'AI-ROS was established with a vision to revolutionize industries through intelligent automation. Our founding team of AI researchers and robotics engineers came together to bridge the gap between cutting-edge technology and practical business applications.',
    image: '/images/timeline/2015.jpg',
  },
  {
    year: 2017,
    title: 'First Smart Agriculture Project',
    description:
      'Successfully deployed our first precision agriculture solution, helping a 5,000-hectare farm reduce water consumption by 40% while increasing crop yield by 25%. This project established our reputation in the agricultural technology sector.',
    image: '/images/timeline/2017.jpg',
  },
  {
    year: 2018,
    title: 'Smart City Initiative Launch',
    description:
      'Partnered with municipal governments to implement intelligent traffic management and energy optimization systems. Our solutions reduced traffic congestion by 30% and energy costs by 20% in pilot cities.',
    image: '/images/timeline/2018.jpg',
  },
  {
    year: 2020,
    title: 'Industrial Automation Expansion',
    description:
      'Expanded into manufacturing automation, deploying AI-powered quality control and predictive maintenance systems. Helped clients achieve 99.5% uptime and reduce defect rates by 60%.',
    image: '/images/timeline/2020.jpg',
  },
  {
    year: 2022,
    title: 'International Recognition',
    description:
      'Received multiple industry awards for innovation and sustainability. Expanded operations to serve clients across three continents, with a growing portfolio of 50+ successful projects.',
    image: '/images/timeline/2022.jpg',
  },
  {
    year: 2024,
    title: 'AI Research Lab Opening',
    description:
      'Opened our dedicated AI research facility to advance machine learning, computer vision, and robotics technologies. Committed to pushing the boundaries of what\'s possible in intelligent automation.',
    image: '/images/timeline/2024.jpg',
  },
];

const TimelineSection = () => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const toggleMilestone = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <SectionContainer background="muted">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30 backdrop-blur-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Our Journey
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            A Decade of Innovation
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            From humble beginnings to industry leadership, explore the milestones that shaped our story
          </p>
        </div>

        {/* Timeline - Desktop: Horizontal, Mobile: Vertical */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            {/* Timeline Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />

            <div className="grid grid-cols-6 gap-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={cn(
                    'relative transition-all duration-700 ease-out',
                    isVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-12 scale-95',
                    expandedYear === milestone.year && 'mb-48'
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Year Marker */}
                  <div className="flex flex-col items-center mb-6">
                    <div className={cn(
                      'w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-base shadow-lg shadow-secondary/30 relative z-10 transition-all duration-500',
                      isVisible && 'animate-pulse-slow',
                      expandedYear === milestone.year && 'ring-4 ring-secondary/30 scale-110'
                    )}>
                      {milestone.year.toString().slice(-2)}
                    </div>
                    <div className="mt-3 text-base font-bold text-foreground">
                      {milestone.year}
                    </div>
                  </div>

                  {/* Content Card */}
                  <button
                    onClick={() => toggleMilestone(milestone.year)}
                    className={cn(
                      'w-full h-32 p-5 rounded-xl bg-card/80 backdrop-blur-sm border border-border transition-all duration-500 group flex flex-col items-center justify-center text-center gap-3',
                      expandedYear === milestone.year 
                        ? 'border-secondary shadow-xl shadow-secondary/30 scale-105' 
                        : 'hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20 hover:scale-105'
                    )}
                  >
                    <h3 className="font-bold text-sm text-foreground group-hover:text-secondary transition-colors leading-tight">
                      {milestone.title}
                    </h3>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-secondary transition-all duration-500',
                        expandedYear === milestone.year && 'rotate-180 scale-125'
                      )}
                    />
                  </button>

                  {/* Expanded Description */}
                  {expandedYear === milestone.year && (
                    <div className={cn(
                      "absolute top-full mt-6 w-[400px] p-6 rounded-xl bg-card border-2 border-secondary/50 shadow-2xl shadow-secondary/30 z-20 animate-fade-in-down",
                      index === milestones.length - 1 ? "right-0" : "left-0"
                    )}>
                      <div className={cn(
                        "absolute -top-3 w-6 h-6 bg-card border-l-2 border-t-2 border-secondary/50 rotate-45",
                        index === milestones.length - 1 ? "right-8" : "left-8"
                      )} />
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={cn(
                  'relative pl-12 transition-all duration-700',
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : index % 2 === 0
                    ? 'opacity-0 -translate-x-8'
                    : 'opacity-0 translate-x-8'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary/50 to-secondary/20" />

                {/* Year Marker */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold shadow-lg shadow-secondary/30">
                  {milestone.year.toString().slice(-2)}
                </div>

                {/* Content Card */}
                <button
                  onClick={() => toggleMilestone(milestone.year)}
                  className="w-full text-left p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-secondary">
                      {milestone.year}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-secondary transition-transform duration-300',
                        expandedYear === milestone.year && 'rotate-180'
                      )}
                    />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {milestone.title}
                  </h3>
                  {expandedYear === milestone.year && (
                    <p className="text-muted-foreground leading-relaxed mt-4 animate-fade-in">
                      {milestone.description}
                    </p>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default TimelineSection;
