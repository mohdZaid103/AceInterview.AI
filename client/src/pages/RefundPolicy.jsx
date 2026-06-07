import React from "react";
import LegalLayout from "../components/LegalLayout";

function RefundPolicy() {
  return (
    <LegalLayout title="Refund Policy">

      <p>
        AceInterview.AI provides digital interview preparation services.
      </p>

      <h2 className="text-xl font-semibold text-white">
        Credit Purchases
      </h2>

      <p>
        Credits purchased on the platform are generally non-refundable
        once successfully added to a user's account.
      </p>

      <h2 className="text-xl font-semibold text-white">
        Failed Transactions
      </h2>

      <p>
        If payment is deducted but credits are not added due to a technical
        issue, users may contact support for assistance.
      </p>

      <h2 className="text-xl font-semibold text-white">
        Duplicate Payments
      </h2>

      <p>
        Duplicate or accidental payments may be reviewed individually and
        refunds may be issued where applicable.
      </p>

      <h2 className="text-xl font-semibold text-white">
        Policy Changes
      </h2>

      <p>
        AceInterview.AI reserves the right to update this policy at any time.
      </p>

    </LegalLayout>
  );
}

export default RefundPolicy;