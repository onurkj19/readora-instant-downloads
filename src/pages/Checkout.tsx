import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getProductById, createCheckoutSession, type Product } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Shield, Clock, Star, ArrowLeft, ExternalLink } from "lucide-react";

const CardBrandIcons = () => (
  <div className="flex items-center gap-2" aria-label="Accepted payment methods">
    <span className="sr-only">Accepted cards: Visa, Mastercard, American Express</span>
    {/* Visa */}
    <svg width="36" height="24" viewBox="0 0 48 32" aria-hidden="true">
      <rect width="48" height="32" rx="6" className="fill-muted" />
      <text x="24" y="20" textAnchor="middle" className="fill-foreground" style={{ font: 'bold 12px sans-serif' }}>VISA</text>
    </svg>
    {/* Mastercard */}
    <svg width="36" height="24" viewBox="0 0 48 32" aria-hidden="true">
      <rect width="48" height="32" rx="6" className="fill-muted" />
      <circle cx="20" cy="16" r="6" className="fill-warning" />
      <circle cx="28" cy="16" r="6" className="fill-destructive/80" />
    </svg>
    {/* AmEx */}
    <svg width="36" height="24" viewBox="0 0 48 32" aria-hidden="true">
      <rect width="48" height="32" rx="6" className="fill-muted" />
      <text x="24" y="20" textAnchor="middle" className="fill-foreground" style={{ font: 'bold 10px sans-serif' }}>AMEX</text>
    </svg>
  </div>
);

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const productId = useMemo(() => searchParams.get("product") || "", [searchParams]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = product ? `Checkout • ${product.title}` : "Checkout • Readora Digitals";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Secure Stripe checkout for digital products at Readora Digitals.");
  }, [product]);

  useEffect(() => {
    const load = async () => {
      if (!productId) return;
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (e) {
        // Fallback: product might be mocked elsewhere
        setProduct(null);
      }
    };
    load();
  }, [productId]);

  const handlePay = async () => {
    if (!product) return;
    try {
      setLoading(true);
      const data = await createCheckoutSession(product.id);
      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      toast({
        title: "Checkout error",
        description: error?.message || "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link to="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>

        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Secure Checkout</h1>
          <p className="text-muted-foreground">Pay securely with Stripe. Instant download after payment.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payment Method</CardTitle>
                <CardBrandIcons />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-success" />
                  256-bit SSL encryption • Powered by Stripe
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 flex items-center text-sm">
                <Clock className="w-4 h-4 text-success mr-2" /> Instant access
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 flex items-center text-sm">
                <Star className="w-4 h-4 text-success mr-2" /> 5-star support
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 flex items-center text-sm">
                <Shield className="w-4 h-4 text-success mr-2" /> Secure payment
              </div>
            </div>
          </section>

          <aside>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {product ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {product.preview_image_url ? (
                        <img
                          src={product.preview_image_url}
                          alt={`${product.title} preview image`}
                          className="w-16 h-16 object-cover rounded"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded bg-muted" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{product.title}</div>
                        <div className="text-sm text-muted-foreground">{product.file_type}</div>
                      </div>
                      <div className="font-semibold">${'{'}product.price{'}'}</div>
                    </div>
                    <Button onClick={handlePay} disabled={loading} variant="purchase" className="w-full">
                      {loading ? "Redirecting..." : "Pay with Stripe"}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By placing this order, you agree to our Terms and Privacy Policy.
                    </p>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No product selected. Go back to the shop and choose a product.
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
