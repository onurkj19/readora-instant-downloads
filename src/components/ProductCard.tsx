import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Archive, FileSpreadsheet, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  fileType: "PDF" | "PNG" | "ZIP" | "DOC" | "TEMPLATE";
  image: string;
  rating: number;
  downloads: number;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "PDF":
      return <FileText className="w-4 h-4" />;
    case "PNG":
      return <Image className="w-4 h-4" />;
    case "ZIP":
      return <Archive className="w-4 h-4" />;
    case "DOC":
      return <FileSpreadsheet className="w-4 h-4" />;
    case "TEMPLATE":
      return <FileText className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getFileColor = (fileType: string) => {
  switch (fileType) {
    case "PDF":
      return "bg-file-pdf/10 text-file-pdf border-file-pdf/20";
    case "PNG":
      return "bg-file-png/10 text-file-png border-file-png/20";
    case "ZIP":
      return "bg-file-zip/10 text-file-zip border-file-zip/20";
    case "DOC":
      return "bg-file-doc/10 text-file-doc border-file-doc/20";
    case "TEMPLATE":
      return "bg-file-template/10 text-file-template border-file-template/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-card hover:shadow-lg transition-all duration-300 border border-border overflow-hidden">
      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-warning text-warning-foreground">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* File Type & Rating */}
        <div className="flex items-center justify-between mb-3">
          <Badge 
            variant="outline" 
            className={`${getFileColor(product.fileType)} border`}
          >
            {getFileIcon(product.fileType)}
            <span className="ml-1 text-xs font-medium">{product.fileType}</span>
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-warning text-warning mr-1" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Downloads */}
        <div className="text-xs text-muted-foreground mb-4">
          {product.downloads.toLocaleString()} downloads
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">
            ${product.price}
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to={`/product/${product.id}`}>
                View Details
              </Link>
            </Button>
            <Button variant="purchase" size="sm">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;