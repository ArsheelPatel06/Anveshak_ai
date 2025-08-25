import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Search, Globe, AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Progress } from './ui/progress';

interface VerificationResult {
  credibilityScore: number;
  sources: Array<{
    name: string;
    url: string;
    reliability: 'high' | 'medium' | 'low';
    matchScore: number;
  }>;
  claims: Array<{
    text: string;
    status: 'verified' | 'disputed' | 'unverified';
    confidence: number;
  }>;
  overallAssessment: string;
}

export function InformationDetector() {
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [progress, setProgress] = useState(0);

  const simulateVerification = async () => {
    if (!inputText.trim() && !inputUrl.trim()) return;

    setIsVerifying(true);
    setProgress(0);

    // Simulate verification progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 300);

    // Simulate verification time
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Mock verification result
    const mockResult: VerificationResult = {
      credibilityScore: Math.random() * 40 + 60,
      sources: [
        {
          name: 'Reuters',
          url: 'https://reuters.com',
          reliability: 'high',
          matchScore: 85
        },
        {
          name: 'BBC News',
          url: 'https://bbc.com',
          reliability: 'high',
          matchScore: 78
        },
        {
          name: 'Wikipedia',
          url: 'https://wikipedia.org',
          reliability: 'medium',
          matchScore: 92
        }
      ],
      claims: [
        {
          text: 'Primary claim extracted from content',
          status: Math.random() > 0.3 ? 'verified' : 'disputed',
          confidence: Math.random() * 30 + 70
        },
        {
          text: 'Secondary supporting statement',
          status: 'verified',
          confidence: Math.random() * 20 + 80
        }
      ],
      overallAssessment: 'Information appears to be partially verifiable with reliable sources.'
    };

    setVerificationResult(mockResult);
    setIsVerifying(false);
    clearInterval(progressInterval);
    setProgress(100);
  };

  const resetVerification = () => {
    setInputText('');
    setInputUrl('');
    setVerificationResult(null);
    setProgress(0);
    setIsVerifying(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'disputed': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    }
  };

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'high': return 'bg-green-500/10 text-green-400';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400';
      default: return 'bg-red-500/10 text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Information Verification
        </h2>
        <p className="text-muted-foreground">
          Verify facts, claims, and information against reliable sources and databases
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-green-400" />
            Content Analysis
          </CardTitle>
          <CardDescription>
            Enter text content or provide a URL to verify information accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Text Content</label>
              <Textarea
                placeholder="Paste the text you want to verify for factual accuracy..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">OR</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">URL to Verify</label>
              <Input
                placeholder="https://example.com/article-to-verify"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="pr-10"
              />
              <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {isVerifying && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Verifying information...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                Cross-referencing with multiple sources
              </div>
            </div>
          )}

          {!isVerifying && !verificationResult && (
            <Button 
              onClick={simulateVerification} 
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              disabled={!inputText.trim() && !inputUrl.trim()}
            >
              Verify Information
            </Button>
          )}
        </CardContent>
      </Card>

      {verificationResult && (
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Verification Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-500/20 bg-blue-500/5">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>{verificationResult.overallAssessment}</span>
                    <Badge variant="outline">
                      {verificationResult.credibilityScore.toFixed(1)}% Credible
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Reliable Sources
                  </h4>
                  {verificationResult.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{source.name}</p>
                        <p className="text-xs text-muted-foreground">Match: {source.matchScore}%</p>
                      </div>
                      <Badge variant="outline" className={getReliabilityColor(source.reliability)}>
                        {source.reliability}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Fact Claims Analysis</h4>
                  {verificationResult.claims.map((claim, index) => (
                    <div key={index} className="p-3 border border-border/50 rounded-lg space-y-2">
                      <p className="text-sm">{claim.text}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(claim.status)}>
                          {claim.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {claim.confidence.toFixed(1)}% confidence
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={resetVerification} variant="outline" className="w-full">
                Verify New Information
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}