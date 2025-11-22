import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-16 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calli Vision</h1>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Master the Art of{" "}
                <span className="text-primary">Calligraphy</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI-powered calligraphy analysis and feedback to perfect your strokes
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Analyzing
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 border-t">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Upload or Capture</h3>
                <p className="text-muted-foreground">
                  Drop your calligraphy image or use your camera to capture it
                </p>
              </div>

              <div className="space-y-3 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Get instant similarity scores compared to reference calligraphy
                </p>
              </div>

              <div className="space-y-3 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold">Get Feedback</h3>
                <p className="text-muted-foreground">
                  Receive detailed feedback on strokes, pressure, and technique
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 border-t">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center">Features</h2>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Real-time Analysis</h3>
                  <p className="text-muted-foreground">
                    Instant similarity scoring and overlay comparison
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">AI-Powered Feedback</h3>
                  <p className="text-muted-foreground">
                    Detailed insights on stroke quality, pressure, and technique
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Sparkles className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Easy to Use</h3>
                  <p className="text-muted-foreground">
                    Upload images or capture directly with your device camera
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 border-t">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Improve?</h2>
            <p className="text-xl text-muted-foreground">
              Start analyzing your calligraphy today
            </p>
            <Link to="/signup">
              <Button size="lg">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Calli Vision. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
