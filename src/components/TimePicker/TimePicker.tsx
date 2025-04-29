import React, { useState, useRef, useEffect } from 'react';
import './TimePicker.css';

export interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  format?: '12h' | '24h';
  interval?: number;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  error?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value = '',
  onChange,
  format = '24h',
  interval = 30,
  disabled = false,
  className = '',
  placeholder = 'Выберите время',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [selectedTime, setSelectedTime] = useState<{ hours: number; minutes: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleTimeSelect = (hours: number, minutes: number) => {
    const formattedTime = format === '24h'
      ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      : `${(hours % 12 || 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    
    setInputValue(formattedTime);
    setSelectedTime({ hours, minutes });
    if (onChange) {
      onChange(formattedTime);
    }
    setIsOpen(false);
  };

  const generateTimeOptions = () => {
    const options = [];
    const totalMinutes = 24 * 60;
    
    for (let minutes = 0; minutes < totalMinutes; minutes += interval) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      options.push({ hours, minutes: mins });
    }
    
    return options;
  };

  return (
    <div className={`time-picker ${className}`} ref={containerRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        className={`time-picker__input ${error ? 'time-picker__input--error' : ''}`}
      />
      {error && <div className="time-picker__error">{error}</div>}
      {isOpen && (
        <div className="time-picker__dropdown">
          <div className="time-picker__options">
            {generateTimeOptions().map((time) => (
              <button
                key={`${time.hours}-${time.minutes}`}
                className={`time-picker__option ${
                  selectedTime?.hours === time.hours && selectedTime?.minutes === time.minutes
                    ? 'time-picker__option--selected'
                    : ''
                }`}
                onClick={() => handleTimeSelect(time.hours, time.minutes)}
              >
                {format === '24h'
                  ? `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`
                  : `${(time.hours % 12 || 12).toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')} ${
                      time.hours >= 12 ? 'PM' : 'AM'
                    }`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Демо-компонент
export const TimePickerDemo: React.FC = () => {
  const [time, setTime] = useState('');

  return (
    <div className="time-picker-demo">
      <h2>Пример использования TimePicker</h2>
      <div className="time-picker-demo__grid">
        <div className="time-picker-demo__item">
          <h3>24-часовой формат</h3>
          <TimePicker
            value={time}
            onChange={setTime}
            format="24h"
            interval={30}
            placeholder="Выберите время (24ч)"
          />
        </div>
        <div className="time-picker-demo__item">
          <h3>12-часовой формат</h3>
          <TimePicker
            value={time}
            onChange={setTime}
            format="12h"
            interval={15}
            placeholder="Выберите время (12ч)"
          />
        </div>
        <div className="time-picker-demo__item">
          <h3>С ошибкой</h3>
          <TimePicker
            value={time}
            onChange={setTime}
            error="Неверный формат времени"
            placeholder="Выберите время"
          />
        </div>
        <div className="time-picker-demo__item">
          <h3>Отключенный</h3>
          <TimePicker
            value={time}
            onChange={setTime}
            disabled
            placeholder="Выберите время"
          />
        </div>
      </div>
    </div>
  );
};

export default TimePicker; 