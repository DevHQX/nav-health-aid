import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
  className?: string;
}

export const LanguageSelector = ({ selectedLanguage, onLanguageChange, className = "" }: LanguageSelectorProps) => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const playLanguageName = (language: Language) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(language.code);
      
      const utterance = new SpeechSynthesisUtterance(language.nativeName);
      utterance.lang = language.code === 'pa' ? 'pa-IN' : language.code === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.8;
      
      utterance.onend = () => setIsPlaying(null);
      utterance.onerror = () => setIsPlaying(null);
      
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className={`p-4 medical-shadow ${className}`}>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Select Language / भाषा चुनें / ਭਾਸ਼ਾ ਚੁਣੋ</h3>
      <div className="grid grid-cols-1 gap-2">
        {languages.map((language) => (
          <div key={language.code} className="flex items-center gap-2">
            <Button
              variant={selectedLanguage === language.code ? "default" : "outline"}
              onClick={() => onLanguageChange(language.code)}
              className={`flex-1 justify-start smooth-transition ${
                selectedLanguage === language.code 
                  ? "medical-gradient text-primary-foreground medical-glow" 
                  : "hover:medical-shadow"
              }`}
            >
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs opacity-75 ml-2">({language.name})</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => playLanguageName(language)}
              disabled={isPlaying === language.code}
              className="shrink-0 hover:bg-primary/10"
            >
              <Volume2 className={`h-4 w-4 ${isPlaying === language.code ? 'pulse-ring' : ''}`} />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};