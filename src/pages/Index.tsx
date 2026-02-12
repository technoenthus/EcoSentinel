import GalaxyBackground from '@/components/GalaxyBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import WalkthroughSection from '@/components/WalkthroughSection';
import SolutionSection from '@/components/SolutionSection';
import DashboardSection from '@/components/DashboardSection';
import AIModelSection from '@/components/AIModelSection';
import ImpactSection from '@/components/ImpactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <GalaxyBackground />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <WalkthroughSection />
        <SolutionSection />
        <DashboardSection />
        <AIModelSection />
        <ImpactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
