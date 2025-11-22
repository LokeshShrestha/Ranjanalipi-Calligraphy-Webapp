import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History as HistoryIcon, User, LogOut, Menu, X, TrendingUp, Target, Award, BarChart3, Upload, Home as HomeIcon, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getUsername, clearAuthTokens, userApi, type UserStatistics } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const username = getUsername() || "User";

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.getStatistics();
      if (response.success) {
        setStatistics(response.statistics);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load statistics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>Calli Vision</h1>
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
          <div className="md:hidden absolute top-full left-0 right-0 border-t bg-background shadow-lg z-[100]">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <Button variant="ghost" className="justify-start" onClick={() => { navigate("/home"); setMobileMenuOpen(false); }}>
                <HomeIcon className="mr-2 h-4 w-4" />
                Home
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
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
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
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              Welcome back, {username}! Here's your progress overview
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Overall Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Analyses</span>
                      <span className="text-2xl font-bold">{statistics?.total_analyses || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Average Score</span>
                      <span className="text-2xl font-bold text-primary">{statistics?.average_score || 0}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Best Score</span>
                      <span className="text-2xl font-bold text-green-600">{statistics?.best_score || 0}%</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Match Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Match Rate</span>
                      <span className="text-2xl font-bold text-blue-600">{statistics?.match_rate || 0}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Matches</span>
                      <span className="text-xl font-bold text-green-600">{statistics?.total_matches || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Mismatches</span>
                      <span className="text-xl font-bold text-red-600">{statistics?.total_mismatches || 0}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Score Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">High (≥90%)</span>
                      <span className="text-xl font-bold text-green-600">{statistics?.high_scores || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Good (75-89%)</span>
                      <span className="text-xl font-bold text-lime-600">{statistics?.good_scores || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Practice (&lt;75%)</span>
                      <span className="text-xl font-bold text-orange-600">{statistics?.needs_practice || 0}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Character Progress and Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Character Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Characters Attempted</span>
                      <span className="text-2xl font-bold">{statistics?.characters_attempted || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Most Practiced</span>
                      <span className="text-xl font-bold text-primary">
                        {statistics?.most_practiced_character !== null ? `Class ${statistics?.most_practiced_character}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-muted-foreground">Last Active</span>
                      <span className="text-sm font-medium">{formatDate(statistics?.recent_activity || null)}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/home" className="block">
                  <Button variant="default" className="w-full justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Start New Analysis
                  </Button>
                </Link>
                <Link to="/history" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <HistoryIcon className="mr-2 h-4 w-4" />
                    View Analysis History
                  </Button>
                </Link>
                <Link to="/profile" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
