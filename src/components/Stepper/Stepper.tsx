import React from 'react';
import './Stepper.css';

type StepperOrientation = 'horizontal' | 'vertical';
type StepStatus = 'completed' | 'active' | 'pending';

interface Step {
  id: string;
  title: string;
  description?: string;
  status: StepStatus;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  orientation?: StepperOrientation;
  className?: string;
  onStepClick?: (stepId: string) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  orientation = 'horizontal',
  className = '',
  onStepClick,
}) => {
  const stepperClasses = [
    'stepper',
    `stepper--${orientation}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={stepperClasses}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const stepClasses = [
          'stepper__step',
          `stepper__step--${step.status}`,
          onStepClick && 'stepper__step--clickable',
        ].filter(Boolean).join(' ');

        return (
          <React.Fragment key={step.id}>
            <div
              className={stepClasses}
              onClick={() => onStepClick?.(step.id)}
            >
              <div className="stepper__step-content">
                <div className="stepper__step-icon">
                  {step.icon || (
                    <div className="stepper__step-number">
                      {step.status === 'completed' ? '✓' : index + 1}
                    </div>
                  )}
                </div>
                <div className="stepper__step-info">
                  <div className="stepper__step-title">{step.title}</div>
                  {step.description && (
                    <div className="stepper__step-description">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!isLast && <div className="stepper__connector" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Демо-компонент для примера использования
export const StepperDemo: React.FC = () => {
  const steps: Step[] = [
    {
      id: '1',
      title: 'Шаг 1',
      description: 'Описание первого шага',
      status: 'completed' as StepStatus,
    },
    {
      id: '2',
      title: 'Шаг 2',
      description: 'Описание второго шага',
      status: 'active' as StepStatus,
    },
    {
      id: '3',
      title: 'Шаг 3',
      description: 'Описание третьего шага',
      status: 'pending' as StepStatus,
    },
  ];

  return (
    <div className="stepper-demo">
      <h2>Примеры использования Stepper</h2>
      
      <div className="stepper-demo-grid">
        <div className="stepper-demo-group">
          <h3>Горизонтальный степпер</h3>
          <Stepper steps={steps} />
        </div>

        <div className="stepper-demo-group">
          <h3>Вертикальный степпер</h3>
          <Stepper steps={steps} orientation="vertical" />
        </div>
      </div>
    </div>
  );
};

export default Stepper; 