import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const type = searchParams.get("type");
  
  const userType = type === "doctor" ? "doctor" : "patient";
  
  // Show user type selection first if no type is specified
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(!type);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showTrimesterSelection, setShowTrimesterSelection] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userType: userType,
    weeksPregnant: "",
    dueDate: "",
    trimester: "",
    previousPregnancies: "",
    medicalConditions: "",
    allergies: "",
    emergencyContact: "",
    emergencyPhone: "",
    licenseNumber: "", // For doctors
    specialization: "", // For doctors
  });

  const calculateTrimester = (weeks: string): "first" | "second" | "third" => {
    const weeksNum = parseInt(weeks);
    if (weeksNum <= 13) return "first";
    if (weeksNum <= 27) return "second";
    return "third";
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify credentials here and get user data from API
    // For now, we'll use email prefix as name if name is not provided
    const emailPrefix = formData.email.split("@")[0];
    const displayName = formData.name || emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    const userData = {
      name: displayName,
      email: formData.email,
      userType: formData.userType as "patient" | "doctor",
      trimester: formData.weeksPregnant ? calculateTrimester(formData.weeksPregnant) : undefined,
      weeksPregnant: formData.weeksPregnant,
      dueDate: formData.dueDate,
    };
    
    login(userData);
    setWelcomeName(displayName);
    setShowWelcomeMessage(true);
    
    setTimeout(() => {
      setShowWelcomeMessage(false);
      if (formData.userType === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/daily-checkin");
      }
    }, 3000);
  };

  const handleSignUpBasic = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.userType === "doctor") {
      // For doctors, show questionnaire directly
      setShowQuestionnaire(true);
    } else {
      // For patients, show questionnaire
      setShowQuestionnaire(true);
    }
  };

  const handleCompleteSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.userType === "patient" && formData.weeksPregnant) {
      // Show trimester selection for patients
      setShowTrimesterSelection(true);
      return;
    }
    
    // Complete signup
    const trimester = formData.weeksPregnant ? calculateTrimester(formData.weeksPregnant) : undefined;
    const userData = {
      name: formData.name,
      email: formData.email,
      userType: formData.userType as "patient" | "doctor",
      trimester: trimester || formData.trimester as "first" | "second" | "third" | undefined,
      weeksPregnant: formData.weeksPregnant,
      dueDate: formData.dueDate,
      previousPregnancies: formData.previousPregnancies,
      medicalConditions: formData.medicalConditions,
      allergies: formData.allergies,
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,
      licenseNumber: formData.licenseNumber,
      specialization: formData.specialization,
    };
    
    login(userData);
    setWelcomeName(formData.name);
    setShowWelcomeMessage(true);
    
    setTimeout(() => {
      setShowWelcomeMessage(false);
      if (formData.userType === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/daily-checkin");
      }
    }, 3000);
  };

  const handleTrimesterSelect = (trimester: "first" | "second" | "third") => {
    setFormData({ ...formData, trimester });
    setShowTrimesterSelection(false);
    
    const userData = {
      name: formData.name,
      email: formData.email,
      userType: formData.userType as "patient" | "doctor",
      trimester: trimester,
      weeksPregnant: formData.weeksPregnant,
      dueDate: formData.dueDate,
      previousPregnancies: formData.previousPregnancies,
      medicalConditions: formData.medicalConditions,
      allergies: formData.allergies,
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,
    };
    
    login(userData);
    setWelcomeName(formData.name);
    setShowWelcomeMessage(true);
    
    setTimeout(() => {
      setShowWelcomeMessage(false);
      navigate("/daily-checkin");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Navbar />
      
      {/* Welcome Message Overlay */}
      {showWelcomeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card rounded-lg shadow-lg p-12 max-w-md mx-4 text-center animate-fade-in">
            <div className="mb-6">
              <Heart className="h-16 w-16 text-primary mx-auto animate-pulse" fill="currentColor" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in">
              Hie {welcomeName}, Welcome to Mama Care
            </h2>
          </div>
        </div>
      )}
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {showUserTypeSelection ? (
            <Card className="p-8 border-2 animate-fade-in">
              <div className="text-center mb-8">
                <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary w-fit mx-auto mb-4">
                  <Heart className="h-12 w-12 text-primary-foreground" fill="currentColor" />
                </div>
                <h1 className="text-4xl font-bold mb-2">Welcome to Mama Care</h1>
                <p className="text-muted-foreground">Please select your account type</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card 
                  className="p-8 cursor-pointer hover:border-primary transition-all border-2 text-center"
                  onClick={() => {
                    setFormData({ ...formData, userType: "patient" });
                    setShowUserTypeSelection(false);
                  }}
                >
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" fill="currentColor" />
                  <h3 className="text-2xl font-bold mb-2">I'm a Mama</h3>
                  <p className="text-muted-foreground">Track your pregnancy journey</p>
                </Card>
                <Card 
                  className="p-8 cursor-pointer hover:border-primary transition-all border-2 text-center"
                  onClick={() => {
                    setFormData({ ...formData, userType: "doctor" });
                    setShowUserTypeSelection(false);
                  }}
                >
                  <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">I'm a Doctor</h3>
                  <p className="text-muted-foreground">Provide care and support</p>
                </Card>
              </div>
            </Card>
          ) : !showQuestionnaire ? (
            <Card className="p-8 border-2 animate-fade-in">
              <div className="text-center mb-8">
                <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary w-fit mx-auto mb-4">
                  <Heart className="h-12 w-12 text-primary-foreground" fill="currentColor" />
                </div>
                <h1 className="text-4xl font-bold mb-2">Welcome to Mama Care</h1>
                <p className="text-muted-foreground">Your pregnancy journey starts here</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowUserTypeSelection(true)}
                >
                  Change Account Type
                </Button>
              </div>

              <Tabs defaultValue={mode === "signup" ? (formData.userType === "doctor" ? "doctor-signup" : "signup") : (formData.userType === "doctor" ? "doctor-signin" : "signin")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value={formData.userType === "doctor" ? "doctor-signin" : "signin"}>
                    {formData.userType === "doctor" ? "Doctor Sign In" : "Sign In"}
                  </TabsTrigger>
                  <TabsTrigger value={formData.userType === "doctor" ? "doctor-signup" : "signup"}>
                    {formData.userType === "doctor" ? "Doctor Sign Up" : "Sign Up"}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value={formData.userType === "doctor" ? "doctor-signin" : "signin"}>
                  <form onSubmit={handleSignIn} className="space-y-6">
                    {formData.userType === "doctor" ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="doctor-signin-email">Email</Label>
                          <Input
                            id="doctor-signin-email"
                            type="email"
                            placeholder="doctor.email@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="doctor-signin-password">Password</Label>
                          <Input
                            id="doctor-signin-password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
                        >
                          <Stethoscope className="h-4 w-4 mr-2" />
                          Doctor Sign In
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="signin-email">Email</Label>
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="your.email@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signin-password">Password</Label>
                          <Input
                            id="signin-password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
                        >
                          Sign In
                        </Button>
                      </>
                    )}
                  </form>
                </TabsContent>
                
                <TabsContent value={formData.userType === "doctor" ? "doctor-signup" : "signup"}>
                  <form onSubmit={handleSignUpBasic} className="space-y-6">
                    {formData.userType === "doctor" ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="doctor-signup-name">Full Name</Label>
                          <Input
                            id="doctor-signup-name"
                            type="text"
                            placeholder="Dr. Jane Smith"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="doctor-signup-email">Email</Label>
                          <Input
                            id="doctor-signup-email"
                            type="email"
                            placeholder="doctor.email@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="doctor-signup-password">Password</Label>
                          <Input
                            id="doctor-signup-password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
                        >
                          <Stethoscope className="h-4 w-4 mr-2" />
                          Continue to Professional Details
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="signup-name">Full Name</Label>
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="Jane Doe"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your.email@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
                        >
                          Continue to Pregnancy Details
                        </Button>
                      </>
                    )}
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          ) : showTrimesterSelection ? (
            <Card className="p-8 border-2 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Select Your Trimester</h2>
                <p className="text-muted-foreground">
                  This helps us provide trimester-specific information and resources
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card 
                  className="p-6 cursor-pointer hover:border-primary transition-all border-2"
                  onClick={() => handleTrimesterSelect("first")}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">First Trimester</h3>
                    <p className="text-muted-foreground mb-4">Weeks 1-13</p>
                    <p className="text-sm">Early pregnancy, morning sickness, fatigue</p>
                  </div>
                </Card>
                <Card 
                  className="p-6 cursor-pointer hover:border-primary transition-all border-2"
                  onClick={() => handleTrimesterSelect("second")}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Second Trimester</h3>
                    <p className="text-muted-foreground mb-4">Weeks 14-27</p>
                    <p className="text-sm">Energy returns, baby movements, growing bump</p>
                  </div>
                </Card>
                <Card 
                  className="p-6 cursor-pointer hover:border-primary transition-all border-2"
                  onClick={() => handleTrimesterSelect("third")}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Third Trimester</h3>
                    <p className="text-muted-foreground mb-4">Weeks 28-40+</p>
                    <p className="text-sm">Final preparations, nesting, labor preparation</p>
                  </div>
                </Card>
              </div>
            </Card>
          ) : (
            <Card className="p-8 border-2 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {formData.userType === "doctor" ? "Professional Information" : "Tell Us About Your Pregnancy"}
                </h2>
                <p className="text-muted-foreground">
                  {formData.userType === "doctor" 
                    ? "This helps us verify your credentials and connect you with patients"
                    : "This helps us personalize your experience and provide relevant information"}
                </p>
              </div>

              <form onSubmit={handleCompleteSignUp} className="space-y-6">
                {formData.userType === "doctor" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="license">Medical License Number</Label>
                      <Input
                        id="license"
                        type="text"
                        placeholder="Enter your medical license number"
                        required
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                      >
                        <SelectTrigger id="specialization">
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="obstetrics">Obstetrics</SelectItem>
                          <SelectItem value="gynecology">Gynecology</SelectItem>
                          <SelectItem value="obgyn">OB/GYN</SelectItem>
                          <SelectItem value="maternal-fetal">Maternal-Fetal Medicine</SelectItem>
                          <SelectItem value="midwifery">Midwifery</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="weeks">How many weeks pregnant are you?</Label>
                        <Select
                          value={formData.weeksPregnant}
                          onValueChange={(value) => setFormData({ ...formData, weeksPregnant: value })}
                        >
                          <SelectTrigger id="weeks">
                            <SelectValue placeholder="Select weeks" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 42 }, (_, i) => i + 1).map((week) => (
                              <SelectItem key={week} value={week.toString()}>
                                Week {week}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="due-date">Expected Due Date</Label>
                        <Input
                          id="due-date"
                          type="date"
                          required
                          value={formData.dueDate}
                          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="previous">Previous Pregnancies</Label>
                      <Select
                        value={formData.previousPregnancies}
                        onValueChange={(value) => setFormData({ ...formData, previousPregnancies: value })}
                      >
                        <SelectTrigger id="previous">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">This is my first</SelectItem>
                          <SelectItem value="1">1 previous pregnancy</SelectItem>
                          <SelectItem value="2">2 previous pregnancies</SelectItem>
                          <SelectItem value="3">3+ previous pregnancies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medical">Medical Conditions (if any)</Label>
                      <Textarea
                        id="medical"
                        placeholder="List any existing medical conditions..."
                        value={formData.medicalConditions}
                        onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies (if any)</Label>
                      <Input
                        id="allergies"
                        type="text"
                        placeholder="e.g., Peanuts, Penicillin"
                        value={formData.allergies}
                        onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="emergency-contact">Emergency Contact Name</Label>
                        <Input
                          id="emergency-contact"
                          type="text"
                          placeholder="Contact person"
                          required
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
                        <Input
                          id="emergency-phone"
                          type="tel"
                          placeholder="+263 XXX XXXX"
                          required
                          value={formData.emergencyPhone}
                          onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowQuestionnaire(false)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
                  >
                    Complete Sign Up
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Auth;
