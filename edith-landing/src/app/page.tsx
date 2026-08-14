import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { StylesShowcase } from '@/components/styles-showcase';
import { HowItWorks } from '@/components/how-it-works';
import { CreatorsShowcase } from '@/components/creators-showcase';
import { AnalysisSection } from '@/components/analysis-section';
import { FormatsSection } from '@/components/formats-section';
import { TeamSection } from '@/components/team-section';
import { Testimonials } from '@/components/testimonials';
import { PricingSection } from '@/components/pricing-section';
import { FaqSection } from '@/components/faq-section';
import { FinalCta } from '@/components/final-cta';
import { Footer } from '@/components/footer';

const Home: React.FC = () => (
  <div className="min-h-dvh bg-canvas">
    <Header />
    <main>
      <Hero />
      <StylesShowcase />
      <HowItWorks />
      <CreatorsShowcase />
      <AnalysisSection />
      <FormatsSection />
      <TeamSection />
      <Testimonials />
      <PricingSection />
      <FaqSection />
      <FinalCta />
    </main>
    <Footer />
  </div>
);

export default Home;
