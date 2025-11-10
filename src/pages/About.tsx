import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import MissionVisionSection from '@/components/about/MissionVisionSection';
import TimelineSection from '@/components/about/TimelineSection';
import FAQSection from '@/components/about/FAQSection';

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="About AI-ROS"
          subtitle="AIROS is an Egypt-based innovation company building AI and robotics solutions that empower people, protect the planet, and reimagine industries. From smart agriculture to sustainable cities, our mission is simple: develop technology that serves people and the planet."
          badge="Our Story"
          backgroundImage="/src/assets/background1.jpg"
          parallax
          fullHeight
        />
        <MissionVisionSection />
        <TimelineSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
