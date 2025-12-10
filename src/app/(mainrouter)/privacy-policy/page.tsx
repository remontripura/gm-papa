import config from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Privacy | ${config.appName}`,
};
const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-sm text-white">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-2">
        At <strong>{config.appName}</strong>, we are committed
        to protecting your personal information and your right to privacy. This
        Privacy Policy explains how we collect, use, and safeguard your data
        when you use our website or services.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Personal details like name, phone number, email, etc.</li>
        <li>Transaction information when you purchase packages.</li>
        <li>Device and usage information for service improvement.</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside space-y-1">
        <li>To deliver gaming/social packages to you.</li>
        <li>To process your payments securely.</li>
        <li>To provide customer support and resolve issues.</li>
        <li>To send important updates or promotional offers (if opted in).</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        3. Sharing Your Information
      </h2>
      <p className="mb-2">
        We do not share your personal information with third parties, except
        when required by law or for secure payment processing.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-2">
        We use modern technologies to ensure your data is stored securely and
        protected against unauthorized access.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">5. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at: <strong>support@freefirebd.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
