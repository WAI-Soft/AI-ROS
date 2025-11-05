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
    { id: 'smart-agriculture', name: 'Smart Agriculture', count: 12 },
    { id: 'smart-cities', name: 'Smart Cities', count: 8 },
    { id: 'industrial-automation', name: 'Industrial Automation', count: 15 },
  ];

  const years = [2024, 2023, 2022, 2021, 2020];

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        // Build query params
        const params: any = {
          page: currentPage,
          per_page: 12,
        };

        if (filters.category) params.category = filters.category;
        if (filters.year) params.year = filters.year;
        if (filters.search) params.search = filters.search;

        // API call (will use mock data if API fails)
        const data = await api.get<{ data: Project[]; has_more: boolean }>('/projects', { params });

        if (currentPage === 1) {
          setProjects(data.data);
        } else {
          setProjects((prev) => [...prev, ...data.data]);
        }

        setHasMore(data.has_more);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Use mock data
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
    slug: 'automated-vineyard-management',
    title: 'Automated Vineyard Management System',
    excerpt: 'AI-powered precision agriculture solution reducing water consumption by 40% while increasing yield by 25% across 5,000 hectares.',
    banner_image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    categories: ['Smart Agriculture'],
    year: 2024,
    location: 'Napa Valley, CA',
  },
  {
    slug: 'smart-traffic-optimization',
    title: 'Smart Traffic Optimization Platform',
    excerpt: 'Intelligent traffic management system reducing congestion by 30% and improving emergency response times by 40%.',
    banner_image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    categories: ['Smart Cities'],
    year: 2024,
    location: 'Singapore',
  },
  {
    slug: 'predictive-maintenance-manufacturing',
    title: 'Predictive Maintenance for Manufacturing',
    excerpt: 'AI-driven predictive maintenance achieving 99.5% uptime and reducing maintenance costs by 40% in automotive production.',
    banner_image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    categories: ['Industrial Automation'],
    year: 2023,
    location: 'Detroit, MI',
  },
  {
    slug: 'precision-irrigation-system',
    title: 'Precision Irrigation Network',
    excerpt: 'IoT-enabled irrigation system optimizing water usage across 10,000 acres, saving 2 million gallons annually.',
    banner_image_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop',
    categories: ['Smart Agriculture'],
    year: 2023,
    location: 'Central Valley, CA',
  },
  {
    slug: 'urban-energy-grid',
    title: 'Urban Smart Energy Grid',
    excerpt: 'Intelligent energy distribution system reducing city-wide energy consumption by 20% and integrating renewable sources.',
    banner_image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    categories: ['Smart Cities'],
    year: 2023,
    location: 'Copenhagen, Denmark',
  },
  {
    slug: 'robotic-quality-control',
    title: 'Robotic Quality Control System',
    excerpt: 'Computer vision-powered quality inspection detecting defects with 99.9% accuracy at 10x human speed.',
    banner_image_url: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop',
    categories: ['Industrial Automation'],
    year: 2022,
    location: 'Shenzhen, China',
  },
];

export default Projects;
