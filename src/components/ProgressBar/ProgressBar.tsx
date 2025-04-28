import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

type ProgressBarType = 'primary' | 'success' | 'warning' | 'error';

interface ProgressBarProps {
  value: number;
  max?: number;
  type?: ProgressBarType;
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  type = 'primary',
  showLabel = false,
  animated = false,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setDisplayValue((prev) => {
          if (prev >= value) {
            clearInterval(interval);
            return value;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(interval);
    } else {
      setDisplayValue(value);
    }
  }, [value, animated]);

  const percentage = Math.min(100, Math.max(0, (displayValue / max) * 100));

  return (
    <div className={`progress-bar ${className}`}>
      <div
        className={`progress-bar__fill progress-bar__fill--${type}`}
        style={{ width: `${percentage}%` }}
      >
        {showLabel && (
          <span className="progress-bar__label">{Math.round(percentage)}%</span>
        )}
      </div>
    </div>
  );
};

// Создаем пример использования для демонстрации
export const ProgressBarDemo: React.FC = () => {
  return (
    <div className="progress-bar-demo">
      <ProgressBar 
        value={75} 
        type="primary"
        animated 
      />
      <ProgressBar 
        value={45} 
        type="success"
        animated 
      />
      <ProgressBar 
        value={90} 
        type="warning"
        animated 
      />
      <ProgressBar 
        value={30} 
        type="error"
        animated 
      />
    </div>
  );
};

export default ProgressBar; 