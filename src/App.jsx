import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/organisms/Layout";
import CalculatorPage from "@/components/pages/CalculatorPage";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-medical-50 to-primary-50"
    >
      <Layout>
        <Routes>
          <Route path="/" element={<CalculatorPage />} />
        </Routes>
      </Layout>
    </motion.div>
  );
}

export default App;