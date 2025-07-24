import { useState } from "react";
import { Send, Sparkles, BookOpen, Volume2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import mascotThinking from "@/assets/mascot-thinking.png";

interface ExplanationResult {
  translation: string;
  breakdown: Array<{
    word: string;
    meaning: string;
    pronunciation: string;
  }>;
  grammar: string;
  culturalContext?: string;
}

interface TextExplainerProps {
  targetLanguage?: string;
  onExplanationGenerated?: (result: ExplanationResult) => void;
}

const TextExplainer = ({ 
  targetLanguage = "Hindi",
  onExplanationGenerated 
}: TextExplainerProps) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<ExplanationResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(true);

  // Mock AI explanation generation
  const generateExplanation = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockExplanation: ExplanationResult = {
      translation: "Hello, how are you?",
      breakdown: [
        { word: "नमस्ते", meaning: "Hello/Greetings", pronunciation: "na-mas-te" },
        { word: "आप", meaning: "You (formal)", pronunciation: "aap" },
        { word: "कैसे", meaning: "How", pronunciation: "kai-se" },
        { word: "हैं", meaning: "Are", pronunciation: "hain" }
      ],
      grammar: "This is a formal greeting in Hindi. 'आप' is the respectful form of 'you', making this sentence polite and appropriate for addressing elders or strangers.",
      culturalContext: "In Indian culture, using formal language shows respect. This greeting is commonly used throughout the day, unlike 'Good morning/afternoon' in English."
    };

    setExplanation(mockExplanation);
    setIsLoading(false);
    onExplanationGenerated?.(mockExplanation);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateExplanation();
  };

  const speakText = (text: string, lang: string = 'hi-IN') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-accent">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img src={mascotThinking} alt="Thinking Elephant" className="h-12 w-12" />
          <CardTitle className="text-2xl font-bold">
            AI Text Explainer
          </CardTitle>
        </div>
        <CardDescription className="text-lg">
          Enter any {targetLanguage} text and get detailed explanations, translations, and cultural context
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Enter {targetLanguage} text to explain:
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="नमस्ते आप कैसे हैं?"
              className="min-h-[100px] text-lg resize-none"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            variant="gamified" 
            size="lg" 
            className="w-full"
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Explain Text
              </>
            )}
          </Button>
        </form>

        {/* Results Section */}
        {explanation && (
          <div className="space-y-6">
            <Separator />
            
            {/* Translation */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Translation</h3>
              </div>
              <div className="p-4 bg-gradient-warm rounded-lg border-l-4 border-primary">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium">{explanation.translation}</p>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => speakText(explanation.translation, 'en-US')}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(explanation.translation)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Word Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold">Word Breakdown</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                >
                  {showBreakdown ? "Hide" : "Show"}
                </Button>
              </div>
              
              {showBreakdown && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {explanation.breakdown.map((item, index) => (
                    <div key={index} className="p-4 bg-card border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-bold text-primary">{item.word}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => speakText(item.word)}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        /{item.pronunciation}/
                      </p>
                      <p className="font-medium">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grammar Explanation */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  Grammar
                </Badge>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground">{explanation.grammar}</p>
              </div>
            </div>

            {/* Cultural Context */}
            {explanation.culturalContext && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-3 py-1">
                    Cultural Context
                  </Badge>
                </div>
                <div className="p-4 bg-gradient-accent rounded-lg border border-accent/20">
                  <p className="text-accent-foreground">{explanation.culturalContext}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TextExplainer;