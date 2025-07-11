import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className, 
  label,
  error,
  children,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 text-base border-2 border-medical-200 rounded-lg input-focus transition-all duration-200 bg-white text-medical-800 appearance-none bg-no-repeat bg-right bg-[length:20px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgNy41TDEwIDEyLjVMMTUgNy41IiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')]";
  
  const errorStyles = error ? "border-cardiac-400 focus:border-cardiac-500" : "border-medical-200 focus:border-primary-500";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-medical-700 mb-2">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          baseStyles,
          errorStyles,
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-cardiac-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;