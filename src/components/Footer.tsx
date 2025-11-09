import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Music2 } from "lucide-react"; // Using Music2 as TikTok icon alternative
import enactusBanner from "@/assets/enactus-banner.jpg";

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat border-t border-border mt-20"
      style={{ backgroundImage: `url(${enactusBanner})` }}
    >
      <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75" /> {/* Overlay for readability */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-dark-black hover:text-hot-pink mb-4">About Us</h3>
            <p className="text-dark-black text-base font-bold leading-relaxed">
              Supporting expectant mothers through their beautiful journey with comprehensive resources, tracking tools, and community support.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-dark-black hover:text-hot-pink mb-4">Contact Us</h3>
            <div className="space-y-2 text-base font-bold text-dark-black">
              <p>Email: <a href="mailto:official.nust@enactus.org">official.nust@enactus.org</a></p>
              <p>Phone: <a href="tel:+263780212542">+263 78 021 2542</a></p>
                <p>Address: <a href="https://maps.google.com/?cid=419366781408329031&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ" target="_blank" rel="noopener noreferrer">NUST Campus, Bulawayo, Zimbabwe</a></p>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold text-dark-black hover:text-hot-pink mb-4">Follow ENACTUS NUST</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/enactusnust"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@enactusnust"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <Music2 className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/enactus-nust"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/enactusnust"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-dark-black">
            <p className="font-bold">© {new Date().getFullYear()} Mama Care. All rights reserved.</p>
            <p className="text-center md:text-right font-bold">
              Developed by{" "}
              <span className="font-semibold text-dark-black">ENACTUS NUST</span>{" "}
              in partnership with{" "}
              <span className="font-semibold text-dark-black">Delta Beverages</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
