import React from "react";
import { BsRobot } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl px-8 py-12 text-center">
          {/* Glow Effects */}
          <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

          {/* Logo */}
          <div className="relative flex justify-center items-center gap-3 mb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg">
              <BsRobot size={22} />
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">
              AceInterview.AI
            </h2>
          </div>

          {/* Description */}
          <p className="relative text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Prepare smarter with AI-powered mock interviews, personalized
            feedback, performance analytics, and confidence-building practice
            sessions designed to help you crack your dream job.
          </p>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

          {/* Bottom Text */}
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AceInterview.AI. Built for aspiring
            professionals and future innovators.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-slate-400">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms</Link>
          <Link to="/refund-policy">Refund Policy</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
