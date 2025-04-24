import React, { ReactNode, useEffect, useState } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  id?: string;
  value?: number;
  max?: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  animated?: boolean;
  children?: ReactNode;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  id, 
  value = 0, 
  max = 100, 
  label,
  color = '#4CAF50',
  showPercentage = true,
  animated = false,
  children 
}) => {
  const [currentValue, setCurrentValue] = useState(animated ? 0 : value);
  const percentage = Math.min(100, Math.max(0, (currentValue / max) * 100));

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentValue(value);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animated, value]);

  return (
    <div className="progress-container" id={id}>
      <div className="progress-header">
        {label && <div className="progress-label">{label}</div>}
        {showPercentage && <div className="progress-percentage">{Math.round(percentage)}%</div>}
      </div>
      <div className="progress-bar">
        {children || (
          <div 
            className={`progress-fill ${animated ? 'animated' : ''}`}
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
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
        label="Загрузка проекта" 
        color="#2196F3"
        animated 
      />
      <ProgressBar 
        value={45} 
        label="Память сервера" 
        color="#FF9800"
        animated 
      />
      <ProgressBar 
        value={90} 
        label="Загрузка CPU" 
        color="#F44336"
        animated 
      />
      <ProgressBar 
        value={30} 
        label="Место на диске" 
        color="#9C27B0"
        animated 
      />
    </div>
  );
};

export default ProgressBar; 