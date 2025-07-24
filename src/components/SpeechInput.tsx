import { useState, useRef } from "react";
import { Mic, MicOff, Play, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SpeechInputProps {
  targetLanguage?: string;
  prompt?: string;
  onRecordingComplete?: (audioBlob: Blob) => void;
  onScoreUpdate?: (score: number) => void;
}

const SpeechInput = ({ 
  targetLanguage = "Hindi",
  prompt = "नमस्ते, मेरा नाम राम है।",
  onRecordingComplete,
  onScoreUpdate 
}: SpeechInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        onRecordingComplete?.(blob);
        
        // Simulate AI pronunciation scoring
        const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100 range
        setPronunciationScore(mockScore);
        onScoreUpdate?.(mockScore);
        
        // Generate feedback based on score
        if (mockScore >= 90) {
          setFeedback("Excellent pronunciation! 🎉");
        } else if (mockScore >= 80) {
          setFeedback("Great job! Minor improvements needed. 👍");
        } else if (mockScore >= 70) {
          setFeedback("Good effort! Keep practicing. 💪");
        } else {
          setFeedback("Keep practicing! You're improving. 📚");
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playPrompt = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(prompt);
      utterance.lang = 'hi-IN'; // Hindi language code
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-success";
    if (score >= 80) return "bg-primary";
    if (score >= 70) return "bg-warning";
    return "bg-secondary";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    return "outline";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-accent">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">
          Pronunciation Practice
        </CardTitle>
        <CardDescription>
          Listen to the phrase and repeat it to practice your {targetLanguage} pronunciation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Practice Phrase */}
        <div className="text-center p-6 bg-gradient-warm rounded-lg border-2 border-primary/20">
          <p className="text-2xl font-bold text-primary mb-2">{prompt}</p>
          <p className="text-muted-foreground">
            "Hello, my name is Ram."
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={playPrompt}
            disabled={isPlaying}
            className="mt-3"
          >
            {isPlaying ? (
              <>
                <Square className="h-4 w-4" />
                Playing...
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Listen
              </>
            )}
          </Button>
        </div>

        {/* Recording Controls */}
        <div className="flex flex-col items-center space-y-4">
          <Button
            variant={isRecording ? "destructive" : "gamified"}
            size="lg"
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-20 h-20 rounded-full ${isRecording ? 'animate-pulse' : ''}`}
          >
            {isRecording ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground">
            {isRecording ? "Recording... Click to stop" : "Click to start recording"}
          </p>
        </div>

        {/* Pronunciation Score */}
        {pronunciationScore !== null && (
          <div className="space-y-4">
            <div className="text-center">
              <Badge 
                variant={getScoreBadgeVariant(pronunciationScore)}
                className="text-lg px-4 py-2"
              >
                Score: {pronunciationScore}/100
              </Badge>
            </div>
            
            <Progress 
              value={pronunciationScore} 
              className="h-3"
            />
            
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">
                {feedback}
              </p>
            </div>
          </div>
        )}

        {/* Playback Controls */}
        {audioBlob && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                const audio = new Audio(URL.createObjectURL(audioBlob));
                audio.play();
              }}
            >
              <Play className="h-4 w-4" />
              Play Recording
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeechInput;