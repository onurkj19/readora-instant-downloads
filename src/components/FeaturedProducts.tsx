import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import productEbook from "@/assets/product-ebook.jpg";
import productTemplate from "@/assets/product-template.jpg";
import productGraphics from "@/assets/product-graphics.jpg";

const featuredProducts = [
  {
    id: "1",
    title: "Complete Digital Marketing eBook",
    description: "Master digital marketing with this comprehensive 300-page guide covering SEO, social media, email marketing, and conversion optimization.",
    price: 29.99,
    fileType: "PDF" as const,
    image: productEbook,
    rating: 4.9,
    downloads: 12500,
    featured: true,
  },
  {
    id: "2",
    title: "Professional Business Templates Pack",
    description: "50+ premium business templates including invoices, contracts, presentations, and business plans. Fully customizable and professional.",
    price: 39.99,
    fileType: "TEMPLATE" as const,
    image: productTemplate,
    rating: 4.8,
    downloads: 8900,
    featured: true,
  },
  {
    id: "3",
    title: "Modern UI Graphics Bundle",
    description: "1000+ high-quality icons, illustrations, and graphics in PNG format. Perfect for web design, mobile apps, and branding projects.",
    price: 49.99,
    fileType: "PNG" as const,
    image: productGraphics,
    rating: 4.9,
    downloads: 15200,
    featured: true,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and highest-rated digital products, carefully selected for their quality and value.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild variant="default" size="lg">
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;