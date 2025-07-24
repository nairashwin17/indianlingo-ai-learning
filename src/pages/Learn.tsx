import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Star, 
  Clock,
  Users,
  Award,
  ChevronRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/LanguageSelector";

const Learn = () => {
  const [selectedLevel, setSelectedLevel] = useState("beginner");

  const lessons = [
    {
      id: 1,
      title: "Basic Greetings",
      description: "Learn essential greeting phrases",
      duration: "15 min",
      progress: 75,
      difficulty: "Beginner",
      completed: false
    },
    {
      id: 2,
      title: "Numbers 1-20",
      description: "Master counting in your target language",
      duration: "20 min",
      progress: 100,
      difficulty: "Beginner",
      completed: true
    },
    {
      id: 3,
      title: "Family Members",
      description: "Vocabulary for family relationships",
      duration: "25 min",
      progress: 30,
      difficulty: "Beginner",
      completed: false
    }
  ];

  const levels = [
    { id: "beginner", name: "Beginner", lessons: 15, completed: 8 },
    { id: "intermediate", name: "Intermediate", lessons: 20, completed: 3 },
    { id: "advanced", name: "Advanced", lessons: 12, completed: 0 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Learn</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Master Indian languages through structured lessons and interactive content.
          </p>
          
          {/* Language Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Select Your Learning Path</h2>
            <LanguageSelector />
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {levels.map((level) => (
            <Card 
              key={level.id}
              className={`cursor-pointer transition-all hover:shadow-accent ${
                selectedLevel === level.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedLevel(level.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {level.name}
                  <Badge variant={level.id === "beginner" ? "default" : level.id === "intermediate" ? "secondary" : "outline"}>
                    {level.completed}/{level.lessons}
                  </Badge>
                </CardTitle>
                <Progress value={(level.completed / level.lessons) * 100} className="mt-2" />
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Current Lessons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-accent transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {lesson.difficulty}
                      </Badge>
                    </div>
                    {lesson.completed && <Award className="h-5 w-5 text-success" />}
                  </div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {lesson.duration}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={lesson.completed ? "outline" : "default"}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {lesson.completed ? "Review" : "Continue"}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
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
                <Users className="h-5 w-5 text-accent" />
                Join Study Group
              </CardTitle>
              <CardDescription>
                Connect with other learners and practice together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Find Groups
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-warm transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-warning" />
                Daily Challenge
              </CardTitle>
              <CardDescription>
                Complete today's challenge to maintain your streak
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="gamified" className="w-full">
                Start Challenge
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

export default Learn;