import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      throw new Error("Download token is required");
    }

    // Initialize Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get order with product details
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(`
        *,
        products (
          title,
          file_url,
          file_type,
          file_size
        )
      `)
      .eq("download_token", token)
      .eq("status", "completed")
      .single();

    if (orderError || !order) {
      throw new Error("Invalid download token or order not found");
    }

    // Check download limits
    if (order.download_count >= order.max_downloads) {
      throw new Error("Download limit exceeded");
    }

    // Increment download count
    await supabase
      .from("orders")
      .update({
        download_count: order.download_count + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    // For demo purposes, we'll return a mock download URL
    // In production, you would generate a secure, time-limited URL to your file storage
    const mockDownloadUrl = `https://example.com/download/${order.products.title.replace(/\s+/g, '_')}.${order.products.file_type.toLowerCase()}`;

    return new Response(JSON.stringify({
      success: true,
      downloadUrl: mockDownloadUrl,
      fileName: `${order.products.title}.${order.products.file_type.toLowerCase()}`,
      fileSize: order.products.file_size,
      remainingDownloads: order.max_downloads - order.download_count - 1,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing download:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});