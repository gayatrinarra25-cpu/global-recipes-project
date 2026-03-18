import React from 'react';
import { ChefHat, Heart, Github, Twitter, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid grid md:grid-cols-2 lg:grid-cols-4 gap-lg">

          <div className="footer-brand flex-col gap-sm">
            <div className="logo flex items-center gap-xs">
              <ChefHat size={28} className="logo-icon" />
              <span className="logo-text text-gradient">GlobalBites</span>
            </div>
            <p className="footer-desc">
              Discover the world's most delicious recipes, bringing global cuisines right to your kitchen.
            </p>
          </div>

          <div className="footer-links flex-col gap-sm">
            <h3>Quick Links</h3>
            <ul className="flex-col gap-xs">
              <li><a href="/">Home</a></li>
              <li><a href="/search?q=">All Recipes</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Surprise Me</a></li>
            </ul>
          </div>

          <div className="footer-links flex-col gap-sm">
            <h3>Legal</h3>
            <ul className="flex-col gap-xs">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>

          <div className="footer-social flex-col gap-sm">
            <h3>Connect</h3>
            <div className="social-icons flex gap-sm">
              <a href="#" className="social-icon"><Twitter size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Github size={20} /></a>
            </div>
            <p className="made-with flex items-center gap-xs mt-sm">
              Made with <Heart size={16} className="heart-icon fill-current" /> by Team GlobalBites
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GlobalBites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
