import { useState } from "react";
import { SymptomSelector } from "./symptom-selector";
import { DoctorSelector } from "./doctor-selector";
import { BookingConfirmation } from "./booking-confirmation";

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

interface VideoConsultancyFlowProps {
  language: string;
  onNavigate: (section: string) => void;
}

type FlowStep = "symptoms" | "doctors" | "confirmation";

export const VideoConsultancyFlow = ({ language, onNavigate }: VideoConsultancyFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("symptoms");
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const handleSymptomSelect = (symptom: string) => {
    setSelectedSymptom(symptom);
    setCurrentStep("doctors");
  };

  const handleDoctorSelect = (doctor: Doctor, timeSlot: string) => {
    setSelectedDoctor(doctor);
    setSelectedTimeSlot(timeSlot);
    setCurrentStep("confirmation");
  };

  const handleBackToSymptoms = () => {
    setCurrentStep("symptoms");
    setSelectedSymptom("");
  };

  const handleViewAppointments = () => {
    onNavigate("consultations");
  };

  const handleBookAnother = () => {
    setCurrentStep("symptoms");
    setSelectedSymptom("");
    setSelectedDoctor(null);
    setSelectedTimeSlot("");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {currentStep === "symptoms" && (
        <SymptomSelector 
          language={language}
          onSymptomSelect={handleSymptomSelect}
        />
      )}

      {currentStep === "doctors" && (
        <DoctorSelector
          symptom={selectedSymptom}
          language={language}
          onDoctorSelect={handleDoctorSelect}
          onBack={handleBackToSymptoms}
        />
      )}

      {currentStep === "confirmation" && selectedDoctor && (
        <BookingConfirmation
          doctor={selectedDoctor}
          timeSlot={selectedTimeSlot}
          language={language}
          onViewAppointments={handleViewAppointments}
          onBookAnother={handleBookAnother}
        />
      )}
    </div>
  );
};