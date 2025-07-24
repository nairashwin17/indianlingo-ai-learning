import { useState } from "react";
import { ArrowRight, Play, Star, Users, BookOpen, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import mascotLaptop from "@/assets/mascot-laptop.png";
import LanguageSelector from "./LanguageSelector";

const HeroSection = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const features = [
    { icon: Mic, label: "AI Speech Practice", color: "text-primary" },
    { icon: BookOpen, label: "Interactive Stories", color: "text-accent" },
    { icon: Users, label: "Cultural Context", color: "text-secondary" },
    { icon: Star, label: "Gamified Learning", color: "text-warning" }
  ];

  const stats = [
    { number: "6", label: "Indian Languages" },
    { number: "10K+", label: "Active Learners" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9", label: "Star Rating" }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-warm opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/10 rounded-full blur-xl" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          {/* Badge */}
          <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Star className="h-4 w-4" />
            #1 AI Language Learning Platform
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Master Indian Languages
              </span>
              <br />
              <span className="text-foreground">
                with AI Power
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              Learn Hindi, Marathi, Tamil, and more through interactive stories, 
              AI-powered pronunciation coaching, and cultural immersion.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="gamified" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => setShowLanguageSelector(true)}
            >
              Start Learning Today
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Play className="h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 pt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-background shadow-sm ${feature.color}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="relative">
          {/* Main Mascot Card */}
          <Card className="relative overflow-hidden shadow-glow border-2 border-primary/20">
            <CardContent className="p-8 text-center bg-gradient-primary">
              <div className="space-y-6">
                <img 
                  src={mascotLaptop} 
                  alt="IndianLingo Mascot" 
                  className="h-48 w-48 mx-auto"
                />
                
                <div className="text-primary-foreground">
                  <h3 className="text-2xl font-bold mb-2">
                    हैलो! Ready to learn?
                  </h3>
                  <p className="text-lg opacity-90">
                    I'm your AI learning companion
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse delay-150" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Floating Stats */}
          <div className="absolute -top-4 -left-4 bg-background rounded-lg shadow-warm p-4 border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-success-foreground" />
              </div>
              <div>
                <p className="font-bold text-lg">10K+</p>
                <p className="text-xs text-muted-foreground">Active Learners</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 bg-background rounded-lg shadow-accent p-4 border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-warning-foreground" />
              </div>
              <div>
                <p className="font-bold text-lg">4.9/5</p>
                <p className="text-xs text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLanguageSelector(false)}
              className="absolute -top-12 right-0 text-foreground"
            >
              ✕ Close
            </Button>
            <LanguageSelector />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;