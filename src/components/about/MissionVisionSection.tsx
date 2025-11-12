import { Target, Eye, Lightbulb, Users, Zap, Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionContainer from '@/components/shared/SectionContainer';
import AnimatedCard from '@/components/shared/AnimatedCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { jsPDF } from 'jspdf';

// Function to download company one-pager as PDF
const downloadCompanyOnePager = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('AI-ROS COMPANY ONE-PAGER', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // About AI-ROS
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ABOUT AI-ROS', 20, yPos);
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const aboutText = 'AIROS is an Egypt-based innovation company building AI and robotics solutions that empower people, protect the planet, and reimagine industries. From smart agriculture to sustainable cities, our mission is simple: develop technology that serves people and the planet.';
  const aboutLines = doc.splitTextToSize(aboutText, pageWidth - 40);
  doc.text(aboutLines, 20, yPos);
  yPos += aboutLines.length * 6 + 8;

  // Mission
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('OUR MISSION', 20, yPos);
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const missionText = 'To design scalable AI and robotic systems that tackle real-world challenges in agriculture, water, climate, education, and public policy—helping communities adapt, industries evolve, and nature thrive.';
  const missionLines = doc.splitTextToSize(missionText, pageWidth - 40);
  doc.text(missionLines, 20, yPos);
  yPos += missionLines.length * 6 + 8;

  // Vision
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('OUR VISION', 20, yPos);
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const visionText = 'A world where automation, data, and intelligence enable a greener, more resilient future.';
  const visionLines = doc.splitTextToSize(visionText, pageWidth - 40);
  doc.text(visionLines, 20, yPos);
  yPos += visionLines.length * 6 + 8;

  // Core Values
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CORE VALUES', 20, yPos);
  yPos += 8;

  const values = [
    { title: 'Innovation', desc: 'Pushing boundaries with cutting-edge AI and robotics solutions' },
    { title: 'Excellence', desc: 'Delivering exceptional quality in every project we undertake' },
    { title: 'Collaboration', desc: 'Working closely with clients to achieve shared success' },
    { title: 'Efficiency', desc: 'Optimizing processes to maximize impact and reduce waste' },
    { title: 'Sustainability', desc: 'Building solutions that benefit both business and environment' },
    { title: 'Integrity', desc: 'Maintaining the highest standards of ethics and transparency' },
  ];

  doc.setFontSize(11);
  values.forEach(value => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${value.title}`, 25, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(value.desc, pageWidth - 50);
    doc.text(descLines, 30, yPos);
    yPos += descLines.length * 6 + 4;
  });

  yPos += 6;

  // Solutions
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('OUR SOLUTIONS', 20, yPos);
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const solutions = [
    'GROW+ – Smart Plant Doctor: AI-based plant disease detection platform',
    'Cozy Earth – Air Quality by Design: VR-powered plant recommendation engine',
    'Soil-Sense – Precision Irrigation: Smart irrigation assistant using IoT sensors',
    'RaG SaaS – AI That Thinks With You: Retrieval-Augmented Generation platform',
    'AI LearnLab – Personalized Education with AI: Intelligent tutoring platform',
  ];
  solutions.forEach(solution => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const solutionLines = doc.splitTextToSize(`• ${solution}`, pageWidth - 45);
    doc.text(solutionLines, 25, yPos);
    yPos += solutionLines.length * 6 + 2;
  });

  yPos += 8;

  // Contact
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTACT US', 20, yPos);
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Email: ola@ai-ros.ai', 20, yPos);
  yPos += 6;
  doc.text('Phone: +20 1021183564', 20, yPos);
  yPos += 6;
  doc.text('Location: Cairo, Egypt', 20, yPos);

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`© ${new Date().getFullYear()} AI-ROS. All rights reserved.`, pageWidth / 2, 285, { align: 'center' });
  }

  doc.save('AI-ROS-Company-One-Pager.pdf');
};

interface CoreValue {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const coreValues: CoreValue[] = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge AI and robotics solutions',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Delivering exceptional quality in every project we undertake',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working closely with clients to achieve shared success',
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'Optimizing processes to maximize impact and reduce waste',
  },
  {
    icon: Eye,
    title: 'Sustainability',
    description: 'Building solutions that benefit both business and environment',
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'Maintaining the highest standards of ethics and transparency',
  },
];

const MissionVisionSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  return (
    <SectionContainer background="default" className="bg-gradient-to-b from-background to-muted/20">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <AnimatedCard
            hoverEffect="glow"
            animateOnScroll={true}
            delay={0}
            className="p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To design scalable AI and robotic systems that tackle real-world challenges in agriculture, water, climate, education, and public policy—helping communities adapt, industries evolve, and nature thrive.
            </p>
          </AnimatedCard>

          {/* Vision */}
          <AnimatedCard
            hoverEffect="glow"
            animateOnScroll={true}
            delay={150}
            className="p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A world where automation, data, and intelligence enable a greener, more resilient future.
            </p>
          </AnimatedCard>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-secondary bg-secondary/10 rounded-full border border-secondary/30 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse" />
            Core Values
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            What Drives Us Forward
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Our values guide every decision we make and every solution we create
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <AnimatedCard
                key={value.title}
                hoverEffect="lift"
                animateOnScroll={true}
                delay={index * 100}
                className="p-6"
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-card to-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Download CTA */}
        <div
          className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <Button
            size="lg"
            onClick={downloadCompanyOnePager}
            className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-semibold px-8"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Company One-Pager
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default MissionVisionSection;
