import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Newspaper, TrendingUp, Users, Calendar, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';

interface NewsAnalysis {
  authenticityScore: number;
  biasRating: 'left' | 'center' | 'right' | 'mixed';
  factualityRating: 'high' | 'mixed' | 'low';
  sourceCredibility: number;
  publishDate: string;
  socialMetrics: {
    shares: number;
    engagement: number;
    sentiment: 'positive' | 'negative' | 'neutral';
  };
  similarArticles: Array<{
    title: string;
    source: string;
    similarity: number;
    url: string;
  }>;
  warnings: string[];
}

export function NewsChecker() {
  const [newsUrl, setNewsUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<NewsAnalysis | null>(null);
  const [progress, setProgress] = useState(0);

  const simulateNewsAnalysis = async () => {
    if (!newsUrl.trim()) return;

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
    }, 250);

    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 3500));

    // Mock analysis result
    const mockResult: NewsAnalysis = {
      authenticityScore: Math.random() * 40 + 60,
      biasRating: ['left', 'center', 'right', 'mixed'][Math.floor(Math.random() * 4)] as any,
      factualityRating: ['high', 'mixed', 'low'][Math.floor(Math.random() * 3)] as any,
      sourceCredibility: Math.random() * 30 + 70,
      publishDate: '2024-08-20',
      socialMetrics: {
        shares: Math.floor(Math.random() * 10000) + 1000,
        engagement: Math.floor(Math.random() * 5000) + 500,
        sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as any
      },
      similarArticles: [
        {
          title: 'Related coverage from Reuters',
          source: 'Reuters',
          similarity: 87,
          url: 'https://reuters.com'
        },
        {
          title: 'Similar story from Associated Press',
          source: 'AP News',
          similarity: 75,
          url: 'https://apnews.com'
        }
      ],
      warnings: Math.random() > 0.5 ? ['Potential clickbait headline detected', 'Limited source verification'] : []
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    clearInterval(progressInterval);
    setProgress(100);
  };

  const resetAnalysis = () => {
    setNewsUrl('');
    setAnalysisResult(null);
    setProgress(0);
    setIsAnalyzing(false);
  };

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case 'left': return 'bg-blue-500/10 text-blue-400';
      case 'right': return 'bg-red-500/10 text-red-400';
      case 'center': return 'bg-green-500/10 text-green-400';
      default: return 'bg-yellow-500/10 text-yellow-400';
    }
  };

  const getFactualityColor = (factuality: string) => {
    switch (factuality) {
      case 'high': return 'bg-green-500/10 text-green-400';
      case 'mixed': return 'bg-yellow-500/10 text-yellow-400';
      default: return 'bg-red-500/10 text-red-400';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          News Authenticity Checker
        </h2>
        <p className="text-muted-foreground">
          Analyze news articles for authenticity, bias, and credibility using advanced algorithms
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-blue-400" />
            News Article Analysis
          </CardTitle>
          <CardDescription>
            Enter a news article URL to check its authenticity and credibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="https://example-news-site.com/article"
              value={newsUrl}
              onChange={(e) => setNewsUrl(e.target.value)}
              className="text-base"
            />
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing news article...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Checking source credibility, fact patterns, and social signals
              </div>
            </div>
          )}

          {!isAnalyzing && !analysisResult && (
            <Button 
              onClick={simulateNewsAnalysis} 
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              disabled={!newsUrl.trim()}
            >
              Analyze News Article
            </Button>
          )}
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                News Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {analysisResult.warnings.length > 0 && (
                <Alert className="border-yellow-500/20 bg-yellow-500/5">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      <p className="font-medium">Warnings Detected:</p>
                      {analysisResult.warnings.map((warning, index) => (
                        <p key={index} className="text-sm">• {warning}</p>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-400">
                    {analysisResult.authenticityScore.toFixed(0)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Authenticity</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-400">
                    {analysisResult.sourceCredibility.toFixed(0)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Source Trust</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-purple-400">
                    {(analysisResult.socialMetrics.shares / 1000).toFixed(1)}K
                  </div>
                  <p className="text-sm text-muted-foreground">Shares</p>
                </div>
                <div className="text-center space-y-2">
                  <div className={`text-2xl font-bold ${getSentimentColor(analysisResult.socialMetrics.sentiment)}`}>
                    {analysisResult.socialMetrics.sentiment.toUpperCase()}
                  </div>
                  <p className="text-sm text-muted-foreground">Sentiment</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Content Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Political Bias</span>
                      <Badge className={getBiasColor(analysisResult.biasRating)}>
                        {analysisResult.biasRating}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Factual Reporting</span>
                      <Badge className={getFactualityColor(analysisResult.factualityRating)}>
                        {analysisResult.factualityRating}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Published</span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {analysisResult.publishDate}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Similar Coverage</h4>
                  <div className="space-y-2">
                    {analysisResult.similarArticles.map((article, index) => (
                      <div key={index} className="p-3 border border-border/50 rounded-lg">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-2">{article.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{article.source}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs">
                              {article.similarity}% match
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">
                      {analysisResult.socialMetrics.engagement.toLocaleString()} engagements
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Cross-referenced sources</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">Verified publication</span>
                  </div>
                </div>
              </div>

              <Button onClick={resetAnalysis} variant="outline" className="w-full">
                Check Another Article
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}