import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import SolutionsSection from '@/components/home/SolutionsSection';
import ImpactSection from '@/components/home/ImpactSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import PartnersSection from '@/components/home/PartnersSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
        <ImpactSection />
        <ProjectsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
