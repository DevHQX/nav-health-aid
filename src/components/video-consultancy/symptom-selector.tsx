import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, Thermometer, Wind, Bone, Heart, AlertTriangle, Stethoscope } from "lucide-react";

interface SymptomSelectorProps {
  language: string;
  onSymptomSelect: (symptom: string) => void;
}

const symptoms = [
  { 
    id: "fever", 
    icon: Thermometer, 
    color: "text-red-500",
    translations: {
      en: "Fever",
      hi: "बुखार", 
      pa: "ਬੁਖਾਰ"
    }
  },
  { 
    id: "cold", 
    icon: Wind, 
    color: "text-blue-500",
    translations: {
      en: "Cold & Cough",
      hi: "सर्दी और खांसी",
      pa: "ਠੰਡ ਅਤੇ ਖੰਘ"
    }
  },
  { 
    id: "joint", 
    icon: Bone, 
    color: "text-amber-500",
    translations: {
      en: "Joint Pain",
      hi: "जोड़ों का दर्द",
      pa: "ਜੋੜਾਂ ਦਾ ਦਰਦ"
    }
  },
  { 
    id: "chest", 
    icon: Heart, 
    color: "text-pink-500",
    translations: {
      en: "Chest Problem",
      hi: "सीने की समस्या",
      pa: "ਛਾਤੀ ਦੀ ਸਮੱਸਿਆ"
    }
  },
  { 
    id: "general", 
    icon: Stethoscope, 
    color: "text-green-500",
    translations: {
      en: "General Problem",
      hi: "सामान्य समस्या",
      pa: "ਆਮ ਸਮੱਸਿਆ"
    }
  },
  { 
    id: "emergency", 
    icon: AlertTriangle, 
    color: "text-red-600",
    translations: {
      en: "Emergency",
      hi: "आपातकाल",
      pa: "ਸੰਕਟਕਾਲ"
    }
  }
];

const translations = {
  en: {
    title: "What's troubling you?",
    subtitle: "Select your primary concern to find the right specialist",
    selectCategory: "Select a category"
  },
  hi: {
    title: "आपको क्या परेशानी है?",
    subtitle: "सही विशेषज्ञ खोजने के लिए अपनी मुख्य समस्या चुनें",
    selectCategory: "एक श्रेणी चुनें"
  },
  pa: {
    title: "ਤੁਹਾਨੂੰ ਕੀ ਤਕਲੀਫ ਹੈ?",
    subtitle: "ਸਹੀ ਮਾਹਰ ਲੱਭਣ ਲਈ ਆਪਣੀ ਮੁੱਖ ਸਮੱਸਿਆ ਚੁਣੋ",
    selectCategory: "ਇੱਕ ਸ਼੍ਰੇਣੀ ਚੁਣੋ"
  }
};

export const SymptomSelector = ({ language, onSymptomSelect }: SymptomSelectorProps) => {
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  
  const t = translations[language as keyof typeof translations];

  const playText = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      setIsPlayingSpeech(id);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'pa' ? 'pa-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.8;
      
      utterance.onend = () => setIsPlayingSpeech(null);
      utterance.onerror = () => setIsPlayingSpeech(null);
      
      speechSynthesis.speak(utterance);
    }
  };

  const handleSymptomClick = (symptomId: string) => {
    setSelectedSymptom(symptomId);
    setTimeout(() => {
      onSymptomSelect(symptomId);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => playText(t.title, 'title')}
            className="hover:bg-primary/10"
            disabled={isPlayingSpeech === 'title'}
          >
            <Volume2 className={`h-5 w-5 ${isPlayingSpeech === 'title' ? 'pulse-ring' : ''}`} />
          </Button>
        </div>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Symptom Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {symptoms.map((symptom) => {
          const IconComponent = symptom.icon;
          const label = symptom.translations[language as keyof typeof symptom.translations];
          const isSelected = selectedSymptom === symptom.id;
          const isEmergency = symptom.id === 'emergency';
          
          return (
            <Card 
              key={symptom.id}
              className={`cursor-pointer smooth-transition group hover:medical-shadow-lg ${
                isSelected 
                  ? 'medical-glow border-primary bg-primary/5' 
                  : isEmergency 
                    ? 'hover:border-red-500 hover:shadow-red-200' 
                    : 'hover:border-primary'
              }`}
              onClick={() => handleSymptomClick(symptom.id)}
            >
              <CardHeader className="text-center pb-2">
                <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-3 spring-transition ${
                  isSelected 
                    ? 'medical-gradient medical-glow scale-110' 
                    : isEmergency 
                      ? 'bg-red-100 group-hover:bg-red-200' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                } ${isSelected ? '' : 'group-hover:scale-105'}`}>
                  <IconComponent className={`h-8 w-8 ${
                    isSelected 
                      ? 'text-white' 
                      : isEmergency 
                        ? 'text-red-600' 
                        : 'text-primary'
                  }`} />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CardTitle className={`text-lg ${isEmergency ? 'text-red-600' : ''}`}>
                    {label}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      playText(label, symptom.id);
                    }}
                    className="h-8 w-8 hover:bg-primary/10"
                    disabled={isPlayingSpeech === symptom.id}
                  >
                    <Volume2 className={`h-4 w-4 ${isPlayingSpeech === symptom.id ? 'pulse-ring' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              {isEmergency && (
                <CardContent className="pt-0">
                  <p className="text-xs text-red-600 text-center font-medium">
                    Immediate medical attention required
                  </p>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Voice Instructions */}
      <div className="text-center">
        <Card className="inline-block p-4 bg-gradient-subtle">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Volume2 className="h-4 w-4" />
            <span>Click the speaker icon to hear category names in your language</span>
          </div>
        </Card>
      </div>
    </div>
  );
};