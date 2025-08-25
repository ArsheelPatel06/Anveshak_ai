import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Upload, Camera, FileVideo, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Badge } from './ui/badge';

interface AnalysisResult {
  confidence: number;
  isDeepFake: boolean;
  details: string[];
  processingTime: number;
}

export function DeepFakeDetector() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setAnalysisResult(null);
      setProgress(0);
    }
  };

  const simulateAnalysis = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock analysis result
    const mockResult: AnalysisResult = {
      confidence: Math.random() * 40 + 60, // 60-100% confidence
      isDeepFake: Math.random() > 0.7, // 30% chance of being deepfake
      details: [
        'Facial landmark analysis completed',
        'Temporal consistency check performed',
        'Neural network artifacts detected',
        'Pixel-level analysis completed'
      ],
      processingTime: 2.8
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    clearInterval(progressInterval);
    setProgress(100);
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setProgress(0);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Deep Fake Detection
        </h2>
        <p className="text-muted-foreground">
          Upload images or videos to detect AI-generated content with advanced neural analysis
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-red-400" />
            Media Upload
          </CardTitle>
          <CardDescription>
            Supported formats: JPG, PNG, MP4, AVI, MOV (Max 100MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!uploadedFile ? (
            <div
              className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-red-400/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg mb-2">Drop your media file here</p>
              <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
              <Button variant="outline">Select File</Button>
            </div>
          ) : (
            <div className="border border-border/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <FileVideo className="h-8 w-8 text-red-400" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={resetAnalysis}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing content...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              
              {!isAnalyzing && !analysisResult && (
                <Button onClick={simulateAnalysis} className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  Start Deep Fake Analysis
                </Button>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {analysisResult && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {analysisResult.isDeepFake ? (
                <AlertTriangle className="h-5 w-5 text-red-400" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-400" />
              )}
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className={analysisResult.isDeepFake ? 'border-red-500/20 bg-red-500/5' : 'border-green-500/20 bg-green-500/5'}>
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {analysisResult.isDeepFake ? 'Potential Deep Fake Detected' : 'Content Appears Authentic'}
                  </span>
                  <Badge variant={analysisResult.isDeepFake ? 'destructive' : 'default'}>
                    {analysisResult.confidence.toFixed(1)}% Confidence
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Processing Time</p>
                <p className="text-2xl font-bold text-blue-400">{analysisResult.processingTime}s</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Confidence Score</p>
                <p className="text-2xl font-bold text-purple-400">{analysisResult.confidence.toFixed(1)}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Analysis Details</p>
              <div className="space-y-1">
                {analysisResult.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    {detail}
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={resetAnalysis} variant="outline" className="w-full">
              Analyze Another File
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}