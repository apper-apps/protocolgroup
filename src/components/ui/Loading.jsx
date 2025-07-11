import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-medical-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-6 h-6 bg-medical-200 rounded animate-pulse"></div>
          <div className="h-6 bg-medical-200 rounded w-32 animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-medical-200 rounded w-20 animate-pulse"></div>
            <div className="h-12 bg-medical-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-medical-200 rounded w-24 animate-pulse"></div>
            <div className="h-12 bg-medical-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-medical-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-6 h-6 bg-medical-200 rounded animate-pulse"></div>
          <div className="h-6 bg-medical-200 rounded w-28 animate-pulse"></div>
        </div>
        
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-medical-200 rounded-full mx-auto animate-pulse"></div>
          <div className="h-8 bg-medical-200 rounded w-32 mx-auto mt-4 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-medical-100 rounded-lg p-4">
            <div className="h-4 bg-medical-200 rounded w-16 mb-2 animate-pulse"></div>
            <div className="h-6 bg-medical-200 rounded w-20 animate-pulse"></div>
          </div>
          <div className="bg-medical-100 rounded-lg p-4">
            <div className="h-4 bg-medical-200 rounded w-16 mb-2 animate-pulse"></div>
            <div className="h-6 bg-medical-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
        
        <div className="h-16 bg-medical-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;