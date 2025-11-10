import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import SolutionsListSection from '@/components/solutions/SolutionsListSection';

const Solutions = () => {
  const { slug } = useParams<{ slug: string }>();

  // Default hero content for /solutions page
  const defaultSolution = {
    title: 'Our Solutions',
    subtitle: 'AIROS focuses on technology that creates real impact — from sustainable agriculture to democratizing AI education',
    badge: 'Tech That Matters',
    backgroundImage: '/src/assets/background1.jpg',
  };

  const solutionData: Record<string, any> = {
    'smart-agriculture': {
      title: 'Smart Agriculture',
      subtitle: 'Revolutionizing farming with AI-powered precision agriculture solutions',
      backgroundImage: '/src/assets/background1.jpg',
    },
    'smart-cities': {
      title: 'Smart Cities',
      subtitle: 'Building intelligent urban infrastructure for sustainable city living',
      badge: 'Urban Solutions',
      backgroundImage: '/src/assets/background1.jpg',
    },
    'industrial-automation': {
      title: 'Industrial Automation',
      subtitle: 'Transforming manufacturing with intelligent automation and robotics',
      badge: 'Industrial Solutions',
      backgroundImage: '/src/assets/background1.jpg',
    },
  };

  const solution = slug ? solutionData[slug] : defaultSolution;

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
        />
        <SolutionsListSection />

      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
