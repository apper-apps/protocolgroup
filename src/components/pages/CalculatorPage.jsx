import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import InputPanel from "@/components/organisms/InputPanel";
import ReferencePanel from "@/components/organisms/ReferencePanel";
import ResultsPanel from "@/components/organisms/ResultsPanel";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import FormulaSelector from "@/components/molecules/FormulaSelector";
import { qtcService } from "@/services/api/qtcService";

const CalculatorPage = () => {
  const [qtInterval, setQtInterval] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [boxCount, setBoxCount] = useState(0);
  const [rrInterval, setRrInterval] = useState(0);
  const [selectedFormula, setSelectedFormula] = useState("Bazett");
  const [qtcValue, setQtcValue] = useState(0);
  const [inputMethod, setInputMethod] = useState("manual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formulas, setFormulas] = useState([]);
  const [ranges, setRanges] = useState({});

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (qtInterval > 0 && heartRate > 0) {
      calculateQTc();
    }
  }, [qtInterval, heartRate, selectedFormula]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [formulasData, rangesData] = await Promise.all([
        qtcService.getFormulas(),
        qtcService.getReferenceRanges()
      ]);
      
      setFormulas(formulasData || []);
      setRanges(rangesData || {});
    } catch (err) {
      console.error("Error loading initial data:", err);
      setError("Failed to load calculator data");
    } finally {
      setLoading(false);
    }
  };

  const calculateQTc = async () => {
    try {
      if (!qtInterval || !heartRate) {
        setQtcValue(0);
        return;
      }

      const rrInterval = 60000 / heartRate; // Convert to milliseconds
      let qtc = 0;

      switch (selectedFormula) {
        case "Bazett":
          qtc = qtInterval / Math.sqrt(rrInterval / 1000);
          break;
        case "Fridericia":
          qtc = qtInterval / Math.pow(rrInterval / 1000, 1/3);
          break;
        case "Framingham":
          qtc = qtInterval + 0.154 * (1000 - rrInterval);
          break;
        default:
          qtc = qtInterval / Math.sqrt(rrInterval / 1000);
      }

      setQtcValue(qtc);
    } catch (err) {
      console.error("Error calculating QTc:", err);
      toast.error("Error calculating QTc");
      setQtcValue(0);
    }
  };

const handleClear = () => {
    setQtInterval(0);
    setHeartRate(0);
    setBoxCount(0);
    setRrInterval(0);
    setQtcValue(0);
    toast.info("Calculator cleared");
  };

  const handleRetry = () => {
    loadInitialData();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-medical-800 mb-2"
        >
          QTc Interval Calculator
        </motion.h1>
        <motion.p
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-medical-600"
        >
          Calculate corrected QT intervals with clinical interpretation
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FormulaSelector
            selectedFormula={selectedFormula}
            onFormulaChange={setSelectedFormula}
            formulas={formulas}
          />
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <InputPanel
              qtInterval={qtInterval}
              setQtInterval={setQtInterval}
              heartRate={heartRate}
              setHeartRate={setHeartRate}
              boxCount={boxCount}
              setBoxCount={setBoxCount}
              inputMethod={inputMethod}
              setInputMethod={setInputMethod}
              onClear={handleClear}
            />
            
            <ResultsPanel
              qtcValue={qtcValue}
              formula={selectedFormula}
              qtInterval={qtInterval}
              heartRate={heartRate}
              ranges={ranges}
            />
          </div>
        </div>
      </div>

      <ReferencePanel ranges={ranges} />
    </motion.div>
  );
};

export default CalculatorPage;