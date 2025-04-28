import React from 'react';
import './Chip.css';

type ChipVariant = 'filled' | 'outlined';
type ChipColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  icon?: React.ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filled',
  color = 'default',
  icon,
  onDelete,
  onClick,
  disabled = false,
  className = '',
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onDelete) {
      onDelete();
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const chipClasses = [
    'chip',
    `chip--${variant}`,
    `chip--${color}`,
    disabled && 'chip--disabled',
    onClick && 'chip--clickable',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={chipClasses}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      {icon && <span className="chip__icon">{icon}</span>}
      <span className="chip__label">{label}</span>
      {onDelete && (
        <button
          className="chip__delete"
          onClick={handleDelete}
          disabled={disabled}
          aria-label="Удалить"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

// Демо-компонент
export const ChipDemo: React.FC = () => {
  const handleDelete = () => console.log('Delete clicked');
  const handleClick = () => console.log('Chip clicked');

  return (
    <div className="chip-demo">
      <h2>Примеры использования Chip</h2>

      <div className="chip-demo-grid">
        <div className="chip-demo-group">
          <h3>Варианты</h3>
          <div className="chip-demo-row">
            <Chip label="Filled Chip" variant="filled" />
            <Chip label="Outlined Chip" variant="outlined" />
          </div>
        </div>

        <div className="chip-demo-group">
          <h3>Цвета</h3>
          <div className="chip-demo-row">
            <Chip label="Default" color="default" />
            <Chip label="Primary" color="primary" />
            <Chip label="Success" color="success" />
            <Chip label="Warning" color="warning" />
            <Chip label="Error" color="error" />
          </div>
        </div>

        <div className="chip-demo-group">
          <h3>С иконкой и удалением</h3>
          <div className="chip-demo-row">
            <Chip
              label="С иконкой"
              icon={<span>👋</span>}
            />
            <Chip
              label="Удаляемый"
              onDelete={handleDelete}
            />
            <Chip
              label="Полный"
              icon={<span>🌟</span>}
              onDelete={handleDelete}
            />
          </div>
        </div>

        <div className="chip-demo-group">
          <h3>Интерактивность</h3>
          <div className="chip-demo-row">
            <Chip
              label="Кликабельный"
              onClick={handleClick}
            />
            <Chip
              label="Отключенный"
              disabled
              onClick={handleClick}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chip; 