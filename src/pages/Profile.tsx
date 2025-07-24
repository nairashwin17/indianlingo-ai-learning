import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Trophy, 
  Calendar, 
  Clock,
  Target,
  TrendingUp,
  Settings,
  Award,
  Star,
  BookOpen,
  Brain,
  Zap
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const userStats = {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    joinDate: "March 2024",
    currentStreak: 15,
    longestStreak: 28,
    totalStudyTime: "45 hours",
    completedLessons: 42,
    averageScore: 82
  };

  const achievements = [
    {
      id: "first-lesson",
      title: "First Steps",
      description: "Completed your first lesson",
      icon: BookOpen,
      earned: true,
      date: "March 15, 2024"
    },
    {
      id: "week-streak",
      title: "Consistent Learner",
      description: "Maintained a 7-day study streak",
      icon: Calendar,
      earned: true,
      date: "March 22, 2024"
    },
    {
      id: "quiz-master",
      title: "Quiz Master",
      description: "Scored 90+ on 5 consecutive quizzes",
      icon: Brain,
      earned: true,
      date: "April 2, 2024"
    },
    {
      id: "speed-learner",
      title: "Speed Learner",
      description: "Complete 10 lessons in one day",
      icon: Zap,
      earned: false,
      date: null
    }
  ];

  const learningProgress = [
    { language: "Hindi", level: "Intermediate", progress: 65, lessonsCompleted: 28 },
    { language: "Tamil", level: "Beginner", progress: 35, lessonsCompleted: 12 },
    { language: "Marathi", level: "Beginner", progress: 20, lessonsCompleted: 8 }
  ];

  const recentActivity = [
    { type: "lesson", title: "Basic Greetings - Hindi", date: "2 hours ago", score: 85 },
    { type: "quiz", title: "Vocabulary Quiz - Tamil", date: "1 day ago", score: 78 },
    { type: "story", title: "The Clever Monkey", date: "2 days ago", score: 90 },
    { type: "flashcards", title: "Family Members", date: "3 days ago", score: 82 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/api/placeholder/100/100" alt={userStats.name} />
              <AvatarFallback className="text-2xl">PS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-2">{userStats.name}</h1>
              <p className="text-muted-foreground mb-2">{userStats.email}</p>
              <Badge variant="outline">Member since {userStats.joinDate}</Badge>
            </div>
            <div className="ml-auto">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userStats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userStats.totalStudyTime}</div>
                  <div className="text-sm text-muted-foreground">Study Time</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userStats.completedLessons}</div>
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userStats.averageScore}%</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </CardContent>
              </Card>
            </div>

            {/* Current Learning */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Learning</CardTitle>
                  <CardDescription>Your active language courses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningProgress.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{course.language}</span>
                          <Badge variant="outline" className="ml-2">{course.level}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {course.lessonsCompleted} lessons
                        </span>
                      </div>
                      <Progress value={course.progress} />
                      <div className="text-xs text-muted-foreground text-right">
                        {course.progress}% complete
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Goals</CardTitle>
                  <CardDescription>Your learning objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Daily Practice</div>
                        <div className="text-sm text-muted-foreground">Study for 30 minutes</div>
                      </div>
                    </div>
                    <Badge variant="default">15/30 min</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-accent" />
                      <div>
                        <div className="font-medium">Weekly Streak</div>
                        <div className="text-sm text-muted-foreground">Complete 7 days in a row</div>
                      </div>
                    </div>
                    <Badge variant="default">5/7 days</Badge>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Adjust Goals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your progress across all languages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {learningProgress.map((course, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{course.language}</h3>
                        <Badge variant={course.level === "Beginner" ? "default" : "secondary"}>
                          {course.level}
                        </Badge>
                      </div>
                      <Progress value={course.progress} className="h-3" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{course.lessonsCompleted} lessons completed</span>
                        <span>{course.progress}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Statistics</CardTitle>
                  <CardDescription>Your learning metrics over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current Streak</span>
                      <span className="font-semibold">{userStats.currentStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Longest Streak</span>
                      <span className="font-semibold">{userStats.longestStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Study Time</span>
                      <span className="font-semibold">{userStats.totalStudyTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Score</span>
                      <span className="font-semibold">{userStats.averageScore}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`${achievement.earned ? 'border-primary/50 bg-primary/5' : 'opacity-60'}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        <achievement.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                      {achievement.earned && (
                        <Award className="h-6 w-6 text-warning" />
                      )}
                    </div>
                  </CardHeader>
                  {achievement.earned && achievement.date && (
                    <CardContent className="pt-0">
                      <div className="text-sm text-muted-foreground">
                        Earned on {achievement.date}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          {activity.type === 'lesson' && <BookOpen className="h-4 w-4 text-primary" />}
                          {activity.type === 'quiz' && <Brain className="h-4 w-4 text-accent" />}
                          {activity.type === 'story' && <BookOpen className="h-4 w-4 text-secondary" />}
                          {activity.type === 'flashcards' && <Star className="h-4 w-4 text-warning" />}
                        </div>
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.date}</div>
                        </div>
                      </div>
                      <Badge variant={activity.score >= 80 ? "default" : activity.score >= 60 ? "secondary" : "outline"}>
                        {activity.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;