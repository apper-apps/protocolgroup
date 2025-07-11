import { useState, useEffect } from "react";
import { qtcService } from "@/services/api/qtcService";

export const useQTcCalculator = () => {
  const [qtInterval, setQtInterval] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [boxCount, setBoxCount] = useState(0);
  const [selectedFormula, setSelectedFormula] = useState("Bazett");
  const [qtcValue, setQtcValue] = useState(0);
  const [inputMethod, setInputMethod] = useState("direct");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateQTc = async () => {
    if (qtInterval <= 0 || heartRate <= 0) {
      setQtcValue(0);
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const result = await qtcService.calculateQTc(qtInterval, heartRate, selectedFormula);
      setQtcValue(result.qtc);
    } catch (err) {
      setError("Error calculating QTc");
      setQtcValue(0);
    } finally {
      setLoading(false);
    }
  };

  const clearCalculator = () => {
    setQtInterval(0);
    setHeartRate(0);
    setBoxCount(0);
    setQtcValue(0);
    setError("");
  };

  useEffect(() => {
    if (qtInterval > 0 && heartRate > 0) {
      calculateQTc();
    }
  }, [qtInterval, heartRate, selectedFormula]);

  return {
    qtInterval,
    setQtInterval,
    heartRate,
    setHeartRate,
    boxCount,
    setBoxCount,
    selectedFormula,
    setSelectedFormula,
    qtcValue,
    inputMethod,
    setInputMethod,
    loading,
    error,
    calculateQTc,
    clearCalculator
  };
};