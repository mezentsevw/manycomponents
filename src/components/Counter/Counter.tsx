import React, { useState, useEffect } from 'react';
import './Counter.css';

export interface CounterProps {
  /** Начальное значение */
  initialValue?: number;
  /** Текущее значение (контролируемый режим) */
  value?: number;
  /** Минимальное значение */
  min?: number;
  /** Максимальное значение */
  max?: number;
  /** Шаг изменения */
  step?: number;
  /** Обработчик изменения значения */
  onChange?: (value: number) => void;
  /** Дополнительные CSS классы */
  className?: string;
  /** Отключение компонента */
  disabled?: boolean;
}

export const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  value: controlledValue,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
  className = '',
  disabled = false,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);
  
  // Используем controlledValue если он передан, иначе uncontrolledValue
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  
  const handleChange = (newValue: number) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    if (newValue !== value) {
      handleChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    if (newValue !== value) {
      handleChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        handleIncrement();
        break;
      case 'ArrowDown':
        e.preventDefault();
        handleDecrement();
        break;
    }
  };

  return (
    <div 
      className={`counter ${className} ${disabled ? 'counter--disabled' : ''}`}
      role="spinbutton"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <button
        className="counter__button counter__button--decrement"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Уменьшить"
      >
        -
      </button>
      <span className="counter__value">{value}</span>
      <button
        className="counter__button counter__button--increment"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Увеличить"
      >
        +
      </button>
    </div>
  );
}; 