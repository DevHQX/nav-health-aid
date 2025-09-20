import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Heart, User, Stethoscope, Building2 } from "lucide-react";

interface LoginFormProps {
  onLogin: (role: string, language: string) => void;
}

const roleIcons = {
  user: User,
  doctor: Stethoscope,
  hospital: Building2,
};

const roleLabels = {
  en: {
    user: "User",
    doctor: "Doctor", 
    hospital: "Hospital/Organization"
  },
  hi: {
    user: "उपयोगकर्ता",
    doctor: "डॉक्टर",
    hospital: "अस्पताल/संगठन"
  },
  pa: {
    user: "ਉਪਭੋਗਤਾ",
    doctor: "ਡਾਕਟਰ",
    hospital: "ਹਸਪਤਾਲ/ਸੰਸਥਾ"
  }
};

const translations = {
  en: {
    title: "Nabha Medical Platform",
    subtitle: "Quality Healthcare for Everyone",
    selectRole: "Select Your Role",
    email: "Email",
    password: "Password", 
    login: "Login",
    welcome: "Welcome to Digital Healthcare"
  },
  hi: {
    title: "नाभा मेडिकल प्लेटफार्म",
    subtitle: "सभी के लिए गुणवत्तापूर्ण स्वास्थ्य सेवा",
    selectRole: "अपनी भूमिका चुनें",
    email: "ईमेल",
    password: "पासवर्ड",
    login: "लॉगिन",
    welcome: "डिजिटल स्वास्थ्य सेवा में आपका स्वागत है"
  },
  pa: {
    title: "ਨਾਭਾ ਮੈਡੀਕਲ ਪਲੇਟਫਾਰਮ",
    subtitle: "ਸਾਰਿਆਂ ਲਈ ਗੁਣਵੱਤਾ ਸਿਹਤ ਸੇਵਾ",
    selectRole: "ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ",
    email: "ਈਮੇਲ",
    password: "ਪਾਸਵਰਡ",
    login: "ਲਾਗਇਨ",
    welcome: "ਡਿਜੀਟਲ ਸਿਹਤ ਸੇਵਾ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ"
  }
};

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[selectedLanguage as keyof typeof translations];
  const roleLabelsForLang = roleLabels[selectedLanguage as keyof typeof roleLabels];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    setIsLoading(true);
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    onLogin(selectedRole, selectedLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 medical-gradient rounded-full flex items-center justify-center medical-glow">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              {t.title}
            </h1>
          </div>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Language Selector */}
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        {/* Login Form */}
        <Card className="medical-shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{t.welcome}</CardTitle>
            <CardDescription>{t.selectRole}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label>{t.selectRole}</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole} required>
                  <SelectTrigger className="medical-shadow">
                    <SelectValue placeholder={t.selectRole} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleLabelsForLang).map(([role, label]) => {
                      const IconComponent = roleIcons[role as keyof typeof roleIcons];
                      return (
                        <SelectItem key={role} value={role}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="medical-shadow"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="medical-shadow"
                />
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full medical-gradient medical-glow spring-transition"
                disabled={isLoading || !selectedRole}
              >
                {isLoading ? "..." : t.login}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};