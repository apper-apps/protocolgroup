import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const TabButton = ({ 
  active = false, 
  onClick, 
  children, 
  className,
  ...props 
}) => {
  const baseStyles = "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";
  
  const activeStyles = active 
    ? "bg-primary-600 text-white shadow-md" 
    : "bg-white text-medical-700 border border-medical-200 hover:bg-medical-50 hover:border-primary-300";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        baseStyles,
        activeStyles,
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default TabButton;