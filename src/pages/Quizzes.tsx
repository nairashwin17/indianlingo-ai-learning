import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Play, 
  Timer, 
  Trophy,
  Target,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuizArea from "@/components/QuizArea";

const Quizzes = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const quizCategories = [
    {
      id: "vocabulary",
      title: "Vocabulary",
      description: "Test your word knowledge",
      icon: Brain,
      quizzes: 15,
      completed: 8,
      bestScore: 85,
      color: "text-primary"
    },
    {
      id: "grammar",
      title: "Grammar",
      description: "Master language structure",
      icon: Target,
      quizzes: 12,
      completed: 5,
      bestScore: 72,
      color: "text-accent"
    },
    {
      id: "listening",
      title: "Listening",
      description: "Improve comprehension skills",
      icon: Timer,
      quizzes: 10,
      completed: 3,
      bestScore: 90,
      color: "text-secondary"
    },
    {
      id: "pronunciation",
      title: "Pronunciation",
      description: "Perfect your speaking",
      icon: Trophy,
      quizzes: 8,
      completed: 2,
      bestScore: 78,
      color: "text-success"
    }
  ];

  const recentScores = [
    { quiz: "Basic Vocabulary", score: 85, date: "2 hours ago" },
    { quiz: "Present Tense", score: 72, date: "1 day ago" },
    { quiz: "Common Phrases", score: 90, date: "2 days ago" }
  ];

  if (activeQuiz) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setActiveQuiz(null)}
              className="mb-4"
            >
              ← Back to Quizzes
            </Button>
            <h1 className="text-3xl font-bold">Quiz in Progress</h1>
          </div>
          <QuizArea />
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
          <h1 className="text-4xl font-bold mb-4">Quizzes</h1>
          <p className="text-xl text-muted-foreground">
            Challenge yourself with adaptive quizzes and track your progress.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-muted-foreground">Quizzes Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">82%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">7</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Timer className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-muted-foreground">Total Hours</div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quiz Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quizCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-accent transition-all cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-background shadow-sm flex items-center justify-center ${category.color} mb-2`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{category.completed}/{category.quizzes}</span>
                    </div>
                    <Progress value={(category.completed / category.quizzes) * 100} />
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Best: </span>
                        <span className="font-semibold">{category.bestScore}%</span>
                      </div>
                      <Badge variant="outline">{category.quizzes} quizzes</Badge>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => setActiveQuiz(category.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Quiz
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Scores</CardTitle>
              <CardDescription>Your latest quiz performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScores.map((score, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">{score.quiz}</div>
                      <div className="text-sm text-muted-foreground">{score.date}</div>
                    </div>
                    <Badge variant={score.score >= 80 ? "default" : score.score >= 60 ? "secondary" : "outline"}>
                      {score.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Challenge</CardTitle>
              <CardDescription>Complete today's challenge to maintain your streak</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-gradient-warm rounded-lg">
                <Trophy className="h-12 w-12 text-warning mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Mixed Review Challenge</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Test your knowledge across all categories
                </p>
                <Button variant="gamified" className="w-full">
                  Start Challenge
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Quizzes;