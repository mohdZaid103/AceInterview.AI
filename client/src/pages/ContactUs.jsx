import React from "react";

function ContactUs() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <p className="text-slate-300 mb-4">
          If you have questions, feedback, or support requests,
          feel free to contact us.
        </p>

        <div className="space-y-3 text-slate-300">
          <p>Email: mohdzaid10309@gmail.com</p>
          <p>Platform: AceInterview.AI</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;