import { Target, Eye, Lightbulb, Users, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionContainer from '@/components/shared/SectionContainer';
import AnimatedCard from '@/components/shared/AnimatedCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface CoreValue {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const coreValues: CoreValue[] = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge AI and robotics solutions',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Delivering exceptional quality in every project we undertake',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working closely with clients to achieve shared success',
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'Optimizing processes to maximize impact and reduce waste',
  },
  {
    icon: Eye,
    title: 'Sustainability',
    description: 'Building solutions that benefit both business and environment',
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'Maintaining the highest standards of ethics and transparency',
  },
];

const MissionVisionSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  return (
    <SectionContainer background="default" className="bg-gradient-to-b from-background to-muted/20">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <AnimatedCard
            hoverEffect="glow"
            animateOnScroll={true}
            delay={0}
            className="p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To empower businesses and communities with intelligent automation solutions that drive
              sustainable growth, operational excellence, and positive environmental impact through
              the innovative application of artificial intelligence and robotics.
            </p>
          </AnimatedCard>

          {/* Vision */}
          <AnimatedCard
            hoverEffect="glow"
            animateOnScroll={true}
            delay={150}
            className="p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be the global leader in AI-driven automation, transforming industries through
              innovative technology that creates a smarter, more sustainable, and more connected
              world for future generations.
            </p>
          </AnimatedCard>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30 backdrop-blur-sm transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse" />
            Core Values
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What Drives Us Forward
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Our values guide every decision we make and every solution we create
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <AnimatedCard
                key={value.title}
                hoverEffect="lift"
                animateOnScroll={true}
                delay={index * 100}
                className="p-6"
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-card to-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Download CTA */}
        <div
          className={`text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold px-8"
          >
            Download Company One-Pager
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default MissionVisionSection;
