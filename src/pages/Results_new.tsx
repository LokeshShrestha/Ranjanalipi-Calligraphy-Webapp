import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Upload } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { similarityApi } from "@/lib/api";
import { Progress } from "@/components/ui/progress";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [targetClass, setTargetClass] = useState<number>(
    location.state?.predictedClass || 0
  );
  const [isComparing, setIsComparing] = useState(false);
  const [similarityData, setSimilarityData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [comparisonImage, setComparisonImage] = useState<File | null>(null);
  const [comparisonPreview, setComparisonPreview] = useState<string | null>(null);
  
  const userImage = location.state?.userImage || "/placeholder.svg";
  const predictedClass = location.state?.predictedClass;
  const confidence = location.state?.confidence;
  const processedImage = location.state?.processedImage;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setComparisonImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setComparisonPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompare = async () => {
    if (!comparisonImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to compare",
        variant: "destructive",
      });
      return;
    }

    if (targetClass < 0 || targetClass > 35) {
      toast({
        title: "Invalid class number",
        description: "Class number must be between 0 and 35",
        variant: "destructive",
      });
      return;
    }

    setIsComparing(true);

    try {
      const result = await similarityApi.compareHandwriting(comparisonImage, targetClass);
      
      if (result.success) {
        setSimilarityData(result);
        toast({
          title: "Comparison Complete!",
          description: `Similarity: ${result.similarity_score}%`,
        });
      } else {
        toast({
          title: "Comparison Failed",
          description: result.error || "Failed to compare images",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to compare images",
        variant: "destructive",
      });
    } finally {
      setIsComparing(false);
    }
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return "text-green-600";
    if (conf >= 70) return "text-yellow-600";
    if (conf >= 50) return "text-orange-600";
    return "text-red-600";
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
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/home")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Upload
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Analysis Results</h2>
            <p className="text-muted-foreground">
              Review your recognition results and compare with reference
            </p>
          </div>

          {/* Recognition Results Card */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-6">Recognition Result</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Your Image</Label>
                  <div className="mt-2 aspect-square rounded-lg overflow-hidden border bg-muted">
                    <img
                      src={userImage}
                      alt="Your submission"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Processed Image</Label>
                  <div className="mt-2 aspect-square rounded-lg overflow-hidden border bg-muted">
                    <img
                      src={processedImage || "/placeholder.svg"}
                      alt="Processed"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Predicted Class:</span>
                <span className="text-2xl font-bold text-primary">
                  {predictedClass !== undefined ? predictedClass : "N/A"}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Confidence:</span>
                  <span className={`text-xl font-bold ${getConfidenceColor(confidence || 0)}`}>
                    {confidence !== undefined ? `${confidence.toFixed(2)}%` : "N/A"}
                  </span>
                </div>
                {confidence !== undefined && (
                  <Progress value={confidence} className="h-2" />
                )}
              </div>
            </div>
          </Card>

          {/* Similarity Comparison Section */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Compare with Reference
            </h3>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="targetClass">Target Class (0-35)</Label>
                  <Input
                    id="targetClass"
                    type="number"
                    min="0"
                    max="35"
                    value={targetClass}
                    onChange={(e) => setTargetClass(parseInt(e.target.value) || 0)}
                    placeholder="Enter class number"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="comparison-image">Upload Reference Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="comparison-image"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Reference Image
                    </Button>
                  </div>
                  {comparisonPreview && (
                    <div className="mt-2 aspect-square max-w-[200px] rounded-lg overflow-hidden border">
                      <img
                        src={comparisonPreview}
                        alt="Reference preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleCompare}
                disabled={isComparing || !comparisonImage}
                className="w-full"
              >
                {isComparing ? "Comparing..." : "Compare Similarity"}
              </Button>

              {similarityData && (
                <div className="mt-8 space-y-6">
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
                      <p className="text-muted-foreground leading-relaxed">
                        {similarityData.feedback}
                      </p>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Results;
