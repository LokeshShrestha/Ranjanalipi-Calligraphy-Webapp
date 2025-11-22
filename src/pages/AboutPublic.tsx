import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

const AboutPublic = () => {
  const teamMembers = [
    { name: "Biswas", role: "ML Engineer" },
    { name: "Rydam", role: "Open CV Engineer" },
    { name: "Lokesh", role: "Backend Developer, Web Frontend Developer" },
    { name: "Om", role: "Mobile Frontend Developer" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-16 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold cursor-pointer">CalliVision</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">About CalliVision</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Preserving Ranjana Lipi through modern AI technology
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

          {/* CTA Section */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="py-8 text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready to Learn Ranjana Lipi?</h3>
              <p className="text-muted-foreground">
                Join CalliVision today and start mastering this ancient script with AI-powered guidance
              </p>
              <Link to="/signup">
                <Button size="lg">
                  Get Started Free
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            <p>
              Built with ❤️ for the preservation and promotion of Ranjana Lipi calligraphy
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPublic;
