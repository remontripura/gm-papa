import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms And Conditions | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "the most trusted shop",
};
const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-sm text-white">
      <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>

      <p className="mb-2">
        These Terms and Conditions govern your use of the{" "}
        <strong>{process.env.NEXT_PUBLIC_APP_NAME}</strong> platform and its
        services. By accessing or using our services, you agree to be bound by
        these terms.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        1. Service Description
      </h2>
      <p className="mb-2">
        {process.env.NEXT_PUBLIC_APP_NAME} provides digital gaming and social
        packages such as internet offers for Emo, YouTube, PUBG, FreeFireBD, and
        other platforms.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        2. User Responsibilities
      </h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Provide accurate information during registration or checkout.</li>
        <li>Do not misuse the service for illegal or fraudulent activities.</li>
        <li>Comply with local laws and telecom regulations.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2">3. Refund Policy</h2>
      <p className="mb-2">
        Once a package is purchased and activated, it is non-refundable. Please
        check your order carefully before payment.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">4. Modifications</h2>
      <p className="mb-2">
        We reserve the right to modify or discontinue the service (or any part
        thereof) without notice at any time.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">5. Contact</h2>
      <p>
        For any concerns, please reach out to our support team at:{" "}
        <strong>support@freefirebd.com</strong>
      </p>
    </div>
  );
};

export default TermsAndConditions;
