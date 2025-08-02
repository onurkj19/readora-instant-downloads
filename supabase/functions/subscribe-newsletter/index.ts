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
    const { email } = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Initialize Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from("newsletter_subscriptions")
      .select("email")
      .eq("email", email)
      .single();

    if (existing) {
      // Update subscription status if it exists
      await supabase
        .from("newsletter_subscriptions")
        .update({
          subscribed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("email", email);
    } else {
      // Create new subscription
      const { error: insertError } = await supabase
        .from("newsletter_subscriptions")
        .insert({
          email: email,
          subscribed: true,
        });

      if (insertError) {
        throw new Error("Failed to subscribe to newsletter");
      }
    }

    // In a real application, you would:
    // 1. Send a welcome email with 20% discount code
    // 2. Add them to your email marketing platform
    // 3. Send the free eBook mentioned in the signup

    return new Response(JSON.stringify({
      success: true,
      message: "Successfully subscribed to newsletter!",
      discount: "WELCOME20", // Mock discount code
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});