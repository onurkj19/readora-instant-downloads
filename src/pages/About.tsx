import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Quality First",
      description: "Every product in our store is carefully curated and tested to ensure it meets our high standards of quality and value.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Success",
      description: "We're committed to helping our customers achieve their goals with products that deliver real, measurable results.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Innovation",
      description: "We constantly innovate and update our products to stay ahead of industry trends and best practices.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Reliability",
      description: "Count on us for consistent quality, secure transactions, and exceptional customer support every time.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                About Readora Digitals
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We're passionate about creating and curating high-quality digital products 
                that help professionals, entrepreneurs, and creators achieve their goals.
              </p>
              <Button asChild variant="default" size="lg">
                <Link to="/shop">
                  Explore Our Products
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Readora Digitals was founded with a simple mission: to democratize access to high-quality 
                  digital resources that can transform businesses and careers. We recognized that many 
                  professionals and entrepreneurs needed premium tools, templates, and educational content 
                  but couldn't afford expensive consultants or custom solutions.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  What started as a small collection of business templates has grown into a comprehensive 
                  marketplace featuring thousands of digital products across multiple categories. From 
                  in-depth eBooks and courses to professionally designed templates and graphics, we've 
                  built our reputation on quality, value, and customer satisfaction.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, we serve over 50,000 customers worldwide, and our products have been downloaded 
                  more than 500,000 times. We're proud to be a trusted partner in our customers' 
                  professional journeys, providing the tools and knowledge they need to succeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
                Our Impact
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
                  <div className="text-muted-foreground">Premium Products</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">50,000+</div>
                  <div className="text-muted-foreground">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-success mb-2">500,000+</div>
                  <div className="text-muted-foreground">Total Downloads</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-warning mb-2">4.9★</div>
                  <div className="text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Join thousands of satisfied customers and discover the power of premium digital products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/shop">
                    Browse Products
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;