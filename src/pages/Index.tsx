import { useState } from "react";
import { LoginForm } from "@/components/login/login-form";
import { Header } from "@/components/dashboard/header";
import { MainDashboard } from "@/components/dashboard/main-dashboard";
import { VideoConsultancyFlow } from "@/components/video-consultancy/video-consultancy-flow";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentSection, setCurrentSection] = useState("home");

  const handleLogin = (role: string, language: string) => {
    setUserRole(role);
    setSelectedLanguage(language);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setCurrentSection("home");
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header 
        userRole={userRole}
        language={selectedLanguage}
        onNavigate={handleNavigate}
        currentSection={currentSection}
        onLogout={handleLogout}
      />
      
      <main>
        {currentSection === "home" && (
          <MainDashboard 
            language={selectedLanguage}
            userRole={userRole}
            onNavigate={handleNavigate}
          />
        )}
        
        {currentSection === "consultations" && (
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Past Consultations</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )}
        
        {currentSection === "medicine" && (
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Medicine Availability</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )}
        
        {currentSection === "history" && (
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Patient History & Credentials</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )}
        
        {currentSection === "video-consultancy" && (
          <VideoConsultancyFlow 
            language={selectedLanguage}
            onNavigate={handleNavigate}
          />
        )}
        
        {currentSection === "chatbot" && (
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Medical Chatbot</h2>
            <p className="text-muted-foreground">Chatbot interface coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
