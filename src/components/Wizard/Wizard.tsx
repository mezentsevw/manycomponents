import React, { useState, useEffect } from 'react';
import './Wizard.css';

interface Step {
  title: string;
  content: React.ReactNode;
  validate?: () => boolean;
}

interface WizardProps {
  steps: Step[];
  initialStep?: number;
  onComplete?: () => void;
  onStepChange?: (step: number) => void;
  className?: string;
}

export const Wizard: React.FC<WizardProps> = ({
  steps,
  initialStep = 0,
  onComplete,
  onStepChange,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const isValidStep = steps[currentStep].validate?.() ?? true;
      if (isValidStep) {
        setCompletedSteps([...completedSteps, currentStep]);
        setCurrentStep(currentStep + 1);
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsValid(true);
    }
  };

  const isStepCompleted = (stepIndex: number) => {
    return completedSteps.includes(stepIndex);
  };

  const isStepActive = (stepIndex: number) => {
    return stepIndex === currentStep;
  };

  return (
    <div className={`wizard ${className}`}>
      <div className="wizard__steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`wizard__step ${
              isStepCompleted(index) ? 'wizard__step--completed' : ''
            } ${isStepActive(index) ? 'wizard__step--active' : ''}`}
          >
            <div className="wizard__step-number">{index + 1}</div>
            <div className="wizard__step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <div className="wizard__content">
        {steps[currentStep].content}
        {!isValid && (
          <div className="wizard__error">
            Пожалуйста, заполните все обязательные поля
          </div>
        )}
      </div>

      <div className="wizard__navigation">
        <button
          className="wizard__button wizard__button--back"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Назад
        </button>
        <button
          className="wizard__button wizard__button--next"
          onClick={handleNext}
        >
          {currentStep === steps.length - 1 ? 'Завершить' : 'Далее'}
        </button>
      </div>
    </div>
  );
};

// Демо-компонент
export const WizardDemo: React.FC = () => {
  const steps: Step[] = [
    {
      title: 'Личные данные',
      content: (
        <div className="demo-form">
          <h3>Шаг 1: Личные данные</h3>
          <p>Введите ваши личные данные</p>
        </div>
      ),
      validate: () => true,
    },
    {
      title: 'Контактная информация',
      content: (
        <div className="demo-form">
          <h3>Шаг 2: Контактная информация</h3>
          <p>Введите ваши контактные данные</p>
        </div>
      ),
      validate: () => true,
    },
    {
      title: 'Подтверждение',
      content: (
        <div className="demo-form">
          <h3>Шаг 3: Подтверждение</h3>
          <p>Проверьте введенные данные</p>
        </div>
      ),
      validate: () => true,
    },
  ];

  return (
    <div className="wizard-demo">
      <h2>Примеры использования Wizard</h2>
      
      <div className="wizard-demo-grid">
        <div className="wizard-demo-group">
          <h3>Базовое использование</h3>
          <Wizard steps={steps} />
        </div>

        <div className="wizard-demo-group">
          <h3>С валидацией</h3>
          <Wizard 
            steps={steps.map(step => ({
              ...step,
              validate: () => Math.random() > 0.5
            }))} 
          />
        </div>
      </div>
    </div>
  );
};

export default Wizard; 