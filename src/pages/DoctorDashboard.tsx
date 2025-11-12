import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, FileText, Calendar, TrendingUp, Stethoscope } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: string;
  name: string;
  email: string;
  weeksPregnant: number;
  trimester: "first" | "second" | "third";
  dueDate: string;
  lastCheckin: string;
  progress: number;
}

const DoctorDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.userType !== "doctor") {
      navigate("/auth");
      return;
    }

    // In a real app, fetch from backend
    // For now, use sample data from localStorage
    const allUsers = JSON.parse(localStorage.getItem("allPatients") || "[]");
    setPatients(allUsers.filter((u: any) => u.userType === "patient"));
  }, [isAuthenticated, user, navigate]);

  const totalPatients = patients.length;
  const firstTrimester = patients.filter(p => p.trimester === "first").length;
  const secondTrimester = patients.filter(p => p.trimester === "second").length;
  const thirdTrimester = patients.filter(p => p.trimester === "third").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">
              Doctor{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Monitor and support your patients' pregnancy journeys
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-2 hover:border-primary transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Patients</p>
                  <p className="text-3xl font-bold">{totalPatients}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </Card>
            <Card className="p-6 border-2 hover:border-primary transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">First Trimester</p>
                  <p className="text-3xl font-bold text-primary">{firstTrimester}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </Card>
            <Card className="p-6 border-2 hover:border-primary transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Second Trimester</p>
                  <p className="text-3xl font-bold text-secondary">{secondTrimester}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
            </Card>
            <Card className="p-6 border-2 hover:border-primary transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Third Trimester</p>
                  <p className="text-3xl font-bold text-primary">{thirdTrimester}</p>
                </div>
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
            </Card>
          </div>

          {/* Patients List */}
          <Card className="p-8 border-2">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Patient Progress Reports</h2>
            </div>
            
            {patients.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">No patients registered yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Patients will appear here once they sign up
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {patients.map((patient) => (
                  <Card
                    key={patient.id}
                    className="p-6 border-2 hover:border-primary transition-all cursor-pointer"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{patient.name}</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{patient.email}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Week</p>
                            <p className="font-medium">Week {patient.weeksPregnant}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Trimester</p>
                            <p className="font-medium capitalize">{patient.trimester}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{patient.progress}%</span>
                          </div>
                          <Progress value={patient.progress} className="h-2" />
                        </div>
                      </div>
                      <FileText className="h-6 w-6 text-primary ml-4" />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>

          {/* Patient Detail Modal */}
          {selectedPatient && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <Card className="max-w-2xl w-full mx-4 p-8 border-2">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedPatient.name}</h2>
                    <p className="text-muted-foreground">{selectedPatient.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPatient(null)}
                  >
                    Close
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Weeks Pregnant</p>
                      <p className="text-lg font-semibold">Week {selectedPatient.weeksPregnant}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Trimester</p>
                      <p className="text-lg font-semibold capitalize">{selectedPatient.trimester}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                      <p className="text-lg font-semibold">{selectedPatient.dueDate || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Last Check-in</p>
                      <p className="text-lg font-semibold">{selectedPatient.lastCheckin || "No check-ins yet"}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{selectedPatient.progress}%</span>
                    </div>
                    <Progress value={selectedPatient.progress} className="h-3" />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorDashboard;

