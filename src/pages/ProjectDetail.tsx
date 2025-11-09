import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionContainer from '@/components/shared/SectionContainer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, ArrowLeft, Building2, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { api } from '@/lib/api';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ProjectDetail {
  title: string;
  slug: string;
  description: string;
  banner_image_url: string;
  client?: string;
  year: number;
  location?: string;
  key_metrics: Record<string, any>;
  tech_stack: string[];
  categories: string[];
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroRef, heroVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await api.get<ProjectDetail>(`/projects/${slug}`);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
        // Use mock data
        setProject(mockProject);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Project Not Found</h2>
          <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Background Image */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden py-24">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={project.banner_image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,40%,8%)]/80 via-[hsl(210,40%,8%)]/75 to-[hsl(210,40%,8%)]/80" />
          </div>

          {/* Content */}
          <div className="relative z-40 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-6xl mx-auto">
              {/* Back Button */}
              <Link to="/projects" className={`inline-block mb-8 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-1 translate-y-4'}`}>
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>

              {/* Categories */}
              <div className={`flex flex-wrap gap-3 mb-8 transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-1 translate-y-4'}`}>
                {project.categories.map((category, index) => (
                  <span
                    key={category}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-700/20 to-orange-800/20 backdrop-blur-md text-amber-500 text-sm font-bold border border-amber-700/30"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-10 leading-[1.1] drop-shadow-2xl transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-1 translate-y-4'}`}>
                {project.title}
              </h1>

              {/* Quick Facts Bar */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-1 translate-y-4'}`}>
                {project.client && (
                  <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Client</span>
                    </div>
                    <div className="text-white font-bold">{project.client}</div>
                  </div>
                )}
                <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-orange-700" />
                    <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Year</span>
                  </div>
                  <div className="text-white font-bold">{project.year}</div>
                </div>
                {project.location && (
                  <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-yellow-600" />
                      <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Location</span>
                    </div>
                    <div className="text-white font-bold">{project.location}</div>
                  </div>
                )}
              </div>

              {/* Impact & Results */}
              <div className={`transition-all duration-700 delay-400 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-1 translate-y-4'}`}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-4 text-sm font-bold text-amber-500 bg-amber-700/20 rounded-full border border-amber-700/30 backdrop-blur-md">
                    <TrendingUp className="w-4 h-4" />
                    Impact & Results
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                    Measurable Success
                  </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(project.key_metrics).map(([key, value], index) => (
                    <div
                      key={key}
                      className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-600/50 transition-all duration-500 hover:-translate-y-1 text-center"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="text-4xl md:text-5xl font-black text-white mb-2">
                        {value}
                      </div>
                      <div className="text-xs font-bold text-white/70 uppercase tracking-wider">
                        {key.replace(/_/g, ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl z-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-800/10 rounded-full blur-3xl z-10" />
        </section>

        {/* Project Description */}
        <section className="relative py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-amber-700/5 rounded-full blur-3xl" />
            <div className="absolute bottom-40 left-10 w-96 h-96 bg-orange-800/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 text-sm font-bold text-amber-600 bg-amber-700/10 rounded-full border border-amber-700/20">
                  <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
                  Project Deep Dive
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                  Complete Case Study
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Explore the full journey from challenge to solution and measurable impact
                </p>
              </div>

              {/* Blur Card Container */}
              <div className="p-8 md:p-12 lg:p-16 rounded-3xl bg-card/40 backdrop-blur-xl border border-border/50 shadow-2xl">
                {/* Enhanced Article Content */}
                <article className="prose prose-xl max-w-none text-center
                  prose-headings:font-black prose-headings:tracking-tight prose-headings:text-center
                  prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-10 prose-h2:first:mt-0
                  prose-h2:pb-5 prose-h2:border-b-2 prose-h2:border-border/50
                  prose-h2:bg-gradient-to-r prose-h2:from-amber-600 prose-h2:via-orange-700 prose-h2:to-yellow-600 
                  prose-h2:bg-clip-text prose-h2:text-transparent
                  prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-foreground
                  prose-h3:flex prose-h3:items-center prose-h3:justify-center prose-h3:gap-3
                  prose-h3:before:content-[''] prose-h3:before:w-1 prose-h3:before:h-6 
                  prose-h3:before:bg-gradient-to-b prose-h3:before:from-amber-600 prose-h3:before:to-orange-700 
                  prose-h3:before:rounded-full
                  prose-p:text-muted-foreground prose-p:leading-[1.9] prose-p:text-lg prose-p:mb-6 prose-p:text-center
                  prose-p:first-of-type:text-xl prose-p:first-of-type:leading-relaxed
                  prose-ul:my-8 prose-ul:space-y-4 prose-ul:text-left prose-ul:max-w-3xl prose-ul:mx-auto
                  prose-li:text-muted-foreground prose-li:text-lg prose-li:leading-relaxed
                  prose-li:pl-3 prose-li:marker:text-amber-600 prose-li:marker:text-2xl
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-strong:bg-gradient-to-r prose-strong:from-amber-600/10 prose-strong:to-transparent
                  prose-strong:px-1 prose-strong:py-0.5 prose-strong:rounded
                ">
                  <div dangerouslySetInnerHTML={{ __html: project.description }} />
                </article>

                {/* Tech Stack Section */}
                <div className="mt-20 pt-8 border-t border-border/50">
                  <h3 className="text-2xl font-black text-foreground mb-6 flex items-center justify-center gap-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-amber-600 to-orange-700 rounded-full" />
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {project.tech_stack.map((tech, index) => (
                      <span
                        key={tech}
                        className="px-5 py-3 rounded-xl bg-gradient-to-br from-amber-700/10 to-orange-800/10 
                          border border-amber-700/20 text-foreground font-semibold text-sm
                          hover:border-amber-700/40 hover:shadow-lg hover:shadow-amber-700/10
                          transition-all duration-300 hover:-translate-y-1"
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animation: 'fadeInUp 0.5s ease-out forwards'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="py-20 bg-gradient-to-br from-amber-700/10 via-orange-800/10 to-yellow-700/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="p-12 rounded-3xl bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border border-border/50 shadow-2xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-700/20 to-orange-800/20 flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                  Want to Learn More?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Download the complete case study with detailed technical specifications, implementation process, and comprehensive results analysis.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-700 via-orange-800 to-yellow-700 hover:opacity-90 text-white font-bold text-lg px-8 shadow-lg shadow-amber-700/30"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Case Study
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how we can create a similar solution tailored to your specific needs and challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-700 via-orange-800 to-yellow-700 hover:opacity-90 text-white font-bold text-lg px-10 py-6 shadow-xl shadow-amber-700/30"
                  asChild
                >
                  <a href="/contact">
                    Request a Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-border hover:border-amber-700/50 font-bold text-lg px-10 py-6"
                  asChild
                >
                  <a href="/projects">View More Projects</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Mock data
const mockProject: ProjectDetail = {
  title: 'Automated Vineyard Management System',
  slug: 'automated-vineyard-management',
  description: `
    <h2>The Challenge</h2>
    <p>A 5,000-hectare vineyard in Napa Valley was facing significant challenges with water management, pest control, and yield optimization. Traditional farming methods were leading to excessive water usage, inconsistent crop quality, and difficulty in early pest detection.</p>
    
    <h2>Our Solution</h2>
    <p>We deployed a comprehensive AI-powered precision agriculture platform that combines IoT sensors, computer vision, and predictive analytics. The system includes:</p>
    <ul>
      <li>Network of 500+ soil moisture and weather sensors across the vineyard</li>
      <li>Drone-based computer vision for pest and disease detection</li>
      <li>Machine learning models for yield prediction and irrigation optimization</li>
      <li>Automated irrigation control system with real-time adjustments</li>
      <li>Mobile dashboard for farm managers with actionable insights</li>
    </ul>
    
    <h2>The Results</h2>
    <p>Within the first year of implementation, the vineyard achieved remarkable improvements:</p>
    <ul>
      <li>40% reduction in water consumption, saving 2 million gallons annually</li>
      <li>25% increase in crop yield through optimized growing conditions</li>
      <li>60% reduction in pesticide use through early detection and targeted treatment</li>
      <li>30% reduction in labor costs through automation</li>
      <li>Improved wine quality with more consistent grape characteristics</li>
    </ul>
  `,
  banner_image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
  client: 'Napa Valley Vineyards',
  year: 2024,
  location: 'Napa Valley, California',
  key_metrics: {
    water_saved: '40%',
    yield_increase: '25%',
    cost_reduction: '30%',
    pesticide_reduction: '60%',
  },
  tech_stack: ['TensorFlow', 'IoT Sensors', 'Computer Vision', 'Edge AI', 'Cloud Analytics', 'MQTT', 'Python', 'React'],
  categories: ['Smart Agriculture', 'IoT', 'AI/ML'],
};

export default ProjectDetail;
