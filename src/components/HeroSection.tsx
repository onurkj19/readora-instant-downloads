import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-8">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Premium Digital Products Store
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Instant Access to
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Premium Digital Products</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of high-quality eBooks, templates, graphics, and digital resources. 
            Purchase once, download instantly, own forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild variant="hero" size="lg" className="min-w-[200px]">
              <Link to="/shop">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Digital Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50k+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Instant Download</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
};

export default HeroSection;