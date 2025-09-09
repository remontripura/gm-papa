"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { BounceLoader } from "react-spinners";
import React from "react";

interface LoadingButtonProps extends HTMLMotionProps<"button"> {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  children,
  className = "",
  ...props
}) => {
  const isDisabled = loading || props.disabled;

  return (
    <motion.button
      whileTap={{ scale: loading ? 1 : 0.9 }}
      className={`
        mt-0 w-fit px-5 py-2 rounded text-white font-medium transition-opacity flex justify-center items-center
        ${isDisabled ? "bg-red-700 cursor-not-allowed opacity-70" : "bg-primary hover:bg-primary-dark"}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <BounceLoader color="#ffffff" size={25} speedMultiplier={2} />
      ) : (
        children
      )}
    </motion.button>
  );
};
