import React from 'react';
import './Badge.css';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';
type BadgeShape = 'circle' | 'square' | 'pill';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  className?: string;
  onClick?: () => void;
  count?: number;
  maxCount?: number;
  dot?: boolean;
  showZero?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  shape = 'circle',
  className = '',
  onClick,
  count,
  maxCount = 99,
  dot = false,
  showZero = false,
}) => {
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    `badge--${shape}`,
    className,
  ].filter(Boolean).join(' ');

  const shouldShowCount = count !== undefined && (count > 0 || showZero);
  const displayCount = count && count > maxCount ? `${maxCount}+` : count;

  return (
    <div className="badge-wrapper">
      {children}
      {(shouldShowCount || dot) && (
        <span 
          className={badgeClasses}
          onClick={onClick}
          role={onClick ? 'button' : undefined}
          tabIndex={onClick ? 0 : undefined}
        >
          {!dot && displayCount}
        </span>
      )}
    </div>
  );
};

// Демо-компонент для примера использования
export const BadgeDemo: React.FC = () => {
  return (
    <div className="badge-demo">
      <h2>Примеры использования Badge</h2>
      
      <div className="badge-demo-grid">
        <div className="badge-demo-group">
          <h3>Варианты</h3>
          <div className="badge-demo-row">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>

        <div className="badge-demo-group">
          <h3>Размеры</h3>
          <div className="badge-demo-row">
            <Badge size="small">Small</Badge>
            <Badge size="medium">Medium</Badge>
            <Badge size="large">Large</Badge>
          </div>
        </div>

        <div className="badge-demo-group">
          <h3>Формы</h3>
          <div className="badge-demo-row">
            <Badge shape="circle">Circle</Badge>
            <Badge shape="square">Square</Badge>
            <Badge shape="pill">Pill</Badge>
          </div>
        </div>

        <div className="badge-demo-group">
          <h3>Счетчики</h3>
          <div className="badge-demo-row">
            <Badge count={5}>Уведомления</Badge>
            <Badge count={100} maxCount={99}>Сообщения</Badge>
            <Badge count={0} showZero>Задачи</Badge>
          </div>
        </div>

        <div className="badge-demo-group">
          <h3>Точки</h3>
          <div className="badge-demo-row">
            <Badge dot>Новые</Badge>
            <Badge dot variant="success">Активные</Badge>
            <Badge dot variant="danger">Важные</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badge; 