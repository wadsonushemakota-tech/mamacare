import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, BookOpen, Activity, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";
import img9 from "@/assets/9.jpg";
import img10 from "@/assets/10.jpg";
import img11 from "@/assets/11.jpg";
import img12 from "@/assets/12.jpg";
import wellnessImage from "@/assets/wellness-woman.jpg";
import nutritionImage from "@/assets/nutrition-woman.jpg";
import educationImage from "@/assets/education-woman.jpg";

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="inline-block animate-slide-in-left">Your Journey to</span>{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                  Motherhood
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive support, tracking, and resources for every step of your beautiful pregnancy journey.
              </p>
              <div className="flex gap-4">
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300">
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button size="lg" variant="outline" className="border-2 hover:border-primary transition-all duration-300">
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl animate-pulse" />
              <div className="relative rounded-3xl shadow-medium w-full h-[500px] overflow-hidden">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`African woman ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENACTUS NUST Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6 text-xl text-muted-foreground">
          <p className="text-justify">
            <span className="text-hot-pink">ENACTUS NUST</span> is a student-driven organization at the National University of Science and Technology that empowers young innovators to create sustainable entrepreneurial solutions for social, economic, and environmental challenges.
            It fosters leadership, creativity, and business acumen among students through real-world projects that transform lives and communities.
            The team applies entrepreneurial action to drive positive change, promote sustainability, and support local development.
            By combining innovation with impact, <span className="text-hot-pink">ENACTUS NUST</span> nurtures future leaders committed to inclusive growth.
            It connects students with industry mentors, competitions and global networks to expand their vision and skills.
            Ultimately, <span className="text-hot-pink">ENACTUS NUST</span> stands for social entrepreneurship that inspires progress and builds a better Zimbabwe for all.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-muted-foreground">Comprehensive tools and support for expectant mothers</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Activity,
              title: "Track Progress",
              description: "Monitor your pregnancy week by week with personalized insights",
              image: wellnessImage,
            },
            {
              icon: BookOpen,
              title: "Learn & Grow",
              description: "Access curated resources, videos, and expert guidance",
              image: educationImage,
            },
            {
              icon: Heart,
              title: "Daily Check-ins",
              description: "Log how you're feeling and track your wellness journey",
              image: nutritionImage,
            },
            {
              icon: Users,
              title: "Community Support",
              description: "Connect with other mothers and share experiences",
              image: wellnessImage,
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-medium cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary w-fit">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="relative overflow-hidden border-2 border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          <div className="relative p-12 text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to Begin?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of mothers tracking their pregnancy journey with Mama Care
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
