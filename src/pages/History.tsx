import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, History as HistoryIcon, User, LogOut, Menu, X, Trash2, BarChart3, Home as HomeIcon, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { historyApi, clearAuthTokens, getUsername, type SimilarityHistory } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const History = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const username = getUsername();
  const [similarityHistory, setSimilarityHistory] = useState<SimilarityHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const response = await historyApi.getSimilarityHistory();
      if (response.success) {
        setSimilarityHistory(response.similarities);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load history",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (historyId: number) => {
    try {
      const response = await historyApi.deleteSimilarityHistory(historyId);
      if (response.success) {
        toast({
          title: "Deleted",
          description: "History item deleted successfully",
        });
        // Refresh history list
        fetchHistory();
      } else {
        throw new Error(response.error || "Failed to delete");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete history item",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    clearAuthTokens();
    toast({
      title: "Logged out",
      description: "See you soon!",
    });
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-lime-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
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
            <Button variant="ghost" onClick={() => navigate("/about")}>
              <BookOpen className="mr-2 h-4 w-4" />
              About
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
              <Button variant="ghost" className="justify-start" onClick={() => { navigate("/about"); setMobileMenuOpen(false); }}>
                <BookOpen className="mr-2 h-4 w-4" />
                About
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
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Analysis History</h2>
            <p className="text-muted-foreground mt-1">
              View your past calligraphy analyses
            </p>
          </div>

          {isLoading ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">Loading history...</p>
            </Card>
          ) : similarityHistory.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <Info className="h-16 w-16 text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No History Yet</h3>
                  <p className="text-muted-foreground max-w-md">
                    Start analyzing your calligraphy to see your history here!
                  </p>
                </div>
                <Button onClick={() => navigate("/home")} className="mt-4">
                  Start a New Analysis
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {similarityHistory.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow md:block">
                  {/* Mobile: Horizontal Layout */}
                  <div className="flex md:block">
                    <div className="w-32 h-32 md:w-full md:aspect-square bg-muted p-2 md:p-4 flex-shrink-0">
                      {item.blended_overlay_url ? (
                        <img
                          src={item.blended_overlay_url}
                          alt={`Analysis ${item.id}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs md:text-sm">
                          No image
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-1 p-3 md:p-4 space-y-1.5 md:space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm text-muted-foreground">Class</span>
                        <span className="font-semibold text-sm md:text-base">{item.target_class}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm text-muted-foreground">Score</span>
                        <span className={`font-bold text-sm md:text-base ${getSimilarityColor(item.similarity_score)}`}>
                          {item.similarity_score}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs md:text-xs px-2 py-0.5 md:py-1 rounded ${
                          item.is_same_character 
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}>
                          {item.is_same_character ? "✓ Match" : "✗ No Match"}
                        </span>
                      </div>
                      <div className="pt-1.5 md:pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="w-full mt-1.5 md:mt-2 h-8 md:h-9 text-xs md:text-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                        Delete
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
