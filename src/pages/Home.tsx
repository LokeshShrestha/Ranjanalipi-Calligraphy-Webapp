import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, LogOut, User, History as HistoryIcon, Menu, X, BarChart3, Home as HomeIcon, Info, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { predictionApi, similarityApi, clearAuthTokens, getUsername } from "@/lib/api";
import { ThemeToggle } from "@/components/theme-toggle";
import ReferenceGuide from "@/reference_ranjana_guide.png";

const Home = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const username = getUsername();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setSelectedFile(file);
      toast({
        title: "Image uploaded",
        description: "Click analyze to see results",
      });
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera",
        variant: "destructive",
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.png", { type: "image/png" });
            const imageData = canvas.toDataURL("image/png");
            setImagePreview(imageData);
            setSelectedFile(file);
            stopCamera();
            toast({
              title: "Photo captured",
              description: "Click analyze to see results",
            });
          }
        }, "image/png");
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setShowCamera(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Step 1: Get prediction
      const predictionResult = await predictionApi.predictCharacter(selectedFile);
      
      if (!predictionResult.success) {
        toast({
          title: "Prediction Failed",
          description: predictionResult.error || "Failed to analyze the image",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      // Check if confidence is too low
      if (predictionResult.confidence < 60) {
        toast({
          title: "Character Not Detected",
          description: `Low confidence (${predictionResult.confidence.toFixed(2)}%). Please ensure the image contains a clear calligraphy character.`,
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      // Step 2: Automatically get similarity comparison using predicted class
      // Extract base64 data from processed_image (remove data:image/png;base64, prefix)
      const processedImageBase64 = predictionResult.processed_image.replace(/^data:image\/png;base64,/, '');
      const similarityResult = await similarityApi.compareHandwriting(
        selectedFile,
        predictionResult.predicted_class,
        processedImageBase64
      );

      if (!similarityResult.success) {
        toast({
          title: "Comparison Failed",
          description: similarityResult.error || "Failed to compare with reference",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      // Navigate to results with both prediction and similarity data
      navigate("/results", { 
        state: { 
          userImage: imagePreview,
          predictedClass: predictionResult.predicted_class,
          confidence: predictionResult.confidence,
          processedImage: predictionResult.processed_image,
          similarityData: similarityResult,
        } 
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to analyze the image",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 md:px-16 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>CalliVision</h1>
          
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
      </header>      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Upload Your Calligraphy</h2>
            <p className="text-muted-foreground">
              Drop an image or capture with your camera to analyze
            </p>
          </div>

          {!showCamera ? (
            <Card
              className={`p-8 border-2 border-dashed transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-border"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-6">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-contain rounded-lg bg-muted"
                    />
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        disabled={isAnalyzing}
                      >
                        Clear
                      </Button>
                      <Button 
                        className="flex-1" 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze Calligraphy"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <Upload className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-2">
                        Drop your image here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="flex gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </Button>
                      <Button variant="outline" onClick={startCamera}>
                        <Camera className="mr-2 h-4 w-4" />
                        Use Camera
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-4">
              <div className="space-y-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg"
                />
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={stopCamera}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={capturePhoto}>
                    <Camera className="mr-2 h-4 w-4" />
                    Capture
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Guidelines Card */}
          <Card className="p-4 md:p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3 md:gap-4">
              <Info className="h-5 w-5 md:h-6 md:w-6 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-3 flex-1">
                <h3 className="font-semibold text-base md:text-lg">Guidelines for Best Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <ul className="text-xs md:text-sm text-muted-foreground space-y-1.5">
                      <li>• <strong>Single Ranjana character only</strong> - one at a time</li>
                      <li>• Take image from directly above (90° angle)</li>
                      <li>• Ensure good lighting and clear visibility</li>
                      <li>• Character should be centered in frame</li>
                      <li>• <strong>Fill inside the strokes</strong> completely if using pen</li>
                    </ul>
                    <p className="text-xs text-muted-foreground pt-2">
                      This tool analyzes <strong>Ranjana Lipi</strong> characteristics and provides feedback to help you improve your calligraphy skills.
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-background rounded-lg p-3 md:p-4 shadow-sm">
                      <img 
                        src={ReferenceGuide} 
                        alt="Reference guide for Ranjana calligraphy" 
                        className="w-32 h-32 md:w-40 md:h-40 object-contain"
                      />
                      <p className="text-xs text-center text-muted-foreground mt-2">Reference example</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
