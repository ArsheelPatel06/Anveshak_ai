import { useState } from "react";
import { Header } from "./components/Header";
import { FeatureCard } from "./components/FeatureCard";
import { DeepFakeDetector } from "./components/DeepFakeDetector";
import { InformationDetector } from "./components/InformationDetector";
import { NewsChecker } from "./components/NewsChecker";
import {
  Camera,
  Search,
  Newspaper,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";

type ActiveModule =
  | "dashboard"
  | "deepfake"
  | "information"
  | "news";

export default function App() {
  const [activeModule, setActiveModule] =
    useState<ActiveModule>("dashboard");

  const features = [
    {
      id: "deepfake" as const,
      title: "Deep Fake Detection",
      description:
        "Advanced AI-powered analysis to detect manipulated videos and images with high accuracy.",
      icon: Camera,
      gradient: "bg-gradient-to-br from-red-500 to-orange-500",
    },
    {
      id: "information" as const,
      title: "Information Verification",
      description:
        "Cross-reference facts and claims against reliable sources and databases in real-time.",
      icon: Search,
      gradient: "bg-gradient-to-br from-green-500 to-blue-500",
    },
    {
      id: "news" as const,
      title: "News Authenticity",
      description:
        "Analyze news articles for credibility, bias detection, and source verification.",
      icon: Newspaper,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
  ];

  const stats = [
    {
      label: "Scans Completed",
      value: "1,234,567",
      icon: Shield,
      color: "text-blue-400",
    },
    {
      label: "Deep Fakes Detected",
      value: "45,321",
      icon: Camera,
      color: "text-red-400",
    },
    {
      label: "Facts Verified",
      value: "892,156",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      label: "Active Users",
      value: "156,789",
      icon: Users,
      color: "text-purple-400",
    },
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case "deepfake":
        return <DeepFakeDetector />;
      case "information":
        return <InformationDetector />;
      case "news":
        return <NewsChecker />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Anveshak AI
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Advanced Operating System Combat Deep Fake Media
                and Secure Browsing Platform
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Badge
                  variant="outline"
                  className="border-blue-500/20 text-blue-400"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge
                  variant="outline"
                  className="border-green-500/20 text-green-400"
                >
                  Real-time Analysis
                </Badge>
                <Badge
                  variant="outline"
                  className="border-purple-500/20 text-purple-400"
                >
                  Premium Security
                </Badge>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <CardContent className="p-4 text-center">
                    <stat.icon
                      className={`h-6 w-6 mx-auto mb-2 ${stat.color}`}
                    />
                    <div
                      className={`text-2xl font-bold ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Security Modules
                </h2>
                <p className="text-muted-foreground">
                  Choose a module to start protecting against
                  digital threats
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    gradient={feature.gradient}
                    onClick={() => setActiveModule(feature.id)}
                    isActive={activeModule === feature.id}
                  />
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <Card className="border-border/50 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Enterprise Security Suite
                </h3>
                <p className="text-muted-foreground mb-4">
                  Protecting organizations and individuals from
                  sophisticated digital threats using
                  cutting-edge AI technology.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary">
                    Machine Learning
                  </Badge>
                  <Badge variant="secondary">
                    Neural Networks
                  </Badge>
                  <Badge variant="secondary">
                    Computer Vision
                  </Badge>
                  <Badge variant="secondary">
                    NLP Analysis
                  </Badge>
                  <Badge variant="secondary">
                    Real-time Processing
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {activeModule !== "dashboard" && (
          <div className="mb-6">
            <button
              onClick={() => setActiveModule("dashboard")}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        )}
        {renderActiveModule()}
      </main>
    </div>
  );
}