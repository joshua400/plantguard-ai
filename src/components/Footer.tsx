import { Link } from "react-router-dom";
import { Leaf, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">PlantGuardAI</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              AI-powered plant disease detection for healthier crops and sustainable agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-background text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/check-disease" className="text-background/70 hover:text-background text-sm transition-colors">
                  Check Disease
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-background text-sm transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Research Papers
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2024 PlantGuardAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-background/60 hover:text-background text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/60 hover:text-background text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
