import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Plus, 
  Search,
  Star,
  Volume2,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Flashcards from "@/components/Flashcards";

const FlashcardsPage = () => {
  const [activeSet, setActiveSet] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const flashcardSets = [
    {
      id: "basic-greetings",
      title: "Basic Greetings",
      description: "Essential greeting phrases for daily conversation",
      cardCount: 20,
      mastered: 15,
      difficulty: "Beginner",
      language: "Hindi",
      lastStudied: "2 hours ago"
    },
    {
      id: "family-members",
      title: "Family Members",
      description: "Learn words for family relationships",
      cardCount: 15,
      mastered: 8,
      difficulty: "Beginner",
      language: "Tamil",
      lastStudied: "1 day ago"
    },
    {
      id: "food-items",
      title: "Food & Cuisine",
      description: "Vocabulary for food, drinks, and cooking",
      cardCount: 30,
      mastered: 12,
      difficulty: "Intermediate",
      language: "Marathi",
      lastStudied: "3 days ago"
    },
    {
      id: "travel-phrases",
      title: "Travel Phrases",
      description: "Essential phrases for traveling in India",
      cardCount: 25,
      mastered: 5,
      difficulty: "Intermediate",
      language: "Malayalam",
      lastStudied: "1 week ago"
    }
  ];

  const studyModes = [
    {
      id: "review",
      title: "Review Mode",
      description: "Go through all cards in order",
      icon: BookOpen,
      color: "text-primary"
    },
    {
      id: "quiz",
      title: "Quiz Mode",
      description: "Test yourself with random cards",
      icon: Star,
      color: "text-accent"
    },
    {
      id: "spaced",
      title: "Spaced Repetition",
      description: "Focus on cards you need to practice",
      icon: RotateCcw,
      color: "text-secondary"
    }
  ];

  const filteredSets = flashcardSets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (activeSet) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setActiveSet(null)}
              className="mb-4"
            >
              ← Back to Flashcards
            </Button>
            <h1 className="text-3xl font-bold">Study Session</h1>
          </div>
          <Flashcards />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Flashcards</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Master vocabulary with interactive, voice-enabled flashcards.
          </p>
          
          {/* Search and Create */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search flashcard sets or languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="gamified">
              <Plus className="h-4 w-4 mr-2" />
              Create Set
            </Button>
          </div>
        </div>

        {/* Study Modes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Study Modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studyModes.map((mode) => (
              <Card key={mode.id} className="hover:shadow-warm transition-all cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 rounded-lg bg-background shadow-sm flex items-center justify-center ${mode.color} mx-auto mb-2`}>
                    <mode.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{mode.title}</CardTitle>
                  <CardDescription>{mode.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Flashcard Sets */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Flashcard Sets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSets.map((set) => (
              <Card key={set.id} className="hover:shadow-accent transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {set.language}
                      </Badge>
                    </div>
                    <Badge variant={set.difficulty === "Beginner" ? "default" : "secondary"}>
                      {set.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{set.title}</CardTitle>
                  <CardDescription>{set.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{set.mastered}/{set.cardCount} mastered</span>
                    </div>
                    <Progress value={(set.mastered / set.cardCount) * 100} />
                    
                    <div className="text-sm text-muted-foreground">
                      Last studied: {set.lastStudied}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => setActiveSet(set.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Study
                      </Button>
                      <Button variant="outline" size="icon">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-warm transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-warning" />
                Daily Review
              </CardTitle>
              <CardDescription>
                Review cards that need attention based on spaced repetition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Cards due today</span>
                <Badge variant="outline">15 cards</Badge>
              </div>
              <Button variant="gamified" className="w-full">
                Start Daily Review
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-warm transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-success" />
                Import Set
              </CardTitle>
              <CardDescription>
                Import flashcards from CSV or share with other learners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Import Flashcards
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FlashcardsPage;