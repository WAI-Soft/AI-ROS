import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import MissionVisionSection from '@/components/about/MissionVisionSection';
import TimelineSection from '@/components/about/TimelineSection';
import LeadershipTeamSection from '@/components/about/LeadershipTeamSection';

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="About AI-ROS"
          subtitle="Pioneering AI-driven solutions for a smarter, more sustainable future"
          badge="Our Story"
          parallax
          fullHeight
        />
        <MissionVisionSection />
        <TimelineSection />
        <LeadershipTeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
