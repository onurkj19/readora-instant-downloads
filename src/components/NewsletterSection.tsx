import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/lib/api";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await subscribeToNewsletter(email);
      
      toast({
        title: "Success!",
        description: result.message || "Thank you for subscribing! Check your email for your welcome gift.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent opacity-90" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Mail className="w-8 h-8" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with New Products
          </h2>
          
          {/* Subheading */}
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new digital products, 
            exclusive discounts, and free resources. Plus, get a welcome gift!
          </p>

          {/* Benefit Highlight */}
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-8">
            <Gift className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Get 20% off your first purchase + Free eBook</span>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              />
              <Button 
                type="submit" 
                variant="secondary" 
                className="sm:w-auto w-full font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-primary-foreground/70 mt-4">
            We respect your privacy. Unsubscribe anytime with one click.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;