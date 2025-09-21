import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Leaf, Zap } from "lucide-react";
import heroCommunity from "@/assets/hero-community.jpg";

export const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroCommunity})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Food
            <span className="block text-primary-glow">Surplus to Plate</span>
            <span className="block">Connector</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Connecting farmers' surplus with community kitchens through AI-driven nutrition matching, 
            WhatsApp education, and circular economy solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              variant="orange" 
              className="text-lg px-8 py-4"
              onClick={() => window.location.href = '/login'}
            >
              Start Connecting Food
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"  
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center animate-slide-up">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-primary-glow mr-2" />
                <span className="text-3xl font-bold">50K+</span>
              </div>
              <p className="text-white/80">Communities Connected</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-center mb-3">
                <Leaf className="h-8 w-8 text-primary-glow mr-2" />
                <span className="text-3xl font-bold">2M+</span>
              </div>
              <p className="text-white/80">Meals Generated</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center justify-center mb-3">
                <Zap className="h-8 w-8 text-primary-glow mr-2" />
                <span className="text-3xl font-bold">80%</span>
              </div>
              <p className="text-white/80">Waste Reduction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};