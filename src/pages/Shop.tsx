import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { useState } from "react";
import productEbook from "@/assets/product-ebook.jpg";
import productTemplate from "@/assets/product-template.jpg";
import productGraphics from "@/assets/product-graphics.jpg";

const allProducts = [
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
  {
    id: "4",
    title: "Social Media Content Templates",
    description: "200+ customizable social media templates for Instagram, Facebook, Twitter, and LinkedIn. Boost your social presence.",
    price: 24.99,
    fileType: "TEMPLATE" as const,
    image: productTemplate,
    rating: 4.7,
    downloads: 9500,
  },
  {
    id: "5",
    title: "Web Development Course Bundle",
    description: "Complete web development course with HTML, CSS, JavaScript, and React. Includes source code and projects.",
    price: 59.99,
    fileType: "ZIP" as const,
    image: productEbook,
    rating: 4.8,
    downloads: 6800,
  },
  {
    id: "6",
    title: "Logo Design Templates Pack",
    description: "500+ professional logo templates in various categories. Fully editable vector files and mockups included.",
    price: 34.99,
    fileType: "ZIP" as const,
    image: productGraphics,
    rating: 4.6,
    downloads: 11200,
  },
];

const categories = [
  { name: "All", count: allProducts.length },
  { name: "PDF", count: allProducts.filter(p => p.fileType === "PDF").length },
  { name: "TEMPLATE", count: allProducts.filter(p => p.fileType === "TEMPLATE").length },
  { name: "PNG", count: allProducts.filter(p => p.fileType === "PNG").length },
  { name: "ZIP", count: allProducts.filter(p => p.fileType === "ZIP").length },
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.fileType === selectedCategory;
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
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
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