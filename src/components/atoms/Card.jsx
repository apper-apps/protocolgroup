import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  variant = "default",
  children,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-xl transition-all duration-200";
  
  const variants = {
    default: "border border-medical-200 shadow-sm hover:shadow-md",
    elevated: "shadow-lg hover:shadow-xl border-0",
    outlined: "border-2 border-medical-200 hover:border-primary-300 shadow-sm",
    gradient: "bg-gradient-to-br from-white to-primary-50 border border-primary-200 shadow-md hover:shadow-lg"
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;