import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import SolutionsListSection from '@/components/solutions/SolutionsListSection';

const Solutions = () => {
  const { slug } = useParams<{ slug: string }>();

  const solutionData: Record<string, any> = {
    'smart-agriculture': {
      title: 'Smart Agriculture',
      subtitle: 'Revolutionizing farming with AI-powered precision agriculture solutions',
      backgroundImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop',
    },
    'smart-cities': {
      title: 'Smart Cities',
      subtitle: 'Building intelligent urban infrastructure for sustainable city living',
      badge: 'Urban Solutions',
      backgroundImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop',
    },
    'industrial-automation': {
      title: 'Industrial Automation',
      subtitle: 'Transforming manufacturing with intelligent automation and robotics',
      badge: 'Industrial Solutions',
      backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop',
    },
  };

  const solution = slug ? solutionData[slug] : solutionData['smart-agriculture'];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title={solution.title}
          subtitle={solution.subtitle}
          badge={solution.badge}
          backgroundImage={solution.backgroundImage}
          parallax
          fullHeight
          ctaButtons={[
            { label: 'Request Demo', href: '/contact', variant: 'primary' },
            { label: 'View Projects', href: '/projects', variant: 'secondary' },
          ]}
        />
        <SolutionsListSection />

      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
