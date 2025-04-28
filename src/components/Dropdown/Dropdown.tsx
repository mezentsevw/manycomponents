import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите опцию',
  searchable = false,
  multiple = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(optionValue)
        ? currentValue.filter(v => v !== optionValue)
        : [...currentValue, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;
    if (multiple && Array.isArray(value)) {
      return value.length > 0
        ? options
            .filter(option => value.includes(option.value))
            .map(option => option.label)
            .join(', ')
        : placeholder;
    }
    return options.find(option => option.value === value)?.label || placeholder;
  };

  return (
    <div ref={dropdownRef} className={`dropdown ${className}`}>
      <div
        className={`dropdown__trigger ${isOpen ? 'dropdown__trigger--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {getDisplayValue()}
      </div>
      {isOpen && (
        <div className="dropdown__menu">
          {searchable && (
            <div className="dropdown__search">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск..."
                className="dropdown__search-input"
              />
            </div>
          )}
          <div className="dropdown__options">
            {filteredOptions.map(option => (
              <div
                key={option.value}
                className={`dropdown__option ${
                  (multiple && Array.isArray(value) && value.includes(option.value)) ||
                  (!multiple && value === option.value)
                    ? 'dropdown__option--selected'
                    : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 