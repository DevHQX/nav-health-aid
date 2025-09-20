import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  User,
  Phone,
  Volume2,
  Bell
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
}

interface BookingConfirmationProps {
  doctor: Doctor;
  timeSlot: string;
  language: string;
  onViewAppointments: () => void;
  onBookAnother: () => void;
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  time: string;
  date: string;
  hospital: string;
  type: "Video Call" | "In-Person";
  status: "Upcoming" | "Completed" | "Cancelled";
}

const translations = {
  en: {
    bookingConfirmed: "Booking Confirmed!",
    appointmentBooked: "Your appointment has been successfully booked",
    appointmentDetails: "Appointment Details",
    upcomingAppointments: "Your Upcoming Appointments",
    viewAllAppointments: "View All Appointments",
    bookAnotherConsultation: "Book Another Consultation",
    joinCall: "Join Video Call",
    callDoctor: "Call Doctor",
    reschedule: "Reschedule",
    cancel: "Cancel",
    today: "Today",
    tomorrow: "Tomorrow",
    videoCall: "Video Call",
    inPerson: "In-Person"
  },
  hi: {
    bookingConfirmed: "बुकिंग की पुष्टि हो गई!",
    appointmentBooked: "आपकी अपॉइंटमेंट सफलतापूर्वक बुक हो गई है",
    appointmentDetails: "अपॉइंटमेंट विवरण",
    upcomingAppointments: "आपकी आगामी अपॉइंटमेंट्स",
    viewAllAppointments: "सभी अपॉइंटमेंट्स देखें",
    bookAnotherConsultation: "अन्य परामर्श बुक करें",
    joinCall: "वीडियो कॉल में शामिल हों",
    callDoctor: "डॉक्टर को कॉल करें",
    reschedule: "पुनर्निर्धारण",
    cancel: "रद्द करें",
    today: "आज",
    tomorrow: "कल",
    videoCall: "वीडियो कॉल",
    inPerson: "व्यक्तिगत"
  },
  pa: {
    bookingConfirmed: "ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਹੋ ਗਈ!",
    appointmentBooked: "ਤੁਹਾਡੀ ਮੁਲਾਕਾਤ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਹੋ ਗਈ ਹੈ",
    appointmentDetails: "ਮੁਲਾਕਾਤ ਦੇ ਵੇਰਵੇ",
    upcomingAppointments: "ਤੁਹਾਡੀਆਂ ਆਉਣ ਵਾਲੀਆਂ ਮੁਲਾਕਾਤਾਂ",
    viewAllAppointments: "ਸਾਰੀਆਂ ਮੁਲਾਕਾਤਾਂ ਦੇਖੋ",
    bookAnotherConsultation: "ਹੋਰ ਸਲਾਹ-ਮਸ਼ਵਰਾ ਬੁੱਕ ਕਰੋ",
    joinCall: "ਵੀਡੀਓ ਕਾਲ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    callDoctor: "ਡਾਕਟਰ ਨੂੰ ਕਾਲ ਕਰੋ",
    reschedule: "ਮੁੜ ਨਿਰਧਾਰਿਤ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    today: "ਅੱਜ",
    tomorrow: "ਕੱਲ੍ਹ",
    videoCall: "ਵੀਡੀਓ ਕਾਲ",
    inPerson: "ਵਿਅਕਤੀਗਤ"
  }
};

export const BookingConfirmation = ({ 
  doctor, 
  timeSlot, 
  language, 
  onViewAppointments, 
  onBookAnother 
}: BookingConfirmationProps) => {
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    // Add the new appointment and load existing ones
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorName: doctor.name,
      specialty: doctor.specialty,
      time: timeSlot,
      date: "Today",
      hospital: doctor.hospital,
      type: "Video Call",
      status: "Upcoming"
    };

    // Mock existing appointments
    const existingAppointments: Appointment[] = [
      {
        id: "2",
        doctorName: "Dr. Priya Sharma",
        specialty: "General Physician", 
        time: "10:30 AM",
        date: "Tomorrow",
        hospital: "Nabha Medical Center",
        type: "In-Person",
        status: "Upcoming"
      },
      {
        id: "3",
        doctorName: "Dr. Amarjit Singh",
        specialty: "Cardiologist",
        time: "2:00 PM", 
        date: "Dec 25",
        hospital: "Nabha Heart Institute",
        type: "Video Call",
        status: "Upcoming"
      }
    ];

    setAppointments([newAppointment, ...existingAppointments]);
  }, [doctor, timeSlot]);

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

  const formatTime = (date: string) => {
    if (date === "Today") return t.today;
    if (date === "Tomorrow") return t.tomorrow;
    return date;
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Success Message */}
      <Card className="medical-shadow-lg border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-2xl text-green-800">{t.bookingConfirmed}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => playText(t.bookingConfirmed, 'title')}
              className="hover:bg-green-100"
              disabled={isPlayingSpeech === 'title'}
            >
              <Volume2 className={`h-5 w-5 text-green-600 ${isPlayingSpeech === 'title' ? 'pulse-ring' : ''}`} />
            </Button>
          </div>
          <CardDescription className="text-green-700">{t.appointmentBooked}</CardDescription>
        </CardHeader>
      </Card>

      {/* Appointment Details */}
      <Card className="medical-shadow">
        <CardHeader>
          <CardTitle>{t.appointmentDetails}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-medium">{doctor.name}</h4>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Today</p>
                <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{timeSlot}</p>
                <p className="text-xs text-muted-foreground">Video consultation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{doctor.hospital}</p>
                <p className="text-xs text-muted-foreground">{doctor.distance} away</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1 medical-gradient medical-glow">
              <Video className="h-4 w-4 mr-2" />
              {t.joinCall} (at {timeSlot})
            </Button>
            <Button variant="outline" className="hover:bg-secondary/10">
              <Phone className="h-4 w-4 mr-2" />
              {t.callDoctor}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="medical-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>{t.upcomingAppointments}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => playText(t.upcomingAppointments, 'upcoming')}
                className="h-8 w-8 hover:bg-primary/10"
                disabled={isPlayingSpeech === 'upcoming'}
              >
                <Volume2 className={`h-4 w-4 ${isPlayingSpeech === 'upcoming' ? 'pulse-ring' : ''}`} />
              </Button>
            </div>
            <Badge variant="secondary">{appointments.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.slice(0, 3).map((appointment, index) => (
              <div 
                key={appointment.id} 
                className={`flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 smooth-transition ${
                  index === 0 ? 'border-primary bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    index === 0 ? 'medical-gradient' : 'bg-gradient-secondary'
                  }`}>
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{appointment.doctorName}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(appointment.date)}, {appointment.time}
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
                    {appointment.type === 'Video Call' ? t.videoCall : t.inPerson}
                  </Badge>
                  {index === 0 && (
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      <Bell className="h-3 w-3 mr-1" />
                      New
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onViewAppointments}
            >
              {t.viewAllAppointments}
            </Button>
            <Button 
              className="flex-1 medical-gradient"
              onClick={onBookAnother}
            >
              {t.bookAnotherConsultation}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};