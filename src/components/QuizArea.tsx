import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  translation?: string;
}

interface QuizAreaProps {
  quizType?: "vocabulary" | "grammar" | "listening";
  onComplete?: (score: number) => void;
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does 'नमस्ते' mean in English?",
    options: ["Goodbye", "Hello", "Thank you", "Please"],
    correctAnswer: 1,
    explanation: "नमस्ते (Namaste) is a common Hindi greeting meaning 'Hello' or 'Greetings'",
    translation: "namaste"
  },
  {
    id: 2,
    question: "Which word means 'water' in Hindi?",
    options: ["पानी", "दूध", "चाय", "रस"],
    correctAnswer: 0,
    explanation: "पानी (paani) means water in Hindi",
    translation: "paani, doodh, chai, ras"
  },
  {
    id: 3,
    question: "How do you say 'Thank you' in Hindi?",
    options: ["माफ करें", "धन्यवाद", "कृपया", "अलविदा"],
    correctAnswer: 1,
    explanation: "धन्यवाद (dhanyawad) means 'Thank you' in Hindi",
    translation: "maaf karein, dhanyawad, kripaya, alvida"
  }
];

const QuizArea = ({ quizType = "vocabulary", onComplete }: QuizAreaProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(sampleQuestions.length).fill(null));
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    
    setShowResult(true);
    
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsQuizComplete(true);
      onComplete?.(Math.round((score / sampleQuestions.length) * 100));
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(sampleQuestions.length).fill(null));
    setIsQuizComplete(false);
  };

  const getScoreEmoji = (percentage: number) => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 80) return "🎉";
    if (percentage >= 70) return "👍";
    return "💪";
  };

  if (isQuizComplete) {
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-warm">
        <CardContent className="text-center p-8">
          <div className="mb-6">
            <Trophy className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-xl text-muted-foreground">
              {getScoreEmoji(percentage)} Your Score: {score}/{sampleQuestions.length}
            </p>
          </div>

          <div className="mb-6">
            <Progress value={percentage} className="h-4 mb-2" />
            <Badge variant="default" className="text-lg px-4 py-2">
              {percentage}% Correct
            </Badge>
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="gamified" size="lg" onClick={handleRestart}>
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" size="lg">
              <Star className="h-4 w-4" />
              Next Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-accent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold capitalize">
              {quizType} Quiz
            </CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question */}
        <div className="text-center p-6 bg-gradient-warm rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
          {question.translation && (
            <p className="text-sm text-muted-foreground">({question.translation})</p>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const isWrong = showResult && isSelected && !isCorrect;
            const shouldHighlight = showResult && isCorrect;

            return (
              <Button
                key={index}
                variant={
                  shouldHighlight ? "success" : 
                  isWrong ? "destructive" : 
                  isSelected ? "default" : "quiz"
                }
                size="lg"
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`h-auto p-4 text-left justify-start relative ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg">{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircle className="h-5 w-5 ml-auto text-success-foreground" />
                  )}
                  {isWrong && (
                    <XCircle className="h-5 w-5 ml-auto text-destructive-foreground" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium mb-2">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0 || showResult}
          >
            Previous
          </Button>

          {!showResult ? (
            <Button
              variant="default"
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button variant="gamified" onClick={handleNextQuestion}>
              {currentQuestion < sampleQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizArea;