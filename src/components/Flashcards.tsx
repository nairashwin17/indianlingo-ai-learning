import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Star, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface FlashcardData {
  id: number;
  front: string;
  back: string;
  pronunciation?: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

interface FlashcardsProps {
  category?: string;
  onCardMastered?: (cardId: number) => void;
}

const sampleCards: FlashcardData[] = [
  {
    id: 1,
    front: "नमस्ते",
    back: "Hello / Greetings",
    pronunciation: "na-mas-te",
    difficulty: "easy",
    category: "Greetings"
  },
  {
    id: 2,
    front: "धन्यवाद",
    back: "Thank you",
    pronunciation: "dhan-ya-vaad",
    difficulty: "easy",
    category: "Greetings"
  },
  {
    id: 3,
    front: "पानी",
    back: "Water",
    pronunciation: "paa-ni",
    difficulty: "easy",
    category: "Basic Vocabulary"
  },
  {
    id: 4,
    front: "मैं भारत से हूँ",
    back: "I am from India",
    pronunciation: "main bha-rat se hoon",
    difficulty: "medium",
    category: "Sentences"
  },
  {
    id: 5,
    front: "आपका स्वागत है",
    back: "You're welcome",
    pronunciation: "aap-ka sva-gat hai",
    difficulty: "medium",
    category: "Greetings"
  }
];

const Flashcards = ({ category, onCardMastered }: FlashcardsProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [shuffledCards, setShuffledCards] = useState(sampleCards);

  const currentCard = shuffledCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / shuffledCards.length) * 100;

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % shuffledCards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length);
  };

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMarkMastered = () => {
    const newMastered = new Set(masteredCards);
    newMastered.add(currentCard.id);
    setMasteredCards(newMastered);
    onCardMastered?.(currentCard.id);
    handleNextCard();
  };

  const handleShuffle = () => {
    const shuffled = [...sampleCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleReset = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
    setShuffledCards(sampleCards);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-success";
      case "medium": return "bg-warning";
      case "hard": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Flashcards</h2>
        <p className="text-muted-foreground">
          Card {currentCardIndex + 1} of {shuffledCards.length}
        </p>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={handleShuffle}>
          <Shuffle className="h-4 w-4" />
          Shuffle
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <Badge variant="outline" className="px-3 py-1">
          {masteredCards.size} mastered
        </Badge>
      </div>

      {/* Main Flashcard */}
      <div className="relative">
        <Card 
          className={`w-full h-80 cursor-pointer transition-all duration-500 transform-gpu ${
            isFlipped ? 'rotate-y-180' : ''
          } shadow-warm hover:shadow-accent`}
          onClick={handleCardFlip}
          style={{ perspective: '1000px' }}
        >
          <CardContent className="h-full flex flex-col items-center justify-center p-8 relative">
            {/* Front Side */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 ${
              isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
            } transition-opacity duration-300`}>
              <div className="text-center space-y-4">
                <Badge 
                  variant="outline" 
                  className={`${getDifficultyColor(currentCard.difficulty)} text-white mb-4`}
                >
                  {currentCard.category} • {currentCard.difficulty}
                </Badge>
                
                <h3 className="text-4xl font-bold text-primary mb-4">
                  {currentCard.front}
                </h3>
                
                {currentCard.pronunciation && (
                  <p className="text-lg text-muted-foreground">
                    /{currentCard.pronunciation}/
                  </p>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(currentCard.front);
                  }}
                  className="mt-4"
                >
                  <Volume2 className="h-4 w-4" />
                  Listen
                </Button>
              </div>
              
              <p className="absolute bottom-4 text-sm text-muted-foreground">
                Click to flip
              </p>
            </div>

            {/* Back Side */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 ${
              isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity duration-300`}>
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold text-accent">
                  {currentCard.back}
                </h3>
                
                {currentCard.pronunciation && (
                  <p className="text-lg text-muted-foreground">
                    Pronunciation: /{currentCard.pronunciation}/
                  </p>
                )}
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(currentCard.front);
                    }}
                  >
                    <Volume2 className="h-4 w-4" />
                    Original
                  </Button>
                  
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkMastered();
                    }}
                  >
                    <Star className="h-4 w-4" />
                    Mastered
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handlePrevCard}
          disabled={shuffledCards.length <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {shuffledCards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentCardIndex 
                  ? 'bg-primary w-6' 
                  : masteredCards.has(shuffledCards[index].id)
                  ? 'bg-success'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Button 
          variant="outline" 
          onClick={handleNextCard}
          disabled={shuffledCards.length <= 1}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Flashcards;