import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Star,
  Headphones,
  Users,
  ChevronRight,
  Volume2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StorytellingPlayer from "@/components/StorytellingPlayer";

const Stories = () => {
  const [activeStory, setActiveStory] = useState<string | null>(null);

  const storyCategories = [
    {
      id: "folklore",
      title: "Indian Folklore",
      description: "Traditional stories and legends",
      count: 12,
      color: "text-primary"
    },
    {
      id: "modern",
      title: "Modern Tales",
      description: "Contemporary stories and situations",
      count: 8,
      color: "text-accent"
    },
    {
      id: "history",
      title: "Historical",
      description: "Stories from India's rich history",
      count: 6,
      color: "text-secondary"
    },
    {
      id: "children",
      title: "Children's Stories",
      description: "Simple stories for beginners",
      count: 15,
      color: "text-success"
    }
  ];

  const stories = [
    {
      id: "panchatantra-1",
      title: "The Clever Monkey",
      description: "A wise monkey outwits a crocodile in this classic Panchatantra tale",
      duration: "8 min",
      difficulty: "Beginner",
      language: "Hindi",
      category: "folklore",
      progress: 75,
      rating: 4.8,
      completions: 1250
    },
    {
      id: "akbar-birbal",
      title: "Akbar and Birbal's Wisdom",
      description: "Emperor Akbar tests Birbal's intelligence with clever riddles",
      duration: "12 min",
      difficulty: "Intermediate",
      language: "Hindi",
      category: "history",
      progress: 30,
      rating: 4.9,
      completions: 980
    },
    {
      id: "tenali-rama",
      title: "Tenali Rama's Wit",
      description: "The legendary wit of Tenali Rama saves the day",
      duration: "10 min",
      difficulty: "Intermediate",
      language: "Telugu",
      category: "folklore",
      progress: 0,
      rating: 4.7,
      completions: 756
    },
    {
      id: "modern-friendship",
      title: "City Friends",
      description: "A heartwarming story about friendship in modern Mumbai",
      duration: "15 min",
      difficulty: "Advanced",
      language: "Marathi",
      category: "modern",
      progress: 0,
      rating: 4.6,
      completions: 432
    }
  ];

  if (activeStory) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setActiveStory(null)}
              className="mb-4"
            >
              ← Back to Stories
            </Button>
            <h1 className="text-3xl font-bold">Story Player</h1>
          </div>
          <StorytellingPlayer />
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
          <h1 className="text-4xl font-bold mb-4">Stories</h1>
          <p className="text-xl text-muted-foreground">
            Learn through engaging narratives with synchronized audio and interactive vocabulary.
          </p>
        </div>

        {/* Story Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Story Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-warm transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpen className={`h-8 w-8 ${category.color} mx-auto mb-3`} />
                  <h3 className="font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <Badge variant="outline">{category.count} stories</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.slice(0, 2).map((story) => (
              <Card key={story.id} className="hover:shadow-accent transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {story.language}
                      </Badge>
                      <Badge variant={story.difficulty === "Beginner" ? "default" : story.difficulty === "Intermediate" ? "secondary" : "outline"}>
                        {story.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      {story.rating}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{story.title}</CardTitle>
                  <CardDescription className="text-base">{story.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {story.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {story.completions} completed
                      </div>
                    </div>
                    
                    {story.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{story.progress}%</span>
                        </div>
                        <Progress value={story.progress} />
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => setActiveStory(story.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {story.progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Headphones className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Stories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Card key={story.id} className="hover:shadow-accent transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {story.language}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      {story.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                  <CardDescription>{story.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {story.duration}
                      </div>
                      <Badge variant={story.difficulty === "Beginner" ? "default" : story.difficulty === "Intermediate" ? "secondary" : "outline"}>
                        {story.difficulty}
                      </Badge>
                    </div>
                    
                    {story.progress > 0 && (
                      <div className="space-y-1">
                        <Progress value={story.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground text-right">{story.progress}% complete</div>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      variant={story.progress > 0 ? "default" : "outline"}
                      onClick={() => setActiveStory(story.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {story.progress > 0 ? 'Continue' : 'Start Story'}
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
                <Volume2 className="h-5 w-5 text-primary" />
                Audio Only Mode
              </CardTitle>
              <CardDescription>
                Listen to stories without text for advanced practice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Start Audio Session
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-warm transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Story Discussion
              </CardTitle>
              <CardDescription>
                Join community discussions about your favorite stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Join Discussions
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

export default Stories;