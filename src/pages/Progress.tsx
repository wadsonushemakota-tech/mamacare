import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Baby, Calendar, Heart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProgressPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Redirect doctors to dashboard
  useEffect(() => {
    if (isAuthenticated && user?.userType === "doctor") {
      navigate("/doctor-dashboard");
    }
  }, [isAuthenticated, user, navigate]);
  
  // Get data from user profile or use defaults
  const weeksPregnant = user?.weeksPregnant ? parseInt(user.weeksPregnant) : 24;
  const totalWeeks = 40;
  const progressPercentage = (weeksPregnant / totalWeeks) * 100;
  const trimester = weeksPregnant <= 13 ? 1 : weeksPregnant <= 26 ? 2 : 3;

  const milestones = [
    { week: 4, title: "Heart begins to beat", completed: weeksPregnant >= 4 },
    { week: 8, title: "All major organs developing", completed: weeksPregnant >= 8 },
    { week: 12, title: "Baby can make fists", completed: weeksPregnant >= 12 },
    { week: 16, title: "Baby's sex can be determined", completed: weeksPregnant >= 16 },
    { week: 20, title: "Halfway there!", completed: weeksPregnant >= 20 },
    { week: 24, title: "Baby's lungs developing", completed: weeksPregnant >= 24 },
    { week: 28, title: "Baby can open eyes", completed: weeksPregnant >= 28 },
    { week: 32, title: "Baby practicing breathing", completed: weeksPregnant >= 32 },
    { week: 36, title: "Baby is gaining weight", completed: weeksPregnant >= 36 },
    { week: 40, title: "Full term!", completed: weeksPregnant >= 40 },
  ];

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto p-12 text-center border-2">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary w-fit mx-auto mb-6">
              <Baby className="h-12 w-12 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Track Your Pregnancy Journey</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sign in to access your personalized pregnancy timeline and track your baby's development week by week.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
              onClick={() => navigate("/auth")}
            >
              Sign In to Continue
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">
              Your Pregnancy{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Progress
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Week {weeksPregnant} of {totalWeeks} - Trimester {trimester}
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="p-8 mb-8 border-2 hover:border-primary transition-all duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                    <Baby className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Week {weeksPregnant}</h3>
                    <p className="text-muted-foreground">
                      {trimester === 1 ? "First" : trimester === 2 ? "Second" : "Third"} Trimester
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{progressPercentage.toFixed(0)}%</p>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Started</span>
                <span>{totalWeeks - weeksPregnant} weeks remaining</span>
              </div>
            </div>
          </Card>

          {/* Current Week Info */}
          <Card className="p-8 mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <h3 className="text-2xl font-bold mb-4">This Week</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Baby className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Baby's Development</h4>
                  <p className="text-muted-foreground">
                    Your baby is about the size of a papaya and weighs around 1.3 pounds. 
                    Their lungs are developing rapidly and they're practicing breathing movements.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Your Body</h4>
                  <p className="text-muted-foreground">
                    You may be experiencing more energy in the second trimester. Stay active with 
                    prenatal exercises and maintain a healthy diet rich in iron and calcium.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Milestones */}
          <Card className="p-8 mb-8 border-2 hover:border-primary transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Pregnancy Milestones</h3>
            </div>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                    milestone.completed
                      ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20"
                      : "bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        milestone.completed
                          ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {milestone.week}
                    </div>
                    <div>
                      <p className={`font-semibold ${milestone.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {milestone.title}
                      </p>
                      <p className="text-sm text-muted-foreground">Week {milestone.week}</p>
                    </div>
                  </div>
                  {milestone.completed && (
                    <div className="text-primary font-semibold">✓</div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Appointments Reminder */}
          <Card className="p-8 border-2 hover:border-primary transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Upcoming Appointments</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Keep track of your prenatal appointments and important dates
            </p>
            <Button variant="outline" className="border-2 hover:border-primary transition-all duration-300">
              Add Appointment
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgressPage;
