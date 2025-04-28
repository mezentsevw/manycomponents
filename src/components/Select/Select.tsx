import React, { useState, useRef, useEffect } from 'react';
import './Select.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={selectRef}
      className={`select ${className} ${isOpen ? 'open' : ''}`}
    >
      <div 
        className="select__trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="select__value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="select__arrow">▼</span>
      </div>
      
      {isOpen && (
        <div className="select__options">
          {options.map(option => (
            <div
              key={option.value}
              className={`select__option ${value === option.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 