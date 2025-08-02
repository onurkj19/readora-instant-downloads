import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: <Download className="w-6 h-6" />,
    title: "Instant Downloads",
    description: "Get immediate access to your purchased products. No waiting, no shipping delays.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Payments",
    description: "Your transactions are protected with industry-standard encryption and security measures.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "High Quality",
    description: "All products are carefully curated and tested to ensure premium quality and value.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Lifetime Access",
    description: "Purchase once and keep forever. Re-download your products anytime from your account.",
  },
];

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Readora Digitals?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're passionate about providing high-quality digital products that help professionals, 
              entrepreneurs, and creators achieve their goals. From comprehensive eBooks to beautiful 
              templates and graphics, every product in our store is designed to deliver real value.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/shop">
                  Start Shopping
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:pl-8">
            <div className="bg-gradient-card rounded-2xl p-8 shadow-card">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Our Impact
              </h3>
              
              <div className="space-y-6">
                <div className="text-center pb-6 border-b border-border">
                  <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
                  <div className="text-muted-foreground">Premium Products</div>
                </div>
                
                <div className="text-center pb-6 border-b border-border">
                  <div className="text-4xl font-bold text-accent mb-2">50,000+</div>
                  <div className="text-muted-foreground">Happy Customers</div>
                </div>
                
                <div className="text-center pb-6 border-b border-border">
                  <div className="text-4xl font-bold text-success mb-2">500,000+</div>
                  <div className="text-muted-foreground">Total Downloads</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-warning mb-2">4.9★</div>
                  <div className="text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;