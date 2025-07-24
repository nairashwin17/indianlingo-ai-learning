import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Mic, 
  Brain, 
  Users, 
  Gamepad2, 
  MessagesSquare,
  Zap,
  Globe,
  Award
} from "lucide-react";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LanguageSelector from "@/components/LanguageSelector";
import SpeechInput from "@/components/SpeechInput";
import QuizArea from "@/components/QuizArea";
import TextExplainer from "@/components/TextExplainer";
import Flashcards from "@/components/Flashcards";
import StorytellingPlayer from "@/components/StorytellingPlayer";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("demo");

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

      {/* Interactive Demo Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Award className="h-4 w-4 mr-2" />
              Try It Yourself
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Experience <span className="bg-gradient-secondary bg-clip-text text-transparent">Interactive Learning</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get hands-on with our learning tools. Each component is designed to make language learning engaging and effective.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
              <TabsTrigger value="demo">Demo</TabsTrigger>
              <TabsTrigger value="speech">Speech</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="explainer">Explainer</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Start Your Learning Journey</h3>
                <p className="text-muted-foreground mb-8">Choose your languages and begin exploring Indian culture through language.</p>
              </div>
              <LanguageSelector />
            </TabsContent>

            <TabsContent value="speech">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">AI-Powered Pronunciation Practice</h3>
                <p className="text-muted-foreground">Practice speaking and get instant feedback on your pronunciation.</p>
              </div>
              <SpeechInput />
            </TabsContent>

            <TabsContent value="quiz">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Interactive Learning Quizzes</h3>
                <p className="text-muted-foreground">Test your knowledge with adaptive quizzes that help you learn effectively.</p>
              </div>
              <QuizArea />
            </TabsContent>

            <TabsContent value="explainer">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">AI Text Analysis & Explanation</h3>
                <p className="text-muted-foreground">Understand complex texts with detailed AI-powered explanations.</p>
              </div>
              <TextExplainer />
            </TabsContent>

            <TabsContent value="flashcards">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Interactive Flashcards</h3>
                <p className="text-muted-foreground">Learn vocabulary through engaging, voice-enabled flashcards.</p>
              </div>
              <Flashcards />
            </TabsContent>

            <TabsContent value="stories">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Immersive Storytelling</h3>
                <p className="text-muted-foreground">Learn through engaging stories with synchronized audio and text.</p>
              </div>
              <StorytellingPlayer />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Separator className="my-0" />
      <Footer />
    </div>
  );
};

export default Index;