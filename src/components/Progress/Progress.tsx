import React from 'react';
import './Progress.css';

type ProgressVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ProgressSize = 'small' | 'medium' | 'large';
type ProgressType = 'line' | 'circle';

interface ProgressProps {
  percent: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  type?: ProgressType;
  showInfo?: boolean;
  strokeWidth?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  percent,
  variant = 'primary',
  size = 'medium',
  type = 'line',
  showInfo = true,
  strokeWidth = 6,
  className = '',
}) => {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const progressClasses = [
    'progress',
    `progress--${type}`,
    `progress--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const renderLineProgress = () => (
    <div className={progressClasses}>
      <div 
        className={`progress__bar progress__bar--${variant}`}
        style={{ width: `${clampedPercent}%` }}
      />
      {showInfo && (
        <span className="progress__info">
          {clampedPercent}%
        </span>
      )}
    </div>
  );

  const renderCircleProgress = () => {
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedPercent / 100) * circumference;

    return (
      <div className={progressClasses}>
        <svg className="progress__circle" viewBox="0 0 100 100">
          <circle
            className="progress__circle-bg"
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className={`progress__circle-bar progress__circle-bar--${variant}`}
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        {showInfo && (
          <span className="progress__info">
            {clampedPercent}%
          </span>
        )}
      </div>
    );
  };

  return type === 'line' ? renderLineProgress() : renderCircleProgress();
};

// Демо-компонент для примера использования
export const ProgressDemo: React.FC = () => {
  return (
    <div className="progress-demo">
      <h2>Примеры использования Progress</h2>
      
      <div className="progress-demo-grid">
        <div className="progress-demo-group">
          <h3>Линейный прогресс</h3>
          <div className="progress-demo-row">
            <Progress percent={30} variant="primary" />
            <Progress percent={50} variant="success" />
            <Progress percent={70} variant="warning" />
            <Progress percent={90} variant="danger" />
          </div>
        </div>

        <div className="progress-demo-group">
          <h3>Круговой прогресс</h3>
          <div className="progress-demo-row">
            <Progress type="circle" percent={30} variant="primary" />
            <Progress type="circle" percent={50} variant="success" />
            <Progress type="circle" percent={70} variant="warning" />
            <Progress type="circle" percent={90} variant="danger" />
          </div>
        </div>

        <div className="progress-demo-group">
          <h3>Размеры</h3>
          <div className="progress-demo-row">
            <Progress percent={50} size="small" />
            <Progress percent={50} size="medium" />
            <Progress percent={50} size="large" />
          </div>
        </div>

        <div className="progress-demo-group">
          <h3>Без информации</h3>
          <div className="progress-demo-row">
            <Progress percent={50} showInfo={false} />
            <Progress type="circle" percent={50} showInfo={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress; 