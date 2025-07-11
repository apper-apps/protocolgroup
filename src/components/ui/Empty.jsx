import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No Data Available", 
  description = "There's no data to display at the moment.",
  actionText = "Get Started",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-8 shadow-sm border border-medical-200 text-center"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
          <ApperIcon name="Activity" className="w-8 h-8 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-medical-800 mb-2">{title}</h3>
          <p className="text-medical-600 mb-4">{description}</p>
          {onAction && (
            <Button
              onClick={onAction}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Calculator" className="w-4 h-4" />
              <span>{actionText}</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;