import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Grid3X3, List } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllProducts, type Product } from "@/lib/api";
import productEbook from "@/assets/product-ebook.jpg";
import productTemplate from "@/assets/product-template.jpg";
import productGraphics from "@/assets/product-graphics.jpg";

// Mock products for demo purposes
const mockProducts: Product[] = [
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
  {
    id: "4",
    title: "Social Media Content Templates",
    description: "200+ customizable social media templates for Instagram, Facebook, Twitter, and LinkedIn. Boost your social presence.",
    price: 24.99,
    file_type: "TEMPLATE",
    file_size: "65.4 MB",
    preview_image_url: productTemplate,
    category: "Marketing",
    featured: false,
    rating: 4.7,
    download_count: 9500,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Web Development Course Bundle",
    description: "Complete web development course with HTML, CSS, JavaScript, and React. Includes source code and projects.",
    price: 59.99,
    file_type: "ZIP",
    file_size: "2.1 GB",
    preview_image_url: productEbook,
    category: "Education",
    featured: false,
    rating: 4.8,
    download_count: 6800,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Logo Design Templates Pack",
    description: "500+ professional logo templates in various categories. Fully editable vector files and mockups included.",
    price: 34.99,
    file_type: "ZIP",
    file_size: "180.5 MB",
    preview_image_url: productGraphics,
    category: "Design",
    featured: false,
    rating: 4.6,
    download_count: 11200,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const categories = [
  { name: "All", count: mockProducts.length },
  { name: "Marketing", count: mockProducts.filter(p => p.category === "Marketing").length },
  { name: "Business", count: mockProducts.filter(p => p.category === "Business").length },
  { name: "Design", count: mockProducts.filter(p => p.category === "Design").length },
  { name: "Education", count: mockProducts.filter(p => p.category === "Education").length },
];

const Shop = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getAllProducts(selectedCategory !== "All" ? selectedCategory : undefined, searchTerm);
        if (allProducts.length > 0) {
          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Failed to load products, using mock data:", error);
        // Keep using mock data if API fails
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory, searchTerm]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Digital Products Shop
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover thousands of high-quality digital products for your projects
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>

          {/* Category Filters & View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {loading ? (
            // Loading skeleton
            [...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-card p-6 animate-pulse">
                <div className="h-48 bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* No Results */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
