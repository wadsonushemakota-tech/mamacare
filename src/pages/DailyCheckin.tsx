import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Smile, Meh, Frown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DailyCheckin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [checkinData, setCheckinData] = useState({
    mood: "",
    energyLevel: [5],
    symptoms: [] as string[],
    notes: "",
    waterIntake: [4],
    sleepHours: [7],
  });

  const moodOptions = [
    { value: "great", label: "Great", icon: Smile, color: "text-green-500" },
    { value: "good", label: "Good", icon: Smile, color: "text-primary" },
    { value: "okay", label: "Okay", icon: Meh, color: "text-yellow-500" },
    { value: "tired", label: "Tired", icon: Frown, color: "text-orange-500" },
    { value: "unwell", label: "Unwell", icon: Frown, color: "text-red-500" },
  ];

  const commonSymptoms = [
    "Nausea",
    "Back pain",
    "Headache",
    "Fatigue",
    "Heartburn",
    "Swelling",
    "Cramps",
    "Braxton Hicks",
  ];

  const handleSymptomToggle = (symptom: string) => {
    setCheckinData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Check-in saved!",
      description: "Your daily wellness data has been recorded.",
    });
    // Here you would save to your backend
    setTimeout(() => navigate("/progress"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary w-fit mx-auto mb-4">
              <Heart className="h-12 w-12 text-primary-foreground" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Daily{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Check-In
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              How are you feeling today?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Mood Selection */}
            <Card className="p-6 border-2 hover:border-primary transition-all duration-300">
              <Label className="text-lg font-semibold mb-4 block">Your Mood Today</Label>
              <div className="grid grid-cols-5 gap-3">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setCheckinData({ ...checkinData, mood: option.value })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                      checkinData.mood === option.value
                        ? "border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-medium"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <option.icon className={`h-8 w-8 ${checkinData.mood === option.value ? "text-primary" : option.color}`} />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Energy Level */}
            <Card className="p-6 border-2 hover:border-primary transition-all duration-300">
              <Label className="text-lg font-semibold mb-4 block">
                Energy Level: {checkinData.energyLevel[0]}/10
              </Label>
              <Slider
                value={checkinData.energyLevel}
                onValueChange={(value) => setCheckinData({ ...checkinData, energyLevel: value })}
                max={10}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </Card>

            {/* Symptoms */}
            <Card className="p-6 border-2 hover:border-primary transition-all duration-300">
              <Label className="text-lg font-semibold mb-4 block">Any Symptoms Today?</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      checked={checkinData.symptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomToggle(symptom)}
                    />
                    <label
                      htmlFor={symptom}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Water Intake */}
            <Card className="p-6 border-2 hover:border-primary transition-all duration-300">
              <Label className="text-lg font-semibold mb-4 block">
                Water Intake: {checkinData.waterIntake[0]} glasses
              </Label>
              <Slider
                value={checkinData.waterIntake}
                onValueChange={(value) => setCheckinData({ ...checkinData, waterIntake: value })}
                max={12}
                step={1}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Recommended: 8-10 glasses per day
              </p>
            </Card>

            {/* Sleep Hours */}
            <Card className="p-6 border-2 hover:border-primary transition-all duration-300">
              <Label className="text-lg font-semibold mb-4 block">
                Sleep Last Night: {checkinData.sleepHours[0]} hours
              </Label>
              <Slider
                value={checkinData.sleepHours}
                onValueChange={(value) => setCheckinData({ ...checkinData, sleepHours: value })}
                max={12}
                step={0.5}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Recommended: 7-9 hours per night
              </p>
            </Card>

            {/* Additional Notes */}
            <Card className="p-6 border-2 hover:border-primary transition-all duration-300">
              <Label htmlFor="notes" className="text-lg font-semibold mb-4 block">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any other thoughts or concerns you'd like to track today..."
                value={checkinData.notes}
                onChange={(e) => setCheckinData({ ...checkinData, notes: e.target.value })}
                rows={4}
              />
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
            >
              Save Check-In
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DailyCheckin;
