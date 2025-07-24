import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, BookOpen, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StorySegment {
  id: number;
  text: string;
  translation: string;
  startTime: number;
  endTime: number;
  audio?: string;
}

interface Story {
  id: number;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  segments: StorySegment[];
}

interface StorytellingPlayerProps {
  story?: Story;
  onSegmentComplete?: (segmentId: number) => void;
}

const sampleStory: Story = {
  id: 1,
  title: "राम का परिचय",
  description: "A simple story about Ram introducing himself",
  difficulty: "beginner",
  duration: 45,
  segments: [
    {
      id: 1,
      text: "नमस्ते, मेरा नाम राम है।",
      translation: "Hello, my name is Ram.",
      startTime: 0,
      endTime: 3
    },
    {
      id: 2,
      text: "मैं दिल्ली में रहता हूँ।",
      translation: "I live in Delhi.",
      startTime: 4,
      endTime: 7
    },
    {
      id: 3,
      text: "मैं एक छात्र हूँ।",
      translation: "I am a student.",
      startTime: 8,
      endTime: 11
    },
    {
      id: 4,
      text: "मुझे हिंदी पढ़ना अच्छा लगता है।",
      translation: "I like reading Hindi.",
      startTime: 12,
      endTime: 16
    },
    {
      id: 5,
      text: "आप कैसे हैं?",
      translation: "How are you?",
      startTime: 17,
      endTime: 19
    }
  ]
};

const StorytellingPlayer = ({ 
  story = sampleStory, 
  onSegmentComplete 
}: StorytellingPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [volume, setVolume] = useState([0.8]);
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSegment = story.segments[currentSegmentIndex];
  const progress = (currentTime / story.duration) * 100;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.1;
          
          // Check if we've moved to the next segment
          const nextSegmentIndex = story.segments.findIndex(
            segment => newTime >= segment.startTime && newTime <= segment.endTime
          );
          
          if (nextSegmentIndex !== -1 && nextSegmentIndex !== currentSegmentIndex) {
            setCurrentSegmentIndex(nextSegmentIndex);
            onSegmentComplete?.(story.segments[nextSegmentIndex].id);
          }
          
          // Auto-pause at the end
          if (newTime >= story.duration) {
            setIsPlaying(false);
            return story.duration;
          }
          
          return newTime;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSegmentIndex, story.segments, story.duration, onSegmentComplete]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * story.duration;
    setCurrentTime(newTime);
    
    // Find the segment for this time
    const segmentIndex = story.segments.findIndex(
      segment => newTime >= segment.startTime && newTime <= segment.endTime
    );
    
    if (segmentIndex !== -1) {
      setCurrentSegmentIndex(segmentIndex);
    }
  };

  const jumpToSegment = (index: number) => {
    const segment = story.segments[index];
    setCurrentTime(segment.startTime);
    setCurrentSegmentIndex(index);
  };

  const skipBackward = () => {
    const newIndex = Math.max(0, currentSegmentIndex - 1);
    jumpToSegment(newIndex);
  };

  const skipForward = () => {
    const newIndex = Math.min(story.segments.length - 1, currentSegmentIndex + 1);
    jumpToSegment(newIndex);
  };

  const speakCurrentSegment = () => {
    if ('speechSynthesis' in window && currentSegment) {
      const utterance = new SpeechSynthesisUtterance(currentSegment.text);
      utterance.lang = 'hi-IN';
      utterance.rate = playbackSpeed[0];
      utterance.volume = volume[0];
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-success";
      case "intermediate": return "bg-warning";
      case "advanced": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Story Header */}
      <Card className="shadow-warm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">{story.title}</CardTitle>
          </div>
          <CardDescription className="text-lg">{story.description}</CardDescription>
          <div className="flex justify-center gap-2 mt-4">
            <Badge 
              variant="outline" 
              className={`${getDifficultyColor(story.difficulty)} text-white`}
            >
              {story.difficulty}
            </Badge>
            <Badge variant="outline">
              {formatTime(story.duration)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Current Segment Display */}
      <Card className="shadow-accent">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            {/* Hindi Text */}
            <div className="text-3xl font-bold text-primary leading-relaxed">
              {currentSegment?.text}
            </div>
            
            {/* Translation Toggle */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? "Hide Translation" : "Show Translation"}
              </Button>
              
              {showTranslation && (
                <div className="text-lg text-muted-foreground font-medium">
                  {currentSegment?.translation}
                </div>
              )}
            </div>

            {/* Speak Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={speakCurrentSegment}
            >
              <Volume2 className="h-4 w-4" />
              Speak
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Player Controls */}
      <Card className="shadow-accent">
        <CardContent className="p-6 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(story.duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={skipBackward}
              disabled={currentSegmentIndex === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="gamified"
              size="icon"
              onClick={togglePlayPause}
              className="h-12 w-12"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={skipForward}
              disabled={currentSegmentIndex === story.segments.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Additional Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Volume Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Volume
              </label>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                Speed: {playbackSpeed[0]}x
              </label>
              <Slider
                value={playbackSpeed}
                onValueChange={setPlaybackSpeed}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Segment List */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle className="text-lg">Story Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {story.segments.map((segment, index) => (
              <div
                key={segment.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  index === currentSegmentIndex
                    ? 'bg-primary/10 border-primary'
                    : 'bg-muted/50 border-border hover:bg-muted'
                }`}
                onClick={() => jumpToSegment(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{segment.text}</p>
                    <p className="text-sm text-muted-foreground">{segment.translation}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(segment.startTime)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorytellingPlayer;