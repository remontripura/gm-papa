"use client";

import GoogleLoginHandler from "@/components/GoogleLoginHandler/GoogleLoginHandler";
import { useState } from "react";

const VarifyAccountCompo = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isProcessing && (
        <p className="text-lg font-semibold text-gray-300 text-center">
          Verifying account...
        </p>
      )}
      <GoogleLoginHandler onProcessingChange={setIsProcessing} />
    </div>
  );
};

export default VarifyAccountCompo;
