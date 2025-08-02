import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyPayment, downloadProduct } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      verifyPayment(sessionId)
        .then(result => {
          if (result.success) {
            setOrder(result.order);
          }
        })
        .catch(error => {
          console.error('Payment verification failed:', error);
          toast({
            title: "Error",
            description: "Failed to verify payment. Please contact support.",
            variant: "destructive",
          });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [searchParams, toast]);

  const handleDownload = async () => {
    if (order?.download_token) {
      try {
        const result = await downloadProduct(order.download_token);
        // In a real app, this would trigger the actual download
        window.open(result.downloadUrl, '_blank');
      } catch (error) {
        toast({
          title: "Download Error",
          description: "Failed to download product. Please contact support.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {loading ? (
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Payment Successful!
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. Your digital product is ready for download.
              </p>

              {order && (
                <div className="bg-gradient-card rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-lg mb-4">Order Details</h3>
                  <div className="text-left space-y-2">
                    <div className="flex justify-between">
                      <span>Product:</span>
                      <span className="font-medium">{order.products?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">${order.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File Type:</span>
                      <span className="font-medium">{order.products?.file_type}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleDownload} variant="purchase" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/shop">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Success;