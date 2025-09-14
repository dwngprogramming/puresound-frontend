"use client";

import {Check} from "lucide-react";
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({currentStep, totalSteps}: StepIndicatorProps) => {
  const createSteps = () => {
    const steps = [];
    for (let i = 1; i <= totalSteps; i++) {
      steps.push(i);
    }
    return steps;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        {createSteps().map((step) => (
          <React.Fragment key={step}>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              transition-all duration-300 ease-in-out z-10 relative
              ${currentStep >= step
              ? 'bg-blue-400 text-white'
              : 'bg-gray-200 text-gray-600'
            }
            `}>
              {currentStep > step ? <Check size={16} /> : step}
            </div>

            {step < totalSteps && (
              <div className="flex-1 relative mx-1">
                {/* Background line (gray) */}
                <div className="w-full h-1 bg-gray-200 rounded-full" />

                {/* Animated fill line (blue) */}
                <div className={`
                  absolute top-0 left-0 h-1 bg-blue-600 rounded-full
                  transition-all duration-500 ease-in-out
                  ${currentStep > step
                  ? 'w-full'   // Đã hoàn thành step này → fill 100%
                  : 'w-0'      // Chưa hoàn thành → 0%
                }
                `} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
