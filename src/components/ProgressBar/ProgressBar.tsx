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
  detailLevel?: number;
  title?: string;
  description?: string;
}

/**
 * Компонент ProgressBar - отображает индикатор прогресса с различными уровнями детализации
 * 
 * @param {number} value - Текущее значение прогресса
 * @param {number} max - Максимальное значение прогресса
 * @param {ProgressBarType} type - Тип прогресс-бара (primary, success, warning, error)
 * @param {boolean} showLabel - Показывать ли метку со значением
 * @param {boolean} animated - Анимировать ли заполнение
 * @param {string} className - Дополнительные CSS классы
 * @param {number} detailLevel - Уровень детализации (0-4)
 * @param {string} title - Заголовок для уровней 3-4
 * @param {string} description - Описание для уровня 4
 * 
 * Уровни детализации:
 * 0: Минимальный - только рамка без заполнения
 * 1: Базовый - простая полоса прогресса без дополнительных элементов
 * 2: Стандартный - полоса прогресса с меткой процента
 * 3: Расширенный - полоса прогресса с заголовком и меткой
 * 4: Полный - полоса прогресса с заголовком, описанием, анимацией и стилями
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  type = 'primary',
  showLabel = false,
  animated = false,
  className = '',
  detailLevel = 2,
  title,
  description
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (animated || detailLevel === 4) {
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
  }, [value, animated, detailLevel]);

  const percentage = Math.min(100, Math.max(0, (displayValue / max) * 100));

  if (detailLevel === 0) {
    return (
      <div 
        className={`progress-bar ${className}`} 
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div className="progress-bar__placeholder">
          Прогресс-бар без заполнения
        </div>
      </div>
    );
  }

  if (detailLevel === 1) {
    return (
      <div 
        className={`progress-bar ${className}`} 
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div
          className={`progress-bar__fill progress-bar__fill--${type}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }

  if (detailLevel === 2) {
    return (
      <div 
        className={`progress-bar ${className}`} 
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div
          className={`progress-bar__fill progress-bar__fill--${type}`}
          style={{ width: `${percentage}%` }}
        >
          <span className="progress-bar__label">{Math.round(percentage)}%</span>
        </div>
      </div>
    );
  }

  if (detailLevel === 3) {
    return (
      <div 
        className={`progress-container ${className}`} 
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div className="progress-header">
          <div className="progress-label">
            {title || 'Прогресс выполнения'}
          </div>
          <div className="progress-percentage">
            {Math.round(percentage)}%
          </div>
        </div>
        <div className="progress-bar">
          <div
            className={`progress-bar__fill progress-bar__fill--${type}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  if (detailLevel === 4) {
    return (
      <div 
        className={`progress-container ${className}`} 
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div className="progress-header">
          <div className="progress-label">
            {title || 'Прогресс выполнения'}
          </div>
          <div className="progress-percentage">
            {Math.round(percentage)}%
          </div>
        </div>
        {description && (
          <div className="progress-description">
            {description}
          </div>
        )}
        <div className="progress-bar">
          <div
            className={`progress-bar__fill progress-bar__fill--${type} ${animated ? 'progress-bar__fill--animated' : ''}`}
            style={{ width: `${percentage}%` }}
          >
            <span className="progress-bar__label">{Math.round(percentage)}%</span>
          </div>
        </div>
        <div className="progress-footer">
          <div className="progress-metrics">
            <span>{displayValue}</span> из <span>{max}</span>
          </div>
        </div>
      </div>
    );
  }

  console.log('Неизвестный уровень детализации, используем уровень 2');
  return (
    <div 
      className={`progress-bar ${className}`} 
      data-detail-level={2}
    >
      <div className="detail-level-indicator">
        Уровень: 2 (стандартный)
      </div>
      <div
        className={`progress-bar__fill progress-bar__fill--${type}`}
        style={{ width: `${percentage}%` }}
      >
        <span className="progress-bar__label">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

// Создаем пример использования для демонстрации
export const ProgressBarDemo: React.FC = () => {
  return (
    <div className="progress-bar-demo">
      <p>Простой прогресс-бар. Используйте компонент ProgressBarDemoComplex для полной демонстрации.</p>
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