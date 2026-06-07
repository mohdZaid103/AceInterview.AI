import React from "react";
import LegalLayout from "../components/LegalLayout";

function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">

      <p>
        AceInterview.AI respects your privacy and is committed to protecting
        your personal information.
      </p>

      <h2 className="text-xl font-semibold text-white">
        Information We Collect
      </h2>

      <ul className="list-disc ml-6 space-y-2">
        <li>Name and email address.</li>
        <li>Resume files uploaded by users.</li>
        <li>Interview responses and reports.</li>
        <li>Platform usage analytics.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white">
        How We Use Information
      </h2>

      <ul className="list-disc ml-6 space-y-2">
        <li>Generate AI interview questions.</li>
        <li>Create performance reports.</li>
        <li>Improve platform functionality.</li>
        <li>Provide customer support.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white">
        Data Security
      </h2>

      <p>
        We take reasonable measures to protect your information from
        unauthorized access or disclosure.
      </p>

      <h2 className="text-xl font-semibold text-white">
        Third Party Services
      </h2>

      <p>
        We may use services such as Google Authentication and Razorpay
        for authentication and payment processing.
      </p>

    </LegalLayout>
  );
}

export default PrivacyPolicy;