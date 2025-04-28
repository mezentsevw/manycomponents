import React, { useState } from 'react';
import './Input.css';

export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  name?: string;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  value,
  defaultValue,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onChange,
  onBlur,
  onFocus,
  className = '',
  name,
  autoComplete
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <div className={`input-wrapper ${fullWidth ? 'full-width' : ''} ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className={`input-container ${error ? 'error' : ''} ${isFocused ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}>
        {startIcon && <span className="input-icon start">{startIcon}</span>}
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="input-field"
          name={name}
          autoComplete={autoComplete}
        />
        {endIcon && <span className="input-icon end">{endIcon}</span>}
      </div>
      {(error || helperText) && (
        <span className={`input-message ${error ? 'error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};

// Демо-компонент для примера использования
export const InputDemo: React.FC = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.length < 3) {
      setError('Минимум 3 символа');
    } else {
      setError('');
    }
  };

  return (
    <div className="input-demo">
      <h2>Примеры использования Input</h2>
      
      <div className="input-demo-grid">
        <div className="input-demo-group">
          <h3>Типы</h3>
          <div className="input-demo-row">
            <Input type="text" placeholder="Текстовое поле" />
            <Input type="password" placeholder="Пароль" />
            <Input type="email" placeholder="Email" />
            <Input type="number" placeholder="Число" />
          </div>
        </div>

        <div className="input-demo-group">
          <h3>Состояния</h3>
          <div className="input-demo-row">
            <Input label="Обычное поле" placeholder="Введите текст" />
            <Input label="Отключенное" placeholder="Disabled" disabled />
            <Input label="С ошибкой" error="Обязательное поле" />
          </div>
        </div>

        <div className="input-demo-group">
          <h3>С иконками</h3>
          <div className="input-demo-row">
            <Input
              startIcon={<span>🔍</span>}
              placeholder="Поиск"
            />
            <Input
              endIcon={<span>✓</span>}
              placeholder="С иконкой справа"
            />
          </div>
        </div>

        <div className="input-demo-group">
          <h3>Валидация</h3>
          <div className="input-demo-row">
            <Input
              label="Поле с валидацией"
              value={value}
              onChange={handleChange}
              error={error}
              helperText="Введите минимум 3 символа"
            />
          </div>
        </div>

        <div className="input-demo-group">
          <h3>Full Width</h3>
          <div className="input-demo-row">
            <Input
              fullWidth
              placeholder="Full width input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input; 