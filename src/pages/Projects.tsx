import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import ProjectFilterBar, { ProjectFilters } from '@/components/projects/ProjectFilterBar';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { Project } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Parse filters from URL
  const [filters, setFilters] = useState<ProjectFilters>({
    category: searchParams.get('category') || undefined,
    year: searchParams.get('year') ? parseInt(searchParams.get('year')!) : undefined,
    search: searchParams.get('search') || undefined,
  });

  // Mock data for categories and years
  const categories = [
    { id: 'smart-agriculture', name: 'Smart Agriculture', count: 2 },
    { id: 'smart-cities', name: 'Smart Cities', count: 1 },
    { id: 'sustainability', name: 'Sustainability', count: 3 },
    { id: 'technology', name: 'Technology', count: 3 },
    { id: 'education', name: 'Education', count: 1 },
  ];

  const years = [2025, 2024, 2023, 2022, 2021, 2020];

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        // Filter mock data based on current filters
        let filteredProjects = [...mockProjects];

        // Filter by category
        if (filters.category) {
          filteredProjects = filteredProjects.filter((project) =>
            project.categories.some((cat) => 
              cat.toLowerCase().replace(' ', '-') === filters.category
            )
          );
        }

        // Filter by year
        if (filters.year) {
          filteredProjects = filteredProjects.filter((project) => project.year === filters.year);
        }

        // Filter by search query
        if (filters.search && filters.search.trim() !== '') {
          const searchLower = filters.search.toLowerCase();
          filteredProjects = filteredProjects.filter((project) =>
            project.title.toLowerCase().includes(searchLower) ||
            project.excerpt.toLowerCase().includes(searchLower) ||
            project.location.toLowerCase().includes(searchLower) ||
            project.categories.some((cat) => cat.toLowerCase().includes(searchLower))
          );
        }

        setProjects(filteredProjects);
        setHasMore(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(mockProjects);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filters, currentPage]);

  // Update URL when filters change
  const handleFilterChange = (newFilters: ProjectFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);

    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.year) params.set('year', newFilters.year.toString());
    if (newFilters.search) params.set('search', newFilters.search);

    setSearchParams(params);
  };

  const handleSearchChange = (query: string) => {
    handleFilterChange({ ...filters, search: query });
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="Our Projects"
          subtitle="Explore our portfolio of successful AI and automation implementations"
          backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
          parallax
          fullHeight
        />

        <ProjectFilterBar
          categories={categories}
          years={years}
          tags={[]}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          currentFilters={filters}
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ProjectGrid projects={projects} loading={loading} />

            {/* Load More Button */}
            {!loading && hasMore && projects.length > 0 && (
              <div className="mt-12 text-center">
                <Button
                  size="lg"
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold px-8"
                >
                  Load More Projects
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Mock data for development
const mockProjects: Project[] = [
  {
    slug: 'green-delta-project',
    title: 'Green Delta Project',
    excerpt: 'Soil-Sense deployment in Egypt\'s Delta region, reducing irrigation by 35%. Smart irrigation assistant using IoT sensors and AI algorithms to monitor moisture, nutrients, and environmental conditions.',
    banner_image_url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    categories: ['Smart Agriculture', 'Sustainability'],
    year: 2024,
    location: 'Nile Delta, Egypt',
  },
  {
    slug: 'urban-wellness-labs',
    title: 'Urban Wellness Labs',
    excerpt: 'Cozy Earth pilot in Cairo & Berlin to improve indoor air quality in co-working hubs. VR-powered, AI-guided plant recommendation engine based on local pollution data and oxygen needs.',
    banner_image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    categories: ['Smart Cities', 'Sustainability'],
    year: 2024,
    location: 'Cairo & Berlin',
  },
  {
    slug: 'agroedge',
    title: 'AgroEdge',
    excerpt: 'GROW+ integration with drones for field monitoring in smallholder farms. AI-based plant disease detection platform supporting over 30 species, empowering farmers with early diagnosis.',
    banner_image_url: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=800&h=600&fit=crop',
    categories: ['Smart Agriculture', 'Technology'],
    year: 2024,
    location: 'Sub-Saharan Africa',
  },
  {
    slug: 'policysim',
    title: 'PolicySim',
    excerpt: 'RaG SaaS tool used by NGOs for carbon policy simulations. Retrieval-Augmented Generation platform for building decision-support agents trained on policies, documents, and data.',
    banner_image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    categories: ['Technology', 'Sustainability'],
    year: 2024,
    location: 'Global',
  },
  {
    slug: 'ai-learnsprint',
    title: 'AI LearnSprint',
    excerpt: 'AI LearnLab deployed in rural schools with dynamic science support and offline-first features. Platform combining intelligent tutoring, curriculum personalization, and interactive tools for accessible education.',
    banner_image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    categories: ['Education', 'Technology'],
    year: 2024,
    location: 'Rural Communities',
  },
];

export default Projects;
