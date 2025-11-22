import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, LogOut, History as HistoryIcon, Menu, X, BarChart3, Home as HomeIcon, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearAuthTokens, getUsername } from "@/lib/api";
import { ThemeToggle } from "@/components/theme-toggle";

const About = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const username = getUsername();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuthTokens();
    toast({
      title: "Logged out",
      description: "See you soon!",
    });
    navigate("/");
  };

  const teamMembers = [
    { name: "Biswas", role: "ML Engineer" },
    { name: "Rydam", role: "Open CV Engineer" },
    { name: "Lokesh", role: "Backend Developer, Web Frontend Developer" },
    { name: "Om", role: "Mobile Frontend Developer" }
  ];

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
          <div className="md:hidden absolute top-full left-0 right-0 border-t bg-background shadow-lg z-[100]">
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

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">About CalliVision</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Preserving ancient script through modern technology
            </p>
          </div>

          {/* Ranjana Lipi Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                What is Ranjana Lipi?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm md:text-base">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Ranjana Lipi</strong> (also known as Ranjana script or Lantsa) is an ancient Brahmic script that originated in the 11th century. 
                It was primarily used in Nepal, Tibet, and parts of India for writing Sanskrit texts, Buddhist mantras, and religious manuscripts.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This elegant script is characterized by its ornate, flowing letterforms and is still used today for decorative purposes, 
                religious inscriptions, and traditional calligraphy. Each character is a work of art, requiring precision and skill to master.
              </p>
            </CardContent>
          </Card>

          {/* Significance Section */}
          <Card>
            <CardHeader>
              <CardTitle>Cultural Significance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Religious Heritage:</strong> Used extensively in Buddhist and Hindu religious texts, preserving ancient wisdom and teachings.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Artistic Expression:</strong> Considered one of the most beautiful scripts in the world, combining linguistic function with visual artistry.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Cultural Identity:</strong> Represents an important part of Nepalese and Tibetan cultural heritage, connecting modern practitioners to their historical roots.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Living Tradition:</strong> Still practiced by calligraphers, monks, and artists who keep this ancient art form alive for future generations.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Project Purpose */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                CalliVision bridges the gap between traditional calligraphy and modern technology. By leveraging machine learning and computer vision, 
                we provide instant feedback to help learners improve their Ranjana Lipi calligraphy skills. Our goal is to make this ancient art form 
                more accessible to aspiring calligraphers worldwide, ensuring its preservation for future generations.
              </p>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Meet the Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                This project was developed by a dedicated team of students passionate about preserving cultural heritage through technology.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>
              Built with ❤️ for the preservation and promotion of Ranjana Lipi calligraphy
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
