import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Heart, Target, Users, Award } from "lucide-react";
import educationImage from "@/assets/education-woman.jpg";

const About = () => {
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

      <Footer />
    </div>
  );
};

export default About;
