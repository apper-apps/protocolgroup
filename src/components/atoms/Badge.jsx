import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default",
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200";
  
  const variants = {
    default: "bg-medical-100 text-medical-800",
    primary: "bg-primary-100 text-primary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-cardiac-100 text-cardiac-800",
    normal: "bg-green-100 text-green-800 border border-green-200",
    borderline: "bg-amber-100 text-amber-800 border border-amber-200",
    prolonged: "bg-cardiac-100 text-cardiac-800 border border-cardiac-200"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;