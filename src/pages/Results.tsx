import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, History as HistoryIcon, LogOut, User, Menu, X, BarChart3, Home as HomeIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearAuthTokens, getUsername, isAuthenticated } from "@/lib/api";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const username = getUsername();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const userImage = location.state?.userImage || "/placeholder.svg";
  const similarityData = location.state?.similarityData;

  useEffect(() => {
    if (!isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please login to view results",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    clearAuthTokens();
    navigate("/");
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 75) return "text-lime-600 bg-lime-50 border-lime-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (score >= 40) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getEncouragementMessage = (score: number) => {
    if (score >= 90) return "Excellent work! Almost perfect!";
    if (score >= 75) return "Great job! Keep practicing!";
    if (score >= 60) return "Good effort! A few adjustments needed.";
    return "Keep practicing! Focus on the basic shape.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 md:px-16 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/home")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>CalliVision</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/home")}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" onClick={() => navigate("/history")}>
              <HistoryIcon className="mr-2 h-4 w-4" />
              History
            </Button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <User className="mr-2 h-4 w-4" />
                  {username || "Account"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 border-t bg-background shadow-lg z-50">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <Button variant="ghost" className="justify-start" onClick={() => { navigate("/home"); setMobileMenuOpen(false); }}>
                <HomeIcon className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { navigate("/dashboard"); setMobileMenuOpen(false); }}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { navigate("/history"); setMobileMenuOpen(false); }}>
                <HistoryIcon className="mr-2 h-4 w-4" />
                History
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle mobile />
              </div>
              <Button variant="destructive" className="justify-start mt-2" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Analysis Results</h2>
            <p className="text-muted-foreground">
              Review the similarity comparison results
            </p>
          </div>

          {/* Similarity Comparison Results - Auto-loaded */}
          {similarityData && (
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Similarity Analysis
              </h3>

              <div className="space-y-6">
                <div className={`p-6 rounded-lg border-2 ${getSimilarityColor(similarityData.similarity_score)}`}>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium opacity-80">Similarity Score</p>
                    <p className="text-5xl font-bold">
                      {similarityData.similarity_score}%
                    </p>
                    <p className="text-sm font-medium">
                      {getEncouragementMessage(similarityData.similarity_score)}
                    </p>
                  </div>
                  <Progress
                    value={similarityData.similarity_score}
                    className="mt-4 h-3"
                  />
                </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-center">Your Image</h4>
                      <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                        <img
                          src={similarityData.user_image}
                          alt="Your submission"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-center">Reference Image</h4>
                      <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                        <img
                          src={similarityData.reference_image}
                          alt="Reference"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-center">Attention Map</h4>
                      <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                        <img
                          src={similarityData.gradcam_image}
                          alt="Attention map"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {similarityData.feedback && (
                    <Card className="p-6 bg-primary/5">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        AI Feedback
                      </h4>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {similarityData.feedback}
                      </div>
                    </Card>
                  )}
                </div>
              </Card>
            )}
        </div>
      </main>
    </div>
  );
};

export default Results;
