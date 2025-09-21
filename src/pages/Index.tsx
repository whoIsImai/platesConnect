import { Header } from "@/components/Header";
import { Home } from "@/components/Home";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Home />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  );
};

export default Index;