import React from 'react';
import './Radio.css';

interface RadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  label,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className={`radio ${className}`}>
      <input
        type="radio"
        checked={checked}
        onChange={handleChange}
        className="radio__input"
      />
      <span className="radio__checkmark" />
      {label && <span className="radio__label">{label}</span>}
    </label>
  );
}; 