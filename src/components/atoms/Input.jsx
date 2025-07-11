import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  label,
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 text-base border-2 border-medical-200 rounded-lg input-focus transition-all duration-200 bg-white placeholder-medical-400 text-medical-800";
  
  const errorStyles = error ? "border-cardiac-400 focus:border-cardiac-500" : "border-medical-200 focus:border-primary-500";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-medical-700 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          errorStyles,
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-cardiac-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;