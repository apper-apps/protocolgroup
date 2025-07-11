import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b border-medical-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="Activity" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">QTc Pro</h1>
                <p className="text-sm text-medical-600">Medical QT Interval Calculator</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-medical-600">
              <ApperIcon name="Shield" className="w-4 h-4" />
              <span>Clinical Grade</span>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-medical-600">
              <ApperIcon name="Clock" className="w-4 h-4" />
              <span>Real-time Calculation</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;