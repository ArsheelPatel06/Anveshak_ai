import { Shield, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Anveshak AI
              </h1>
              <p className="text-xs text-muted-foreground">Security Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#deepfake" className="text-foreground hover:text-blue-400 transition-colors">
              Deep Fake Detection
            </a>
            <a href="#information" className="text-foreground hover:text-blue-400 transition-colors">
              Information Verification
            </a>
            <a href="#news" className="text-foreground hover:text-blue-400 transition-colors">
              News Checker
            </a>
            <Button variant="outline" className="border-blue-500/20 hover:bg-blue-500/10">
              Premium
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 border-t border-border pt-4">
            <a href="#deepfake" className="block py-2 text-foreground hover:text-blue-400">
              Deep Fake Detection
            </a>
            <a href="#information" className="block py-2 text-foreground hover:text-blue-400">
              Information Verification
            </a>
            <a href="#news" className="block py-2 text-foreground hover:text-blue-400">
              News Checker
            </a>
            <Button variant="outline" className="w-full mt-2 border-blue-500/20">
              Premium
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}