import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import TabButton from "@/components/molecules/TabButton";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const InputPanel = ({ 
  qtInterval, 
  setQtInterval, 
  heartRate, 
  setHeartRate, 
  boxCount, 
  setBoxCount,
  inputMethod,
  setInputMethod,
  onClear 
}) => {
  const [errors, setErrors] = useState({});

  const validateInput = (field, value) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case "qtInterval":
        if (value < 200 || value > 600) {
          newErrors.qtInterval = "QT interval should be between 200-600 ms";
        } else {
          delete newErrors.qtInterval;
        }
        break;
      case "heartRate":
        if (value < 40 || value > 200) {
          newErrors.heartRate = "Heart rate should be between 40-200 bpm";
        } else {
          delete newErrors.heartRate;
        }
        break;
      case "boxCount":
        if (value < 5 || value > 20) {
          newErrors.boxCount = "Box count should be between 5-20 boxes";
        } else {
          delete newErrors.boxCount;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleQtChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setQtInterval(value);
    validateInput("qtInterval", value);
  };

  const handleHeartRateChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setHeartRate(value);
    validateInput("heartRate", value);
  };

  const handleBoxCountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setBoxCount(value);
    validateInput("boxCount", value);
    // Auto-calculate QT interval from boxes
    const qtFromBoxes = value * 40; // 0.04 seconds per box = 40ms
    setQtInterval(qtFromBoxes);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card variant="elevated" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Calculator" className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">Input Method</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
            <span>Clear</span>
          </Button>
        </div>

        <div className="flex space-x-2 mb-6">
          <TabButton
            active={inputMethod === "direct"}
            onClick={() => setInputMethod("direct")}
          >
            Direct Input
          </TabButton>
          <TabButton
            active={inputMethod === "boxes"}
            onClick={() => setInputMethod("boxes")}
          >
            Box Counting
          </TabButton>
        </div>

        {inputMethod === "direct" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <FormField
              label="QT Interval"
              type="number"
              value={qtInterval || ""}
              onChange={handleQtChange}
              placeholder="Enter QT interval (ms)"
              error={errors.qtInterval}
              step="1"
              min="200"
              max="600"
            />
            
            <FormField
              label="Heart Rate"
              type="number"
              value={heartRate || ""}
              onChange={handleHeartRateChange}
              placeholder="Enter heart rate (bpm)"
              error={errors.heartRate}
              step="1"
              min="40"
              max="200"
            />
            
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <ApperIcon name="Info" className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-primary-900 mb-1">Direct Input Method</h4>
                  <p className="text-sm text-primary-800">
                    Enter the QT interval in milliseconds and heart rate in beats per minute. 
                    These values are typically measured from ECG readings.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <FormField
              label="Small Box Count"
              type="number"
              value={boxCount || ""}
              onChange={handleBoxCountChange}
              placeholder="Count small boxes"
              error={errors.boxCount}
              step="0.1"
              min="5"
              max="20"
            />
            
            <FormField
              label="Heart Rate"
              type="number"
              value={heartRate || ""}
              onChange={handleHeartRateChange}
              placeholder="Enter heart rate (bpm)"
              error={errors.heartRate}
              step="1"
              min="40"
              max="200"
            />
            
            {boxCount > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Calculator" className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    QT Interval: <strong>{boxCount * 40} ms</strong> (calculated from {boxCount} boxes)
                  </span>
                </div>
              </div>
            )}
            
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <ApperIcon name="Info" className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-primary-900 mb-1">Box Counting Method</h4>
                  <p className="text-sm text-primary-800">
                    Count the number of small boxes in the QT interval. Each small box represents 0.04 seconds (40ms). 
                    This method is useful when measuring directly from ECG paper.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default InputPanel;