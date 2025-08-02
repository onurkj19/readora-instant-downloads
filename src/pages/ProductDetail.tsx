import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Star, Shield, Users, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import productEbook from "@/assets/product-ebook.jpg";

const ProductDetail = () => {
  const { id } = useParams();

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: "1",
    title: "Complete Digital Marketing eBook",
    description: "Master digital marketing with this comprehensive 300-page guide covering SEO, social media, email marketing, and conversion optimization strategies that actually work.",
    fullDescription: `This comprehensive digital marketing guide is your complete roadmap to online success. Written by industry experts with over 10 years of experience, this eBook covers everything you need to know to build and scale your digital presence.

What's included:
• 300+ pages of actionable content
• 50+ real-world case studies
• 25+ downloadable templates and checklists
• Video tutorials (bonus content)
• Private community access

Topics covered:
- Search Engine Optimization (SEO)
- Social Media Marketing Strategy
- Email Marketing Automation
- Content Marketing
- Pay-Per-Click (PPC) Advertising
- Conversion Rate Optimization
- Analytics and Measurement
- Marketing Automation Tools

This guide is perfect for entrepreneurs, marketing professionals, small business owners, and anyone looking to master digital marketing fundamentals and advanced strategies.`,
    price: 29.99,
    originalPrice: 49.99,
    fileType: "PDF" as const,
    image: productEbook,
    rating: 4.9,
    reviews: 1247,
    downloads: 12500,
    fileSize: "15.2 MB",
    pages: 300,
    lastUpdated: "January 2024",
    featured: true,
  };

  const handlePurchase = () => {
    // Integrate with Stripe here
    console.log("Purchase initiated for product:", product.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg shadow-card">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-warning text-warning-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{product.downloads.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{product.rating}★</div>
                <div className="text-sm text-muted-foreground">{product.reviews} Reviews</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{product.pages}</div>
                <div className="text-sm text-muted-foreground">Pages</div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* File Type Badge */}
            <Badge variant="outline" className="bg-file-pdf/10 text-file-pdf border-file-pdf/20">
              📄 {product.fileType} • {product.fileSize}
            </Badge>

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-warning text-warning mr-1" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground ml-1">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-foreground">
                ${product.price}
              </div>
              {product.originalPrice && (
                <div className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </div>
              )}
              <Badge variant="destructive" className="text-sm">
                40% OFF
              </Badge>
            </div>

            {/* Description */}
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Purchase Section */}
            <div className="bg-gradient-card rounded-lg p-6 shadow-card">
              <h3 className="font-semibold text-lg mb-4">What you'll get:</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Download className="w-4 h-4 text-success mr-3" />
                  Instant download after purchase
                </div>
                <div className="flex items-center text-sm">
                  <Shield className="w-4 h-4 text-success mr-3" />
                  Lifetime access and updates
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-success mr-3" />
                  Commercial use license included
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-success mr-3" />
                  24/7 customer support
                </div>
              </div>

              <Button 
                onClick={handlePurchase}
                variant="purchase" 
                size="lg" 
                className="w-full mb-3"
              >
                Buy Now & Download Instantly
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Secure payment powered by Stripe • 30-day money-back guarantee
              </p>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">File Format:</span>
                  <span className="ml-2 font-medium">{product.fileType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">File Size:</span>
                  <span className="ml-2 font-medium">{product.fileSize}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Pages:</span>
                  <span className="ml-2 font-medium">{product.pages}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="ml-2 font-medium">{product.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">About This Product</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            {product.fullDescription.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;