import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  title: string;
  description: string;
  full_description?: string;
  price: number;
  original_price?: number;
  file_type: "PDF" | "PNG" | "ZIP" | "DOC" | "TEMPLATE";
  file_size?: string;
  file_url?: string;
  preview_image_url?: string;
  category: string;
  featured: boolean;
  rating: number;
  download_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_email: string;
  product_id: string;
  stripe_session_id: string;
  amount: number;
  status: "pending" | "completed" | "failed" | "refunded";
  download_token: string;
  download_count: number;
  max_downloads: number;
  created_at: string;
  updated_at: string;
  products?: Product;
}

// Product functions
export const getAllProducts = async (categoryFilter?: string, searchTerm?: string) => {
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (categoryFilter && categoryFilter !== "All") {
    query = query.eq("category", categoryFilter);
  }

  if (searchTerm) {
    query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }

  return data as Product[];
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    throw new Error("Product not found");
  }

  return data as Product;
};

export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("featured", true)
    .order("download_count", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching featured products:", error);
    throw new Error("Failed to fetch featured products");
  }

  return data as Product[];
};

// Payment functions
export const createCheckoutSession = async (productId: string, userEmail?: string) => {
  const { data, error } = await supabase.functions.invoke("create-checkout", {
    body: {
      productId,
      userEmail: userEmail || `guest-${Date.now()}@readoradigitals.com`,
    },
  });

  if (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }

  return data;
};

export const verifyPayment = async (sessionId: string) => {
  const { data, error } = await supabase.functions.invoke("verify-payment", {
    body: { sessionId },
  });

  if (error) {
    console.error("Error verifying payment:", error);
    throw new Error("Failed to verify payment");
  }

  return data;
};

export const downloadProduct = async (token: string) => {
  const { data, error } = await supabase.functions.invoke("download-product", {
    body: { token },
  });

  if (error) {
    console.error("Error downloading product:", error);
    throw new Error("Failed to download product");
  }

  return data;
};

// Newsletter functions
export const subscribeToNewsletter = async (email: string) => {
  const { data, error } = await supabase.functions.invoke("subscribe-newsletter", {
    body: { email },
  });

  if (error) {
    console.error("Error subscribing to newsletter:", error);
    throw new Error("Failed to subscribe to newsletter");
  }

  return data;
};

// Contact functions
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) => {
  const { data, error } = await supabase.functions.invoke("contact-form", {
    body: formData,
  });

  if (error) {
    console.error("Error submitting contact form:", error);
    throw new Error("Failed to submit contact form");
  }

  return data;
};

// Review functions
export const addReview = async (productId: string, rating: number, comment?: string, userEmail?: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id: productId,
      rating,
      comment,
      user_email: userEmail || `anonymous-${Date.now()}@readoradigitals.com`,
    });

  if (error) {
    console.error("Error adding review:", error);
    throw new Error("Failed to add review");
  }

  return data;
};

export const getProductReviews = async (productId: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews");
  }

  return data;
};