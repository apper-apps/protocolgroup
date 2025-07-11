import React from "react";
import { motion } from "framer-motion";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const FormulaSelector = ({ selectedFormula, onFormulaChange, formulas }) => {
  const getFormulaIcon = (formulaName) => {
    switch (formulaName) {
      case "Bazett": return "Calculator";
      case "Fridericia": return "Function";
      case "Framingham": return "TrendingUp";
      default: return "Calculator";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      <div className="flex items-center space-x-2">
        <ApperIcon name="Settings" className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-medical-800">Formula Selection</h3>
      </div>
      
      <Select
        label="Correction Formula"
        value={selectedFormula}
        onChange={(e) => onFormulaChange(e.target.value)}
        options={formulas.map(formula => ({
          value: formula.name,
          label: formula.name
        }))}
      />
      
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4 border border-primary-200">
        <div className="flex items-start space-x-3">
          <ApperIcon 
            name={getFormulaIcon(selectedFormula)} 
            className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" 
          />
          <div>
            <h4 className="font-medium text-primary-900 mb-1">
              {selectedFormula} Formula
            </h4>
            <p className="text-sm text-primary-800">
              {formulas.find(f => f.name === selectedFormula)?.description || "Standard QTc correction formula"}
            </p>
            <div className="mt-2 p-2 bg-white rounded border border-primary-200">
              <code className="text-xs text-primary-700 font-mono">
                {formulas.find(f => f.name === selectedFormula)?.equation || "QTc = QT / √RR"}
              </code>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FormulaSelector;