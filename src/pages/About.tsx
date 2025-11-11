import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Heart, Target, Users, Award } from "lucide-react";
import educationImage from "@/assets/education-woman.jpg";

const About = () => {
  const [showDonate, setShowDonate] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"ecocash" | "bank">("ecocash");

  const ecocashNumber = "0777076575";
  const contactEmail = "official.nustenactus@gmail.com";

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Navbar />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Mama Care
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering expectant mothers with knowledge, support, and tools for a healthy pregnancy journey
            </p>
          </div>

          <div className="mb-16 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-2xl" />
            <img
              src={educationImage}
              alt="Pregnant woman reading"
              className="relative rounded-3xl shadow-medium w-full h-[400px] object-cover"
            />
          </div>

          <div className="space-y-8 mb-16">
            <Card className="p-8 border-2 hover:border-primary transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mama Care was created to provide comprehensive support to expectant mothers throughout their pregnancy journey. 
                We believe every woman deserves access to quality information, tracking tools, and a supportive community 
                during this transformative time in their lives.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {[
                  {
                    icon: Target,
                    title: "Progress Tracking",
                    description: "Monitor your pregnancy week by week with personalized insights and milestones"
                  },
                  {
                    icon: Heart,
                    title: "Daily Wellness",
                    description: "Track how you're feeling each day and receive personalized wellness tips"
                  },
                  {
                    icon: Users,
                    title: "Community Support",
                    description: "Connect with other mothers and share experiences in a safe, supportive environment"
                  },
                  {
                    icon: Award,
                    title: "Expert Resources",
                    description: "Access curated videos, articles, and expert guidance on pregnancy and motherhood"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary h-fit">
                      <item.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 border-2 hover:border-primary transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4">Our Partnership</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Mama Care is proudly developed by{" "}
                <span className="font-semibold text-primary">ENACTUS NUST</span>, 
                a student organization dedicated to creating social impact through entrepreneurial action.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In partnership with{" "}
                <span className="font-semibold text-secondary">Delta Beverages</span>, 
                we're committed to supporting maternal health and wellness in our community. Together, we're working 
                to ensure every expectant mother has the resources and support they need for a healthy pregnancy.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Empowerment",
                    description: "We believe in empowering women with knowledge and tools to make informed decisions about their health"
                  },
                  {
                    title: "Accessibility",
                    description: "Quality maternal care information should be accessible to everyone, regardless of background or location"
                  },
                  {
                    title: "Community",
                    description: "Building a supportive community where mothers can share, learn, and grow together"
                  },
                  {
                    title: "Excellence",
                    description: "Providing accurate, research-backed information and resources from trusted experts"
                  }
                ].map((value, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-lg mb-1">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Donate CTA section above footer */}
      <section className="container mx-auto px-4 pb-10">
        <Card className="p-6 border-2 border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">Support Mama Care</h3>
            <p className="text-muted-foreground">Donate any amount to help us reach more mothers. Choose Ecocash or Bank transfer, or contact us via email.</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary" onClick={() => setShowDonate(true)}>Donate</Button>
        </Card>
      </section>

      {/* Donate modal */}
      {showDonate && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDonate(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Card className="relative w-full max-w-xl p-6 border-2">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-xl font-semibold">Donate to ENACTUS NUST</h4>
                <button aria-label="Close" className="text-muted-foreground hover:text-foreground" onClick={() => setShowDonate(false)}>✕</button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount (USD or ZWL)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method</label>
                  <div className="flex gap-3">
                    <Button variant={method === "ecocash" ? "default" : "outline"} onClick={() => setMethod("ecocash")}>Ecocash</Button>
                    <Button variant={method === "bank" ? "default" : "outline"} onClick={() => setMethod("bank")}>Bank Account</Button>
                  </div>
                </div>
                {method === "ecocash" ? (
                  <div className="rounded-lg border p-4">
                    <p className="mb-2">
                      Send via <span className="font-semibold">Ecocash</span> to:
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-lg">{ecocashNumber}</p>
                        <p className="text-sm text-muted-foreground">Reference: Mama Care Donation</p>
                      </div>
                      <Button variant="outline" onClick={() => copyToClipboard(ecocashNumber)}>Copy</Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border p-4">
                    <p className="mb-2">
                      Bank transfer details are available on request.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Contact us to receive official bank account details.</p>
                        <a href={`mailto:${contactEmail}`} className="text-primary underline">{contactEmail}</a>
                      </div>
                      <Button variant="outline" onClick={() => copyToClipboard(contactEmail)}>Copy email</Button>
                    </div>
                  </div>
                )}

                <div className="rounded-lg border p-4">
                  <p className="mb-2">Prefer email? Reach out and we’ll assist:</p>
                  <div className="flex items-center justify-between">
                    <a href={`mailto:${contactEmail}`} className="text-primary underline">{contactEmail}</a>
                    <Button variant="outline" onClick={() => copyToClipboard(contactEmail)}>Copy email</Button>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowDonate(false)}>Close</Button>
                  <Button className="bg-gradient-to-r from-primary to-secondary" onClick={() => setShowDonate(false)}>Done</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default About;
