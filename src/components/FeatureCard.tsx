import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
  isActive?: boolean;
}

export function FeatureCard({ title, description, icon: Icon, gradient, onClick, isActive }: FeatureCardProps) {
  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-border/50 ${
        isActive ? 'ring-2 ring-blue-500/30 border-blue-500/30' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="space-y-4">
        <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full group-hover:bg-primary/5 border-border/50">
          Launch Scanner
        </Button>
      </CardContent>
    </Card>
  );
}