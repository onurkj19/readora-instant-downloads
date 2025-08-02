import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFeaturedProducts, type Product } from "@/lib/api";
import productEbook from "@/assets/product-ebook.jpg";
import productTemplate from "@/assets/product-template.jpg";
import productGraphics from "@/assets/product-graphics.jpg";

// Mock featured products for demo purposes
const mockFeaturedProducts: Product[] = [
  {
    id: "1",
    title: "Complete Digital Marketing eBook",
    description: "Master digital marketing with this comprehensive 300-page guide covering SEO, social media, email marketing, and conversion optimization.",
    price: 29.99,
    original_price: 49.99,
    file_type: "PDF",
    file_size: "15.2 MB",
    preview_image_url: productEbook,
    category: "Marketing",
    featured: true,
    rating: 4.9,
    download_count: 12500,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Professional Business Templates Pack",
    description: "50+ premium business templates including invoices, contracts, presentations, and business plans. Fully customizable and professional.",
    price: 39.99,
    file_type: "TEMPLATE",
    file_size: "85.3 MB",
    preview_image_url: productTemplate,
    category: "Business",
    featured: true,
    rating: 4.8,
    download_count: 8900,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Modern UI Graphics Bundle",
    description: "1000+ high-quality icons, illustrations, and graphics in PNG format. Perfect for web design, mobile apps, and branding projects.",
    price: 49.99,
    file_type: "PNG",
    file_size: "125.7 MB",
    preview_image_url: productGraphics,
    category: "Design",
    featured: true,
    rating: 4.9,
    download_count: 15200,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockFeaturedProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const featuredProducts = await getFeaturedProducts();
        if (featuredProducts.length > 0) {
          setProducts(featuredProducts);
        }
      } catch (error) {
        console.error("Failed to load featured products, using mock data:", error);
        // Keep using mock data if API fails
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-card p-6 animate-pulse">
                <div className="h-48 bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
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
