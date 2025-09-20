import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Volume2, 
  Star, 
  MapPin, 
  Clock, 
  Calendar,
  Video,
  Phone,
  Award,
  User
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  hospital: string;
  distance: string;
  rating: number;
  availability: string[];
  consultationFee: number;
  image?: string;
}

interface DoctorSelectorProps {
  symptom: string;
  language: string;
  onDoctorSelect: (doctor: Doctor, timeSlot: string) => void;
  onBack: () => void;
}

// Mock doctor data for Nabha, Punjab
const doctorsBySymptom = {
  fever: [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      specialty: "General Physician",
      experience: 8,
      hospital: "Nabha Civil Hospital",
      distance: "1.2 km",
      rating: 4.7,
      availability: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
      consultationFee: 300
    },
    {
      id: "2", 
      name: "Dr. Priya Sharma",
      specialty: "Internal Medicine",
      experience: 12,
      hospital: "Nabha Medical Center",
      distance: "2.1 km",
      rating: 4.9,
      availability: ["10:00 AM", "1:00 PM", "3:30 PM"],
      consultationFee: 500
    }
  ],
  chest: [
    {
      id: "3",
      name: "Dr. Amarjit Singh",
      specialty: "Cardiologist", 
      experience: 15,
      hospital: "Nabha Heart Institute",
      distance: "1.8 km",
      rating: 4.8,
      availability: ["11:00 AM", "3:00 PM", "5:00 PM"],
      consultationFee: 800
    }
  ],
  joint: [
    {
      id: "4",
      name: "Dr. Simran Kaur",
      specialty: "Orthopedic",
      experience: 10,
      hospital: "Nabha Bone & Joint Clinic",
      distance: "1.5 km", 
      rating: 4.6,
      availability: ["9:30 AM", "12:00 PM", "4:00 PM"],
      consultationFee: 600
    }
  ],
  general: [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      specialty: "General Physician",
      experience: 8,
      hospital: "Nabha Civil Hospital",
      distance: "1.2 km",
      rating: 4.7,
      availability: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
      consultationFee: 300
    }
  ]
};

const translations = {
  en: {
    availableDoctors: "Available Doctors",
    selectDoctor: "Select a doctor and time slot",
    experience: "years experience",
    rating: "Rating",
    consultationFee: "Consultation Fee",
    availableSlots: "Available Today",
    bookNow: "Book Now",
    videoCall: "Video Call",
    audioCall: "Audio Call",
    back: "Back to Symptoms"
  },
  hi: {
    availableDoctors: "उपलब्ध डॉक्टर",
    selectDoctor: "एक डॉक्टर और समय स्लॉट चुनें",
    experience: "वर्ष का अनुभव",
    rating: "रेटिंग",
    consultationFee: "परामर्श शुल्क",
    availableSlots: "आज उपलब्ध",
    bookNow: "अभी बुक करें",
    videoCall: "वीडियो कॉल",
    audioCall: "ऑडियो कॉल",
    back: "लक्षणों पर वापस जाएं"
  },
  pa: {
    availableDoctors: "ਉਪਲਬਧ ਡਾਕਟਰ",
    selectDoctor: "ਇੱਕ ਡਾਕਟਰ ਅਤੇ ਸਮਾਂ ਸਲਾਟ ਚੁਣੋ",
    experience: "ਸਾਲ ਦਾ ਤਜਰਬਾ",
    rating: "ਰੇਟਿੰਗ",
    consultationFee: "ਸਲਾਹ-ਮਸ਼ਵਰਾ ਫੀਸ",
    availableSlots: "ਅੱਜ ਉਪਲਬਧ",
    bookNow: "ਹੁਣੇ ਬੁੱਕ ਕਰੋ",
    videoCall: "ਵੀਡੀਓ ਕਾਲ",
    audioCall: "ਆਡੀਓ ਕਾਲ",
    back: "ਲੱਛਣਾਂ 'ਤੇ ਵਾਪਸ ਜਾਓ"
  }
};

export const DoctorSelector = ({ symptom, language, onDoctorSelect, onBack }: DoctorSelectorProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<string | null>(null);
  
  const t = translations[language as keyof typeof translations];
  const doctors = doctorsBySymptom[symptom as keyof typeof doctorsBySymptom] || doctorsBySymptom.general;

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

  const handleBooking = () => {
    if (selectedDoctor && selectedSlot) {
      onDoctorSelect(selectedDoctor, selectedSlot);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{t.availableDoctors}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => playText(t.availableDoctors, 'title')}
            className="hover:bg-primary/10"
            disabled={isPlayingSpeech === 'title'}
          >
            <Volume2 className={`h-5 w-5 ${isPlayingSpeech === 'title' ? 'pulse-ring' : ''}`} />
          </Button>
        </div>
        <Button variant="outline" onClick={onBack}>
          {t.back}
        </Button>
      </div>

      <p className="text-muted-foreground">{t.selectDoctor}</p>

      {/* Doctors List */}
      <div className="grid gap-6 lg:grid-cols-2">
        {doctors.map((doctor) => (
          <Card 
            key={doctor.id} 
            className={`medical-shadow hover:medical-shadow-lg smooth-transition cursor-pointer ${
              selectedDoctor?.id === doctor.id ? 'border-primary bg-primary/5 medical-glow' : ''
            }`}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        playText(doctor.name, `doctor-${doctor.id}`);
                      }}
                      className="h-6 w-6 hover:bg-primary/10"
                      disabled={isPlayingSpeech === `doctor-${doctor.id}`}
                    >
                      <Volume2 className={`h-3 w-3 ${isPlayingSpeech === `doctor-${doctor.id}` ? 'pulse-ring' : ''}`} />
                    </Button>
                  </div>
                  <CardDescription className="mb-2">{doctor.specialty}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {doctor.experience} {t.experience}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {doctor.rating}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {doctor.hospital} • {doctor.distance}
                </div>
                <div className="font-medium">
                  ₹{doctor.consultationFee}
                </div>
              </div>

              {selectedDoctor?.id === doctor.id && (
                <div className="space-y-3 pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{t.availableSlots}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {doctor.availability.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedSlot === slot ? "default" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSlot(slot);
                        }}
                        className={selectedSlot === slot ? "medical-gradient" : ""}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                  
                  {selectedSlot && (
                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={handleBooking}
                        className="flex-1 medical-gradient medical-glow"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {t.bookNow}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleBooking}
                        className="hover:bg-secondary/10"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};