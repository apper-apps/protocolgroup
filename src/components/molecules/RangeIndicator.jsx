import React from "react";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";

const RangeIndicator = ({ value, ranges, gender = "male" }) => {
  const getInterpretation = (qtcValue, ranges, gender) => {
    const range = ranges.find(r => r.gender === gender) || ranges[0];
    
    if (qtcValue <= range.normalMax) {
      return { status: "normal", label: "Normal", color: "success" };
    } else if (qtcValue <= range.borderlineMax) {
      return { status: "borderline", label: "Borderline", color: "warning" };
    } else {
      return { status: "prolonged", label: "Prolonged", color: "danger" };
    }
  };

  const interpretation = getInterpretation(value, ranges, gender);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-medical-600">Clinical Interpretation:</span>
        <Badge variant={interpretation.color}>
          {interpretation.label}
        </Badge>
      </div>
      
      <div className="relative">
        <div className="h-2 bg-medical-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 via-amber-400 to-red-500 rounded-full"></div>
        </div>
        
        <div className="flex justify-between text-xs text-medical-500 mt-1">
          <span>Normal</span>
          <span>Borderline</span>
          <span>Prolonged</span>
        </div>
        
        {value > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-0 w-3 h-3 bg-white border-2 border-medical-700 rounded-full transform -translate-y-0.5"
            style={{
              left: `${Math.min(Math.max((value - 350) / (500 - 350) * 100, 0), 100)}%`,
              marginLeft: "-6px"
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default RangeIndicator;