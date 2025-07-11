import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ReferencePanel = ({ ranges }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      <Card variant="elevated" className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <ApperIcon name="BookOpen" className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-medical-800">Clinical Reference</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-medical-800 mb-3">Normal Values</h3>
            {ranges.map((range, index) => (
              <div key={index} className="bg-gradient-to-r from-medical-50 to-primary-50 rounded-lg p-4 border border-medical-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name={range.gender === "male" ? "User" : "UserCheck"} className="w-4 h-4 text-primary-600" />
                    <span className="font-medium text-medical-800 capitalize">{range.gender}</span>
                  </div>
                  <Badge variant="primary">{range.gender}</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-medical-600">Normal:</span>
                    <span className="font-medium text-green-700">≤ {range.normalMax} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medical-600">Borderline:</span>
                    <span className="font-medium text-amber-700">{range.normalMax + 1} - {range.borderlineMax} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medical-600">Prolonged:</span>
                    <span className="font-medium text-cardiac-700">> {range.borderlineMax} ms</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-medical-800 mb-3">Clinical Notes</h3>
            
            <div className="bg-gradient-to-r from-cardiac-50 to-red-50 rounded-lg p-4 border border-cardiac-200">
              <div className="flex items-start space-x-3">
                <ApperIcon name="AlertTriangle" className="w-5 h-5 text-cardiac-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-cardiac-900 mb-1">Important Considerations</h4>
                  <ul className="text-sm text-cardiac-800 space-y-1">
                    <li>• QTc > 500 ms significantly increases torsades risk</li>
                    <li>• Consider drug interactions and electrolyte imbalances</li>
                    <li>• Bazett formula may over-correct at high heart rates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 border border-primary-200">
              <div className="flex items-start space-x-3">
                <ApperIcon name="Info" className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-primary-900 mb-1">Formula Selection</h4>
                  <ul className="text-sm text-primary-800 space-y-1">
                    <li>• <strong>Bazett:</strong> Most commonly used</li>
                    <li>• <strong>Fridericia:</strong> Better for extreme heart rates</li>
                    <li>• <strong>Framingham:</strong> Population-based correction</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start space-x-3">
                <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">Best Practices</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Measure QT in lead II or V5/V6</li>
                    <li>• Use longest QT interval measured</li>
                    <li>• Consider clinical context and patient history</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReferencePanel;