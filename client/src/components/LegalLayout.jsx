import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LegalLayout({ title, children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/")}
          className="mb-8 p-3 rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition"
        >
          <FaArrowLeft />
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-12 shadow-2xl">

          <h1 className="text-4xl font-bold text-white mb-8">
            {title}
          </h1>

          <div className="space-y-6 text-slate-300 leading-relaxed">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}

export default LegalLayout;