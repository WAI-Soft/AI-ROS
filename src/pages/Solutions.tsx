import { useParams } from 'react-router-dom';
import { Droplets, Leaf, TrendingUp, Zap, Cloud, Cpu, Users, Building2, Car, Lightbulb, Factory, Cog } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import ProblemSolutionOutcome from '@/components/solutions/ProblemSolutionOutcome';
import FeatureGrid from '@/components/solutions/FeatureGrid';
import TechStackBadges from '@/components/solutions/TechStackBadges';

const Solutions = () => {
  const { slug } = useParams<{ slug: string }>();

  // Solution data
  const solutionData: Record<string, any> = {
    'smart-agriculture': {
      title: 'Smart Agriculture',
      subtitle: 'Revolutionizing farming with AI-powered precision agriculture solutions',
      backgroundImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop',
      problem: 'Traditional farming methods struggle with resource inefficiency, unpredictable yields, and environmental impact. Farmers face challenges in optimizing water usage, detecting crop diseases early, and making data-driven decisions.',
      solution: 'Our AI-powered precision agriculture platform combines IoT sensors, computer vision, and predictive analytics to provide real-time insights. Automated irrigation, pest detection, and yield prediction help farmers maximize productivity while minimizing resource waste.',
      outcome: 'Farmers achieve 40% water savings, 25% yield increase, and 60% reduction in pesticide use. Real-time monitoring and automated systems reduce labor costs by 30% while improving crop quality and sustainability.',
      features: [
        { icon: Droplets, title: 'Precision Irrigation', description: 'AI-driven water management that optimizes irrigation based on soil moisture, weather forecasts, and crop needs.' },
        { icon: Leaf, title: 'Pest Detection', description: 'Computer vision identifies pests and diseases early, enabling targeted treatment and reducing chemical usage.' },
        { icon: TrendingUp, title: 'Yield Prediction', description: 'Machine learning models forecast crop yields with 95% accuracy, helping with planning and resource allocation.' },
        { icon: Zap, title: 'Automated Controls', description: 'Smart systems automatically adjust irrigation, fertilization, and climate control based on real-time data.' },
        { icon: Cloud, title: 'Weather Integration', description: 'Hyperlocal weather forecasting integrated with farm operations for proactive decision-making.' },
        { icon: Cpu, title: 'Edge Computing', description: 'On-farm processing for instant insights and reduced latency in critical operations.' },
      ],
      dashboardImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=675&fit=crop',
      technologies: ['TensorFlow', 'IoT Sensors', 'Computer Vision', 'Edge AI', 'Cloud Analytics', 'MQTT', 'Python', 'React'],
    },
    'smart-cities': {
      title: 'Smart Cities',
      subtitle: 'Building intelligent urban infrastructure for sustainable city living',
      badge: 'Urban Solutions',
      backgroundImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop',
      problem: 'Cities face mounting challenges with traffic congestion, energy waste, pollution, and aging infrastructure. Traditional management systems lack real-time insights and struggle to adapt to growing urban populations.',
      solution: 'Our smart city platform integrates IoT sensors, AI analytics, and automated systems to optimize traffic flow, reduce energy consumption, and improve public services. Real-time monitoring and predictive maintenance ensure efficient urban operations.',
      outcome: 'Cities achieve 30% reduction in traffic congestion, 20% energy savings, and 40% faster emergency response times. Improved air quality and citizen satisfaction while reducing operational costs by 25%.',
      features: [
        { icon: Car, title: 'Traffic Management', description: 'AI-powered traffic optimization reduces congestion and improves flow through intelligent signal control.' },
        { icon: Lightbulb, title: 'Smart Lighting', description: 'Adaptive street lighting that adjusts based on activity, saving energy while maintaining safety.' },
        { icon: Building2, title: 'Building Automation', description: 'Intelligent HVAC and energy management for public buildings, reducing costs and carbon footprint.' },
        { icon: Users, title: 'Public Safety', description: 'Integrated surveillance and emergency response systems for faster incident detection and resolution.' },
        { icon: Zap, title: 'Energy Grid', description: 'Smart grid management optimizes power distribution and integrates renewable energy sources.' },
        { icon: Cloud, title: 'Data Platform', description: 'Centralized platform for city-wide data collection, analysis, and decision-making.' },
      ],
      dashboardImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=675&fit=crop',
      technologies: ['IoT Platform', 'Big Data', 'Machine Learning', 'GIS', '5G', 'Edge Computing', 'Blockchain', 'APIs'],
    },
    'industrial-automation': {
      title: 'Industrial Automation',
      subtitle: 'Transforming manufacturing with intelligent automation and robotics',
      badge: 'Industrial Solutions',
      backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop',
      problem: 'Manufacturing faces challenges with quality control, equipment downtime, and operational inefficiency. Manual processes are error-prone, and reactive maintenance leads to costly production interruptions.',
      solution: 'Our industrial automation solution combines robotics, computer vision, and predictive maintenance to optimize production. AI-powered quality control, automated workflows, and real-time monitoring ensure consistent output and minimal downtime.',
      outcome: 'Manufacturers achieve 99.5% uptime, 60% reduction in defects, and 35% increase in production efficiency. Predictive maintenance reduces maintenance costs by 40% while improving worker safety.',
      features: [
        { icon: Factory, title: 'Robotic Automation', description: 'Intelligent robots handle repetitive tasks with precision, increasing throughput and consistency.' },
        { icon: Cpu, title: 'Quality Control', description: 'Computer vision inspects products at high speed, detecting defects with 99.9% accuracy.' },
        { icon: Cog, title: 'Predictive Maintenance', description: 'AI predicts equipment failures before they occur, enabling proactive maintenance scheduling.' },
        { icon: TrendingUp, title: 'Process Optimization', description: 'Machine learning continuously improves production processes for maximum efficiency.' },
        { icon: Zap, title: 'Energy Management', description: 'Smart systems optimize energy usage across the facility, reducing costs and environmental impact.' },
        { icon: Cloud, title: 'Digital Twin', description: 'Virtual replicas of production lines enable simulation and optimization before implementation.' },
      ],
      dashboardImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=675&fit=crop',
      technologies: ['ROS', 'Computer Vision', 'PLCs', 'SCADA', 'Digital Twin', 'Predictive Analytics', 'OPC UA', 'Industrial IoT'],
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
        <ProblemSolutionOutcome
          problem={solution.problem}
          solution={solution.solution}
          outcome={solution.outcome}
        />
        <FeatureGrid features={solution.features} />
        <TechStackBadges technologies={solution.technologies} />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
