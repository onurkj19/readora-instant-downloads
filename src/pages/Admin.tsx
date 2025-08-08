import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "onurkj19@gmail.com";
const ADMIN_PASSWORD = "admin123";

const Admin = () => {
  const { toast } = useToast();
  const [isAuthed, setIsAuthed] = useState(false);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Product form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("General");
  const [fileType, setFileType] = useState<"PDF" | "PNG" | "ZIP" | "DOC" | "TEMPLATE">("PDF");
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [productFile, setProductFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = isAuthed ? "Admin • Add Product" : "Admin Login";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", isAuthed ? "Admin panel to add digital products." : "Admin login for Readora Digitals.");
    // Restore session
    const session = localStorage.getItem("admin_session");
    if (session === "true") setIsAuthed(true);
  }, [isAuthed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      localStorage.setItem("admin_session", "true");
      toast({ title: "Welcome", description: "Logged in as admin." });
    } else {
      toast({ title: "Invalid credentials", description: "Please check email and password.", variant: "destructive" });
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      toast({ title: "Missing fields", description: "Title and price are required.", variant: "destructive" });
      return;
    }

    try {
      setSaving(true);
      // NOTE: In this mock setup we store metadata only. File uploads to Supabase Storage
      // will be wired via a dedicated edge function in a later step.
      const previewUrl = previewImage ? URL.createObjectURL(previewImage) : undefined;
      const fileUrl = productFile ? URL.createObjectURL(productFile) : undefined;

      const { error } = await supabase
        .from("products")
        .insert({
          title,
          description,
          price: parseFloat(price),
          category,
          file_type: fileType,
          preview_image_url: previewUrl,
          file_url: fileUrl,
          is_active: true,
          featured: false,
          rating: 5,
          download_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({ title: "Product saved", description: "Your product was added successfully." });
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("General");
      setFileType("PDF");
      setPreviewImage(null);
      setProductFile(null);
    } catch (err: any) {
      toast({ title: "Save failed", description: err?.message || "Unable to save product.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    setIsAuthed(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isAuthed ? (
          <section className="max-w-md mx-auto">
            <header className="text-center mb-6">
              <h1 className="text-3xl font-bold">Admin Login</h1>
              <p className="text-muted-foreground">Enter your credentials to manage products.</p>
            </header>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Sign in</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </CardContent>
            </Card>
          </section>
        ) : (
          <section className="max-w-3xl mx-auto">
            <header className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="text-muted-foreground">Upload files and publish a new digital product.</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </header>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Product details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Complete Marketing eBook" required />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a compelling description..." rows={5} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input id="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Marketing" />
                  </div>

                  <div className="space-y-2">
                    <Label>File type</Label>
                    <Select value={fileType} onValueChange={(v) => setFileType(v as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select file type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="PNG">PNG</SelectItem>
                        <SelectItem value="ZIP">ZIP</SelectItem>
                        <SelectItem value="DOC">DOC</SelectItem>
                        <SelectItem value="TEMPLATE">TEMPLATE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preview">Preview image</Label>
                    <Input id="preview" type="file" accept="image/*" onChange={(e) => setPreviewImage(e.target.files?.[0] || null)} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="file">Product file</Label>
                    <Input id="file" type="file" onChange={(e) => setProductFile(e.target.files?.[0] || null)} />
                  </div>

                  <div className="md:col-span-2">
                    <Button type="submit" disabled={saving} className="w-full">
                      {saving ? "Saving..." : "Save Product"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;
