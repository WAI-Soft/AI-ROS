import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectBanner from '@/components/project-detail/ProjectBanner';
import QuickFacts from '@/components/project-detail/QuickFacts';
import SectionContainer from '@/components/shared/SectionContainer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { api } from '@/lib/api';

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
    <div className="min-h-screen">
      <Header />
      <main>
        <ProjectBanner
          title={project.title}
          categories={project.categories}
          image={project.banner_image_url}
        />

        {/* Main Content */}
        <SectionContainer background="default">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-card to-muted border border-border text-foreground font-medium hover:border-secondary/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Download CTA */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Want to Learn More?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Download the complete case study with detailed technical specifications and results.
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Case Study
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <QuickFacts
                  client={project.client}
                  year={project.year}
                  location={project.location}
                  metrics={project.key_metrics}
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* CTA Section */}
        <SectionContainer background="muted">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can create a similar solution tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold text-lg px-8"
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
                className="border-2 border-border hover:border-secondary/50 font-semibold text-lg px-8"
                asChild
              >
                <a href="/projects">View More Projects</a>
              </Button>
            </div>
          </div>
        </SectionContainer>
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
