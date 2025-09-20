import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Calendar, 
  Pill, 
  FileText, 
  Home, 
  User, 
  LogOut,
  Bell,
  Volume2
} from "lucide-react";

interface HeaderProps {
  userRole: string;
  language: string;
  onNavigate: (section: string) => void;
  currentSection: string;
  onLogout: () => void;
}

const translations = {
  en: {
    pastConsultations: "Past Consultations",
    medicineAvailability: "Medicine Availability", 
    patientHistory: "Patient History & Credentials",
    home: "Home",
    logout: "Logout",
    notifications: "Notifications"
  },
  hi: {
    pastConsultations: "पिछले परामर्श",
    medicineAvailability: "दवा की उपलब्धता",
    patientHistory: "मरीज़ का इतिहास और प्रमाण पत्र",
    home: "होम",
    logout: "लॉगआउट",
    notifications: "सूचनाएं"
  },
  pa: {
    pastConsultations: "ਪਿਛਲੇ ਸਲਾਹ-ਮਸ਼ਵਰੇ",
    medicineAvailability: "ਦਵਾਈ ਦੀ ਉਪਲਬਧਤਾ",
    patientHistory: "ਮਰੀਜ਼ ਦਾ ਇਤਿਹਾਸ ਅਤੇ ਪ੍ਰਮਾਣ ਪੱਤਰ",
    home: "ਘਰ",
    logout: "ਲਾਗਆਉਟ", 
    notifications: "ਸੂਚਨਾਵਾਂ"
  }
};

const menuItems = [
  { id: "home", icon: Home, key: "home" },
  { id: "consultations", icon: Calendar, key: "pastConsultations" },
  { id: "medicine", icon: Pill, key: "medicineAvailability" },
  { id: "history", icon: FileText, key: "patientHistory" },
];

export const Header = ({ userRole, language, onNavigate, currentSection, onLogout }: HeaderProps) => {
  const [notificationCount] = useState(3);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<string | null>(null);
  
  const t = translations[language as keyof typeof translations];

  const playText = (text: string, itemId: string) => {
    if ('speechSynthesis' in window) {
      setIsPlayingSpeech(itemId);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'pa' ? 'pa-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.8;
      
      utterance.onend = () => setIsPlayingSpeech(null);
      utterance.onerror = () => setIsPlayingSpeech(null);
      
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 medical-shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 medical-gradient rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">Nabha Medical</h1>
              <p className="text-xs text-muted-foreground capitalize">{userRole} Dashboard</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const label = t[item.key as keyof typeof t];
              const isActive = currentSection === item.id;
              
              return (
                <div key={item.id} className="flex items-center gap-1">
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => onNavigate(item.id)}
                    className={`gap-2 smooth-transition ${
                      isActive 
                        ? "medical-gradient text-primary-foreground medical-shadow" 
                        : "hover:bg-primary/10"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => playText(label, item.id)}
                    className="h-8 w-8 hover:bg-primary/10"
                    disabled={isPlayingSpeech === item.id}
                  >
                    <Volume2 className={`h-3 w-3 ${isPlayingSpeech === item.id ? 'pulse-ring' : ''}`} />
                  </Button>
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon"
              className="relative hover:bg-primary/10"
              onClick={() => onNavigate("notifications")}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <User className="h-5 w-5" />
            </Button>

            {/* Logout */}
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="gap-2 hover:bg-destructive/10 hover:text-destructive border-destructive/20"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t.logout}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex overflow-x-auto gap-2 pb-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const label = t[item.key as keyof typeof t];
              const isActive = currentSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => onNavigate(item.id)}
                  className={`shrink-0 gap-2 text-xs ${
                    isActive 
                      ? "medical-gradient text-primary-foreground" 
                      : "hover:bg-primary/10"
                  }`}
                >
                  <IconComponent className="h-3 w-3" />
                  {label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};