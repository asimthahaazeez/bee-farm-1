import { Heart, Github, Twitter, Mail } from "lucide-react";
import beeMascot from "@/assets/bee-mascot.png";

const Footer = () => {
  return (
    <footer className="bg-dark-brown text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={beeMascot} 
                alt="BeeWise Logo" 
                className="w-8 h-8"
              />
              <span className="text-2xl font-bold text-honey">BeeWise</span>
            </div>
            <p className="text-sm text-cream/80 max-w-sm">
              AI-powered beekeeping insights that help you make the right decisions at the right time.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 hexagon bg-honey/20 flex items-center justify-center hover:bg-honey/30 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4 text-honey" />
              </div>
              <div className="w-8 h-8 hexagon bg-honey/20 flex items-center justify-center hover:bg-honey/30 transition-colors cursor-pointer">
                <Github className="w-4 h-4 text-honey" />
              </div>
              <div className="w-8 h-8 hexagon bg-honey/20 flex items-center justify-center hover:bg-honey/30 transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-honey" />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-honey">Features</h3>
            <ul className="space-y-2 text-sm text-cream/80">
              <li className="hover:text-honey transition-colors cursor-pointer">Weather Forecasting</li>
              <li className="hover:text-honey transition-colors cursor-pointer">Hive Management</li>
              <li className="hover:text-honey transition-colors cursor-pointer">AI Insights</li>
              <li className="hover:text-honey transition-colors cursor-pointer">Inspection Logs</li>
              <li className="hover:text-honey transition-colors cursor-pointer">Mobile App</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-honey">Resources</h3>
            <ul className="space-y-2 text-sm text-cream/80">
              <li className="hover:text-honey transition-colors cursor-pointer">Getting Started</li>
              <li className="hover:text-honey transition-colors cursor-pointer">User Guide</li>
              <li className="hover:text-honey transition-colors cursor-pointer">API Documentation</li>
              <li className="hover:text-honey transition-colors cursor-pointer">Support Center</li>
              <li className="hover:text-honey transition-colors cursor-pointer">Community</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-honey">Contact</h3>
            <ul className="space-y-2 text-sm text-cream/80">
              <li>hello@beewise.app</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
            <div className="pt-4">
              <p className="text-xs text-cream/60">
                Get updates about new features and beekeeping tips
              </p>
              <div className="flex gap-2 mt-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-honey"
                />
                <button className="px-4 py-2 bg-honey text-dark-brown text-sm font-medium rounded-lg hover:bg-honey-dark transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cream/60">
            © 2024 BeeWise. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-cream/60">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-honey fill-current" />
            <span>for beekeepers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;