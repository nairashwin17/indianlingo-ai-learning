import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Mic, 
  Brain, 
  Users, 
  Gamepad2, 
  MessagesSquare,
  Zap,
  Globe,
  ChevronRight,
  Play
} from "lucide-react";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const Index = () => {

  const features = [
    {
      icon: Mic,
      title: "AI Speech Coach",
      description: "Get real-time pronunciation feedback and improve your speaking skills with advanced AI technology.",
      color: "text-primary"
    },
    {
      icon: Brain,
      title: "Smart Text Analysis",
      description: "Understand complex texts with AI-powered explanations, cultural context, and grammar insights.",
      color: "text-accent"
    },
    {
      icon: BookOpen,
      title: "Interactive Stories",
      description: "Learn through engaging narratives with synchronized audio and interactive vocabulary.",
      color: "text-secondary"
    },
    {
      icon: Gamepad2,
      title: "Gamified Learning",
      description: "Progress through levels, earn achievements, and stay motivated with game-like experiences.",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Cultural Context",
      description: "Learn not just the language, but the rich cultural heritage behind every word and phrase.",
      color: "text-success"
    },
    {
      icon: MessagesSquare,
      title: "Adaptive Quizzes",
      description: "Personalized quizzes that adapt to your learning pace and focus on your weak areas.",
      color: "text-purple-500"
    }
  ];

  const languages = [
    { name: "Hindi", native: "हिंदी", speakers: "600M+", difficulty: "Beginner" },
    { name: "Marathi", native: "मराठी", speakers: "83M+", difficulty: "Intermediate" },
    { name: "Tamil", native: "தமிழ்", speakers: "75M+", difficulty: "Intermediate" },
    { name: "Malayalam", native: "മലയാളം", speakers: "38M+", difficulty: "Advanced" },
    { name: "Kannada", native: "ಕನ್ನಡ", speakers: "43M+", difficulty: "Advanced" },
    { name: "Telugu", native: "తెలుగు", speakers: "82M+", difficulty: "Intermediate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 border-t">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-4 w-4 mr-2" />
              Powered by AI
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">IndianLingo</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of language learning with our AI-powered platform designed specifically for Indian languages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-warm hover:shadow-accent transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-background shadow-sm flex items-center justify-center ${feature.color} mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Globe className="h-4 w-4 mr-2" />
              6 Languages Available
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Explore India's <span className="bg-gradient-accent bg-clip-text text-transparent">Linguistic Heritage</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From the widely spoken Hindi to the classical Tamil, discover the beauty and diversity of Indian languages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language, index) => (
              <Card key={index} className="text-center shadow-accent hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{language.name}</h3>
                  <p className="text-3xl font-bold text-primary mb-3">{language.native}</p>
                  <div className="space-y-2">
                    <Badge variant="secondary">{language.speakers} speakers</Badge>
                    <Badge 
                      variant={
                        language.difficulty === "Beginner" ? "default" :
                        language.difficulty === "Intermediate" ? "secondary" : "outline"
                      }
                    >
                      {language.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Play className="h-4 w-4 mr-2" />
              Start Learning Today
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Begin Your <span className="bg-gradient-secondary bg-clip-text text-transparent">Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose how you want to start learning. Each path is designed to help you master Indian languages effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-accent transition-all group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Start Learning</CardTitle>
                <CardDescription>Begin with structured lessons</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/learn">
                  <Button className="w-full group-hover:scale-105 transition-transform">
                    Start Now
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-accent transition-all group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Take Quizzes</CardTitle>
                <CardDescription>Test your knowledge</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/quizzes">
                  <Button variant="outline" className="w-full group-hover:scale-105 transition-transform">
                    Start Quiz
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-accent transition-all group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Gamepad2 className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">Flashcards</CardTitle>
                <CardDescription>Practice vocabulary</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/flashcards">
                  <Button variant="outline" className="w-full group-hover:scale-105 transition-transform">
                    Practice
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-accent transition-all group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-warning/20 transition-colors">
                  <MessagesSquare className="h-6 w-6 text-warning" />
                </div>
                <CardTitle className="text-lg">Read Stories</CardTitle>
                <CardDescription>Learn through narratives</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/stories">
                  <Button variant="outline" className="w-full group-hover:scale-105 transition-transform">
                    Read Now
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;