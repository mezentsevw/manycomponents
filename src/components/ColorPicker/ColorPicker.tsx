import React, { useState, useRef, useEffect } from 'react';
import './ColorPicker.css';

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  format?: 'hex' | 'rgb' | 'hsl';
  showAlpha?: boolean;
  className?: string;
  disabled?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value = '#000000',
  onChange,
  format = 'hex',
  showAlpha = false,
  className = '',
  disabled = false,
}) => {
  const [color, setColor] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChange?.(newColor);
  };

  const formatColor = (color: string) => {
    switch (format) {
      case 'rgb':
        return hexToRgb(color);
      case 'hsl':
        return hexToHsl(color);
      default:
        return color;
    }
  };

  return (
    <div className={`color-picker ${className}`} ref={pickerRef}>
      <div
        className="color-picker__trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ backgroundColor: color }}
      />
      {isOpen && (
        <div className="color-picker__popover">
          <div className="color-picker__saturation">
            <div className="color-picker__saturation-white">
              <div className="color-picker__saturation-black" />
            </div>
          </div>
          <div className="color-picker__hue">
            <div className="color-picker__hue-slider" />
          </div>
          {showAlpha && (
            <div className="color-picker__alpha">
              <div className="color-picker__alpha-slider" />
            </div>
          )}
          <div className="color-picker__input">
            <input
              type="text"
              value={formatColor(color)}
              onChange={(e) => handleColorChange(e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Вспомогательные функции для конвертации цветов
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    : hex;
};

const hexToHsl = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

// Демо-компонент
export const ColorPickerDemo: React.FC = () => {
  const [color, setColor] = useState('#ff0000');

  return (
    <div className="color-picker-demo">
      <h2>Примеры использования ColorPicker</h2>
      
      <div className="color-picker-demo-grid">
        <div className="color-picker-demo-group">
          <h3>Базовое использование</h3>
          <ColorPicker value={color} onChange={setColor} />
        </div>

        <div className="color-picker-demo-group">
          <h3>RGB формат</h3>
          <ColorPicker
            value={color}
            onChange={setColor}
            format="rgb"
          />
        </div>

        <div className="color-picker-demo-group">
          <h3>С прозрачностью</h3>
          <ColorPicker
            value={color}
            onChange={setColor}
            showAlpha
          />
        </div>

        <div className="color-picker-demo-group">
          <h3>Отключенный</h3>
          <ColorPicker
            value={color}
            onChange={setColor}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker; 