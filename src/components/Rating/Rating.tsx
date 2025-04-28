import React, { useState } from 'react';
import './Rating.css';

type RatingSize = 'small' | 'medium' | 'large';
type RatingVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

interface RatingProps {
  value: number;
  max?: number;
  size?: RatingSize;
  variant?: RatingVariant;
  readOnly?: boolean;
  precision?: number;
  className?: string;
  onChange?: (value: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'medium',
  variant = 'primary',
  readOnly = false,
  precision = 1,
  className = '',
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState(value);

  const handleMouseEnter = (newValue: number) => {
    if (!readOnly) {
      setHoverValue(newValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };

  const handleClick = (newValue: number) => {
    if (!readOnly && onChange) {
      onChange(newValue);
    }
  };

  const currentValue = hoverValue ?? displayValue;

  const stars = Array.from({ length: max }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= currentValue;
    const isHalfFilled = starValue - 0.5 === currentValue;

    return (
      <span
        key={starValue}
        className={[
          'rating__star',
          `rating__star--${size}`,
          isFilled && 'rating__star--filled',
          isHalfFilled && 'rating__star--half-filled',
          `rating__star--${variant}`,
        ].filter(Boolean).join(' ')}
        onMouseEnter={() => handleMouseEnter(starValue)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(starValue)}
        role={!readOnly ? 'button' : undefined}
        tabIndex={!readOnly ? 0 : undefined}
      >
        ★
      </span>
    );
  });

  return (
    <div
      className={[
        'rating',
        `rating--${size}`,
        readOnly && 'rating--read-only',
        className,
      ].filter(Boolean).join(' ')}
      role="img"
      aria-label={`Рейтинг: ${value} из ${max}`}
    >
      {stars}
    </div>
  );
};

// Демо-компонент
export const RatingDemo: React.FC = () => {
  const [value, setValue] = useState(3.5);

  return (
    <div className="rating-demo">
      <h2>Примеры использования Rating</h2>

      <div className="rating-demo-grid">
        <div className="rating-demo-group">
          <h3>Размеры</h3>
          <div className="rating-demo-row">
            <Rating value={3.5} size="small" />
            <Rating value={3.5} size="medium" />
            <Rating value={3.5} size="large" />
          </div>
        </div>

        <div className="rating-demo-group">
          <h3>Варианты</h3>
          <div className="rating-demo-row">
            <Rating value={3.5} variant="primary" />
            <Rating value={3.5} variant="secondary" />
            <Rating value={3.5} variant="success" />
            <Rating value={3.5} variant="warning" />
            <Rating value={3.5} variant="error" />
          </div>
        </div>

        <div className="rating-demo-group">
          <h3>Интерактивный</h3>
          <div className="rating-demo-row">
            <Rating
              value={value}
              onChange={setValue}
              precision={0.5}
            />
            <span className="rating-demo-value">
              Текущее значение: {value}
            </span>
          </div>
        </div>

        <div className="rating-demo-group">
          <h3>Только для чтения</h3>
          <div className="rating-demo-row">
            <Rating value={4.5} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating; 