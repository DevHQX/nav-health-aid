import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  MessageCircle, 
  Volume2, 
  Calendar,
  Clock,
  MapPin,
  Star,
  Phone
} from "lucide-react";

interface MainDashboardProps {
  language: string;
  userRole: string;
  onNavigate: (section: string) => void;
}

const translations = {
  en: {
    welcome: "Welcome to Digital Healthcare",
    subtitle: "Quality medical care at your fingertips",
    videoConsultancy: "Video Consultancy",
    videoDesc: "Connect with qualified doctors through video calls",
    chatbot: "Medical Chatbot",
    chatbotDesc: "Get instant answers to your health questions",
    recentActivity: "Recent Activity",
    upcomingAppointments: "Upcoming Appointments",
    quickActions: "Quick Actions",
    emergency: "Emergency Services",
    findDoctor: "Find a Doctor",
    bookAppointment: "Book Appointment",
    viewReports: "View Reports"
  },
  hi: {
    welcome: "डिजिटल स्वास्थ्य सेवा में आपका स्वागत है",
    subtitle: "आपकी उंगलियों पर गुणवत्तापूर्ण चिकित्सा देखभाल",
    videoConsultancy: "वीडियो परामर्श",
    videoDesc: "वीडियो कॉल के माध्यम से योग्य डॉक्टरों से जुड़ें",
    chatbot: "मेडिकल चैटबॉट",
    chatbotDesc: "अपने स्वास्थ्य प्रश्नों के तत्काल उत्तर प्राप्त करें",
    recentActivity: "हाल की गतिविधि",
    upcomingAppointments: "आगामी अपॉइंटमेंट",
    quickActions: "त्वरित क्रियाएं",
    emergency: "आपातकालीन सेवाएं",
    findDoctor: "डॉक्टर खोजें",
    bookAppointment: "अपॉइंटमेंट बुक करें",
    viewReports: "रिपोर्ट देखें"
  },
  pa: {
    welcome: "ਡਿਜੀਟਲ ਸਿਹਤ ਸੇਵਾ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
    subtitle: "ਤੁਹਾਡੀ ਉਂਗਲਾਂ 'ਤੇ ਗੁਣਵੱਤਾ ਮੈਡੀਕਲ ਦੇਖਭਾਲ",
    videoConsultancy: "ਵੀਡੀਓ ਸਲਾਹ-ਮਸ਼ਵਰਾ",
    videoDesc: "ਵੀਡੀਓ ਕਾਲਾਂ ਰਾਹੀਂ ਯੋਗ ਡਾਕਟਰਾਂ ਨਾਲ ਜੁੜੋ",
    chatbot: "ਮੈਡੀਕਲ ਚੈਟਬੋਟ",
    chatbotDesc: "ਆਪਣੇ ਸਿਹਤ ਸਵਾਲਾਂ ਦੇ ਤੁਰੰਤ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ",
    recentActivity: "ਹਾਲ ਦੀ ਗਤੀਵਿਧੀ",
    upcomingAppointments: "ਆਉਣ ਵਾਲੀਆਂ ਮੁਲਾਕਾਤਾਂ",
    quickActions: "ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ",
    emergency: "ਸੰਕਟਕਾਲੀਨ ਸੇਵਾਵਾਂ",
    findDoctor: "ਡਾਕਟਰ ਲੱਭੋ",
    bookAppointment: "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
    viewReports: "ਰਿਪੋਰਟਾਂ ਦੇਖੋ"
  }
};

export const MainDashboard = ({ language, userRole, onNavigate }: MainDashboardProps) => {
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<string | null>(null);
  
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

  // Mock upcoming appointment data
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      time: "Today, 3:00 PM",
      hospital: "Nabha Civil Hospital",
      type: "Video Call"
    },
    {
      id: 2,
      doctorName: "Dr. Priya Sharma", 
      specialty: "General Physician",
      time: "Tomorrow, 10:30 AM",
      hospital: "Nabha Medical Center",
      type: "In-Person"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          {t.welcome}
        </h2>
        <p className="text-muted-foreground text-lg">{t.subtitle}</p>
      </div>

      {/* Main Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Video Consultancy Card */}
        <Card className="medical-shadow-lg hover:medical-glow smooth-transition group cursor-pointer">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 medical-gradient rounded-full flex items-center justify-center mb-4 group-hover:scale-110 spring-transition">
              <Video className="h-8 w-8 text-white" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <CardTitle className="text-xl">{t.videoConsultancy}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  playText(t.videoConsultancy, 'video');
                }}
                className="h-8 w-8 hover:bg-primary/10"
                disabled={isPlayingSpeech === 'video'}
              >
                <Volume2 className={`h-4 w-4 ${isPlayingSpeech === 'video' ? 'pulse-ring' : ''}`} />
              </Button>
            </div>
            <CardDescription>{t.videoDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full medical-gradient medical-glow spring-transition"
              onClick={() => onNavigate('video-consultancy')}
            >
              <Video className="h-4 w-4 mr-2" />
              Start Video Consultation
            </Button>
          </CardContent>
        </Card>

        {/* Chatbot Card */}
        <Card className="medical-shadow-lg hover:medical-glow smooth-transition group cursor-pointer">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 health-gradient rounded-full flex items-center justify-center mb-4 group-hover:scale-110 spring-transition">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <CardTitle className="text-xl">{t.chatbot}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  playText(t.chatbot, 'chatbot');
                }}
                className="h-8 w-8 hover:bg-primary/10"
                disabled={isPlayingSpeech === 'chatbot'}
              >
                <Volume2 className={`h-4 w-4 ${isPlayingSpeech === 'chatbot' ? 'pulse-ring' : ''}`} />
              </Button>
            </div>
            <CardDescription>{t.chatbotDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline"
              className="w-full hover:bg-secondary/10 border-secondary text-secondary spring-transition"
              onClick={() => onNavigate('chatbot')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card className="medical-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>{t.upcomingAppointments}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => playText(t.upcomingAppointments, 'appointments')}
                className="h-8 w-8 hover:bg-primary/10"
                disabled={isPlayingSpeech === 'appointments'}
              >
                <Volume2 className={`h-4 w-4 ${isPlayingSpeech === 'appointments' ? 'pulse-ring' : ''}`} />
              </Button>
            </div>
            <Badge variant="secondary">{upcomingAppointments.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 smooth-transition">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{appointment.doctorName}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {appointment.hospital}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={appointment.type === 'Video Call' ? 'default' : 'secondary'}>
                    {appointment.type === 'Video Call' ? <Video className="h-3 w-3 mr-1" /> : <Phone className="h-3 w-3 mr-1" />}
                    {appointment.type}
                  </Badge>
                  <Button size="sm" variant="outline">Join</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: t.bookAppointment, action: 'book' },
          { icon: Star, label: t.findDoctor, action: 'doctors' },
          { icon: Phone, label: t.emergency, action: 'emergency' },
          { icon: MapPin, label: t.viewReports, action: 'reports' }
        ].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card key={index} className="p-4 text-center hover:medical-shadow-lg smooth-transition cursor-pointer group">
              <div className="mx-auto h-12 w-12 bg-gradient-accent rounded-full flex items-center justify-center mb-3 group-hover:scale-110 spring-transition">
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium">{item.label}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};