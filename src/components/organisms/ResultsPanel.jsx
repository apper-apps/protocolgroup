import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import RangeIndicator from "@/components/molecules/RangeIndicator";
import ApperIcon from "@/components/ApperIcon";

const ResultsPanel = ({ qtcValue, formula, qtInterval, heartRate, ranges }) => {
  const hasValidInputs = qtInterval > 0 && heartRate > 0;

  if (!hasValidInputs) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <Card variant="outlined" className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-medical-100 to-medical-200 rounded-full flex items-center justify-center">
              <ApperIcon name="Activity" className="w-8 h-8 text-medical-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-medical-800 mb-2">Ready to Calculate</h3>
              <p className="text-medical-600">
                Enter QT interval and heart rate to get your QTc calculation with clinical interpretation.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  const getInterpretation = (qtcValue, ranges) => {
    // Use male ranges as default
    const range = ranges.find(r => r.gender === "male") || ranges[0];
    
    if (qtcValue <= range.normalMax) {
      return { status: "normal", label: "Normal", color: "success", icon: "CheckCircle" };
    } else if (qtcValue <= range.borderlineMax) {
      return { status: "borderline", label: "Borderline", color: "warning", icon: "AlertTriangle" };
    } else {
      return { status: "prolonged", label: "Prolonged", color: "danger", icon: "AlertCircle" };
    }
  };

  const interpretation = getInterpretation(qtcValue, ranges);
  const rrInterval = 60000 / heartRate; // Convert to ms

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card variant="elevated" className="p-6 ecg-pattern">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Activity" className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">QTc Results</h2>
          </div>
          <Badge variant="primary">{formula}</Badge>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl px-6 py-4 text-white shadow-lg">
            <ApperIcon name="Zap" className="w-6 h-6 pulse-cardiac" />
            <div>
              <div className="text-3xl font-bold gradient-text">{qtcValue.toFixed(0)}</div>
              <div className="text-sm opacity-90">milliseconds</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-medical-200">
            <div className="flex items-center space-x-2 mb-2">
              <ApperIcon name="Clock" className="w-4 h-4 text-medical-500" />
              <span className="text-sm text-medical-600">QT Interval</span>
            </div>
            <div className="text-lg font-semibold text-medical-800">{qtInterval} ms</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-medical-200">
            <div className="flex items-center space-x-2 mb-2">
              <ApperIcon name="Heart" className="w-4 h-4 text-cardiac-500" />
              <span className="text-sm text-medical-600">Heart Rate</span>
            </div>
            <div className="text-lg font-semibold text-medical-800">{heartRate} bpm</div>
          </div>
        </div>

        <RangeIndicator value={qtcValue} ranges={ranges} />

        <div className="mt-6 bg-white rounded-lg p-4 border border-medical-200">
          <div className="flex items-start space-x-3">
            <ApperIcon name={interpretation.icon} className={`w-5 h-5 mt-0.5 ${
              interpretation.color === "success" ? "text-green-600" :
              interpretation.color === "warning" ? "text-amber-600" :
              "text-cardiac-600"
            }`} />
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-medical-800">Clinical Assessment:</span>
                <Badge variant={interpretation.color}>{interpretation.label}</Badge>
              </div>
              <p className="text-sm text-medical-600">
                {interpretation.status === "normal" && "QTc interval is within normal limits."}
                {interpretation.status === "borderline" && "QTc interval is borderline. Consider clinical correlation."}
                {interpretation.status === "prolonged" && "QTc interval is prolonged. Clinical evaluation recommended."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-medical-500 bg-medical-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Info" className="w-4 h-4" />
            <span>
              RR Interval: {rrInterval.toFixed(0)} ms | Formula: {formula} | 
              {formula === "Bazett" && " QTc = QT / √(RR/1000)"}
              {formula === "Fridericia" && " QTc = QT / (RR/1000)^(1/3)"}
              {formula === "Framingham" && " QTc = QT + 0.154 × (1000 - RR)"}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ResultsPanel;