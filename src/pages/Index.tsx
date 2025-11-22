import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle, Zap } from "lucide-react";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-16 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CalliVision</h1>
          <div className="flex items-center gap-3">
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
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
                Master <span className="text-primary">Ranjana Lipi</span> Calligraphy
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI-powered feedback for Newa script practice. Get instant accuracy scores, stroke analysis, and personalized tips to perfect your Ranjana Lipi handwriting.
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
            <h2 className="text-3xl font-bold text-center mb-4">
              How CalliVision Works
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Three simple steps to improve your Ranjana Lipi calligraphy skills
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Upload Your Handwriting</h3>
                <p className="text-muted-foreground">
                  Take a photo of your Ranjana Lipi characters or upload an existing image for analysis
                </p>
              </div>

              <div className="space-y-3 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold">AI Analysis & Scoring</h3>
                <p className="text-muted-foreground">
                  Our AI instantly compares your writing to authentic Newa script manuscripts and provides accuracy scores
                </p>
              </div>

              <div className="space-y-3 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold">Get Detailed Feedback</h3>
                <p className="text-muted-foreground">
                  Receive stroke-by-stroke analysis, visual overlays, and personalized improvement recommendations
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 border-t">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Features</h2>
              <p className="text-muted-foreground">
                Everything you need to master Ranjana Lipi calligraphy
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Instant Accuracy Scoring</h3>
                  <p className="text-muted-foreground">
                    Get real-time accuracy scores comparing your handwriting to authentic Ranjana Lipi references
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Stroke Quality Analysis</h3>
                  <p className="text-muted-foreground">
                    AI-powered feedback on stroke order, pressure, proportions, and traditional Newa script aesthetics
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Sparkles className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Visual Overlay Comparison</h3>
                  <p className="text-muted-foreground">
                    See your handwriting overlaid with ideal Ranjana Lipi characters to identify areas for improvement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 border-t">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Master Ranjana Lipi?</h2>
            <p className="text-xl text-muted-foreground">
              Start practicing Newa script today with AI-powered feedback
            </p>
            <Link to="/signup">
              <Button size="lg">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>

        <FAQ />
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 CalliVision. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
