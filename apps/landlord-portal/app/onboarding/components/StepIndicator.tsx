"use client";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Step Labels */}
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={`flex flex-col items-center ${
                step <= currentStep ? "text-teal" : "text-text-light"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1 transition-all duration-300 ${
                  step < currentStep
                    ? "bg-teal text-white"
                    : step === currentStep
                    ? "bg-teal text-white ring-4 ring-teal/20"
                    : "bg-gray-200 text-text-muted"
                }`}
              >
                {step < currentStep ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal to-teal-dark rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Names (visible on larger screens) */}
        <div className="hidden md:flex justify-between mt-3 text-xs text-text-muted">
          <span className={currentStep >= 1 ? "text-teal font-medium" : ""}>Typ</span>
          <span className={currentStep >= 2 ? "text-teal font-medium" : ""}>Immobilie</span>
          <span className={currentStep >= 3 ? "text-teal font-medium" : ""}>Situation</span>
          <span className={currentStep >= 4 ? "text-teal font-medium" : ""}>Mieter</span>
          <span className={currentStep >= 5 ? "text-teal font-medium" : ""}>Dokumente</span>
          <span className={currentStep >= 6 ? "text-teal font-medium" : ""}>Kontakt</span>
          <span className={currentStep >= 7 ? "text-teal font-medium" : ""}>Fertig</span>
        </div>
      </div>
    </div>
  );
}