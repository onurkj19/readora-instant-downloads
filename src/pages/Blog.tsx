import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: "1",
    title: "10 Essential Digital Marketing Tools Every Entrepreneur Needs",
    excerpt: "Discover the must-have tools that will streamline your marketing efforts and boost your business growth in 2024.",
    content: "In today's digital landscape, having the right tools can make or break your marketing strategy...",
    author: "Sarah Johnson",
    date: "January 15, 2024",
    readTime: "5 min read",
    category: "Marketing",
    featured: true,
  },
  {
    id: "2",
    title: "How to Create Professional Templates That Sell",
    excerpt: "Learn the design principles and market research techniques that will help you create templates people actually want to buy.",
    content: "Creating templates that sell requires understanding your audience, market trends, and design best practices...",
    author: "Mike Chen",
    date: "January 12, 2024",
    readTime: "8 min read",
    category: "Design",
    featured: false,
  },
  {
    id: "3",
    title: "The Future of Digital Products: Trends to Watch in 2024",
    excerpt: "Stay ahead of the curve with insights into emerging trends that will shape the digital products industry.",
    content: "As we move through 2024, several key trends are reshaping how digital products are created and consumed...",
    author: "Emma Davis",
    date: "January 10, 2024",
    readTime: "6 min read",
    category: "Industry",
    featured: false,
  },
  {
    id: "4",
    title: "Maximizing ROI with Digital Resources: A Complete Guide",
    excerpt: "Learn how to measure and optimize the return on investment from your digital product purchases.",
    content: "Getting the most value from your digital products requires strategic thinking and proper implementation...",
    author: "David Rodriguez",
    date: "January 8, 2024",
    readTime: "7 min read",
    category: "Business",
    featured: false,
  },
];

const categories = ["All", "Marketing", "Design", "Industry", "Business"];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Digital Insights Blog
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Stay informed with the latest trends, tips, and strategies in the 
                digital products industry. Expert insights to help you succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <Badge className="mb-4">Featured Article</Badge>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Editor's Pick
                </h2>
              </div>

              {blogPosts
                .filter(post => post.featured)
                .map(post => (
                  <div key={post.id} className="bg-gradient-card rounded-2xl p-8 shadow-card mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <Badge variant="outline" className="mb-4">
                          {post.category}
                        </Badge>
                        <h3 className="text-3xl font-bold text-foreground mb-4">
                          {post.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-6">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-6">
                          <div className="flex items-center mr-6">
                            <User className="w-4 h-4 mr-2" />
                            {post.author}
                          </div>
                          <div className="flex items-center mr-6">
                            <Calendar className="w-4 h-4 mr-2" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {post.readTime}
                          </div>
                        </div>

                        <Button variant="default">
                          Read Full Article
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="bg-primary/10 rounded-lg h-64 flex items-center justify-center">
                        <span className="text-primary font-semibold">Featured Article Image</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Latest Articles
              </h2>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map(category => (
                  <Badge 
                    key={category}
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts
                  .filter(post => !post.featured)
                  .map(post => (
                    <article key={post.id} className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="bg-muted/30 h-48 flex items-center justify-center">
                        <span className="text-muted-foreground">Article Image</span>
                      </div>
                      
                      <div className="p-6">
                        <Badge variant="outline" className="mb-3">
                          {post.category}
                        </Badge>
                        
                        <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-border">
                          <Button variant="ghost" className="w-full justify-between">
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center bg-gradient-card rounded-2xl p-8 shadow-card">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Never Miss an Update
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Subscribe to our newsletter and get the latest articles, tips, and industry insights 
                delivered straight to your inbox.
              </p>
              <Button asChild variant="default" size="lg">
                <Link to="/#newsletter">
                  Subscribe to Newsletter
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;