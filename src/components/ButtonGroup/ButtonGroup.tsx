import React, { ReactNode } from 'react';
import './ButtonGroup.css';

export type ButtonGroupItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  tooltip?: string;
  badge?: string | number;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
};

interface ButtonGroupProps {
  id?: string;
  items: ButtonGroupItem[];
  selectedId?: string;
  direction?: 'horizontal' | 'vertical';
  variant?: 'outlined' | 'contained' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  selectedItemStyle?: React.CSSProperties;
  disabledItemStyle?: React.CSSProperties;
  onItemClick?: (item: ButtonGroupItem) => void;
  onItemHover?: (item: ButtonGroupItem) => void;
  onItemLeave?: (item: ButtonGroupItem) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  id,
  items,
  selectedId,
  direction = 'horizontal',
  variant = 'contained',
  size = 'md',
  className = '',
  style,
  itemStyle,
  selectedItemStyle,
  disabledItemStyle,
  onItemClick,
  onItemHover,
  onItemLeave
}) => {
  const handleItemClick = (item: ButtonGroupItem) => {
    if (item.disabled) return;
    onItemClick?.(item);
  };

  const handleItemHover = (item: ButtonGroupItem) => {
    if (item.disabled) return;
    onItemHover?.(item);
  };

  const handleItemLeave = (item: ButtonGroupItem) => {
    if (item.disabled) return;
    onItemLeave?.(item);
  };

  return (
    <div
      id={id}
      className={`button-group ${direction} ${variant} ${size} ${className}`}
      style={style}
      role="group"
    >
      {items.map((item) => (
        <button
          key={item.id}
          className={`button-group-item ${item.variant || variant} ${item.size || size} ${
            item.disabled ? 'disabled' : ''
          } ${selectedId === item.id ? 'selected' : ''}`}
          style={{
            ...itemStyle,
            ...(selectedId === item.id ? selectedItemStyle : {}),
            ...(item.disabled ? disabledItemStyle : {})
          }}
          onClick={() => handleItemClick(item)}
          onMouseEnter={() => handleItemHover(item)}
          onMouseLeave={() => handleItemLeave(item)}
          disabled={item.disabled}
          title={item.tooltip}
          aria-selected={selectedId === item.id}
        >
          {item.icon && <span className="button-group-icon">{item.icon}</span>}
          {item.label}
          {item.badge && <span className="button-group-badge">{item.badge}</span>}
        </button>
      ))}
    </div>
  );
};

// Демо-компонент для примера использования
export const ButtonGroupDemo: React.FC = () => {
  const items: ButtonGroupItem[] = [
    { id: '1', label: 'Просмотр', icon: '👁️' },
    { id: '2', label: 'Редактирование', icon: '✏️' },
    { id: '3', label: 'Удаление', icon: '🗑️', disabled: true },
    { id: '4', label: 'Экспорт', icon: '📤', badge: '3' }
  ];

  const itemsWithVariants: ButtonGroupItem[] = [
    { id: '1', label: 'Primary', variant: 'primary' },
    { id: '2', label: 'Success', variant: 'success' },
    { id: '3', label: 'Warning', variant: 'warning' },
    { id: '4', label: 'Danger', variant: 'danger' }
  ];

  const itemsWithSizes: ButtonGroupItem[] = [
    { id: '1', label: 'Small', size: 'sm' },
    { id: '2', label: 'Medium', size: 'md' },
    { id: '3', label: 'Large', size: 'lg' }
  ];

  return (
    <div className="button-group-demo">
      <h2>Примеры использования ButtonGroup</h2>

      <h3>Базовый пример</h3>
      <ButtonGroup items={items} selectedId="1" />

      <h3>С разными вариантами</h3>
      <ButtonGroup items={itemsWithVariants} />

      <h3>С разными размерами</h3>
      <ButtonGroup items={itemsWithSizes} />

      <h3>Вертикальное расположение</h3>
      <ButtonGroup items={items} direction="vertical" />

      <h3>Вариант outlined</h3>
      <ButtonGroup items={items} variant="outlined" />

      <h3>Вариант text</h3>
      <ButtonGroup items={items} variant="text" />

      <h3>С кастомными стилями</h3>
      <ButtonGroup
        items={items}
        style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}
        itemStyle={{ color: '#6c757d' }}
        selectedItemStyle={{ color: '#007bff', fontWeight: 'bold' }}
        disabledItemStyle={{ color: '#adb5bd', cursor: 'not-allowed' }}
      />
    </div>
  );
};

export default ButtonGroup; 