import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-8 shadow-sm border border-medical-200 text-center"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-cardiac-100 to-cardiac-200 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-cardiac-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-medical-800 mb-2">Calculation Error</h3>
          <p className="text-medical-600 mb-4">{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="RefreshCw" className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Error;