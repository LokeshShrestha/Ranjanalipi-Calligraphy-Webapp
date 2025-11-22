import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Edit, History as HistoryIcon, User, LogOut, Menu, X, BarChart3, Home as HomeIcon, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getUsername, clearAuthTokens } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const username = getUsername() || "User";

  const handleLogout = () => {
    clearAuthTokens();
    toast({
      title: "Logged out",
      description: "See you soon!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm relative z-50">
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
            <div className="hidden md:block">
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
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 border-t bg-background shadow-lg z-50">
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
              <Button variant="destructive" className="justify-start mt-2" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Profile</h2>
            <p className="text-muted-foreground mt-1">
              Manage your account settings
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{username}</h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Calligraphy Learner</span>
                  </div>
                </div>
                <Link to="/profile/edit" className="w-full md:w-auto">
                  <Button className="w-full md:w-auto">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/dashboard" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Dashboard
                </Button>
              </Link>
              <Link to="/history" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <HistoryIcon className="mr-2 h-4 w-4" />
                  View Analysis History
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
