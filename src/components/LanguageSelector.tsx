import { useState } from "react";
import { ChevronDown, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const baseLanguages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
];

const targetLanguages: Language[] = [
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
];

interface LanguageSelectorProps {
  onLanguageChange?: (from: string, to: string) => void;
}

const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("hi");

  const handleSwapLanguages = () => {
    const newFrom = toLanguage;
    const newTo = fromLanguage;
    setFromLanguage(newFrom);
    setToLanguage(newTo);
    onLanguageChange?.(newFrom, newTo);
  };

  const handleFromLanguageChange = (value: string) => {
    setFromLanguage(value);
    onLanguageChange?.(value, toLanguage);
  };

  const handleToLanguageChange = (value: string) => {
    setToLanguage(value);
    onLanguageChange?.(fromLanguage, value);
  };

  const selectedFromLanguage = baseLanguages.find(lang => lang.code === fromLanguage);
  const selectedToLanguage = targetLanguages.find(lang => lang.code === toLanguage);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-warm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Choose Your Learning Path
        </CardTitle>
        <CardDescription className="text-lg">
          Select your base language and the Indian language you want to learn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* From Language */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              I speak
            </label>
            <Select value={fromLanguage} onValueChange={handleFromLanguageChange}>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedFromLanguage?.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{selectedFromLanguage?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedFromLanguage?.nativeName}
                      </div>
                    </div>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {baseLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.flag}</span>
                      <div>
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-sm text-muted-foreground">{lang.nativeName}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapLanguages}
              className="h-12 w-12 rounded-full hover:rotate-180 transition-transform duration-500"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* To Language */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              I want to learn
            </label>
            <Select value={toLanguage} onValueChange={handleToLanguageChange}>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedToLanguage?.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{selectedToLanguage?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedToLanguage?.nativeName}
                      </div>
                    </div>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {targetLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.flag}</span>
                      <div>
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-sm text-muted-foreground">{lang.nativeName}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-center pt-4">
          <Button variant="gamified" size="lg" className="px-8">
            Start Learning Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;