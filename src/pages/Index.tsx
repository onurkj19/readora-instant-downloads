import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <AboutSection />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default Index;
