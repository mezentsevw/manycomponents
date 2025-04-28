import React, { ReactNode } from 'react';
import './Badge.css';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeShape = 'circle' | 'rounded' | 'square';

interface BadgeProps {
  id?: string;
  content: string | number | ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  max?: number;
  showZero?: boolean;
  dot?: boolean;
  offset?: [number, number];
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  id,
  content,
  variant = 'default',
  size = 'medium',
  shape = 'circle',
  max,
  showZero = false,
  dot = false,
  offset,
  className = '',
  style,
  onClick,
  children
}) => {
  const shouldShowBadge = showZero || (typeof content === 'number' ? content > 0 : true);

  const formatContent = () => {
    if (typeof content === 'number' && max && content > max) {
      return `${max}+`;
    }
    return content;
  };

  const getOffsetStyle = () => {
    if (!offset) return {};
    return {
      right: `${offset[0]}px`,
      top: `${offset[1]}px`
    };
  };

  if (!shouldShowBadge && !children) return null;

  const badgeClasses = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    `badge-${shape}`,
    dot ? 'badge-dot' : '',
    className
  ].filter(Boolean).join(' ');

  const badgeContent = !dot ? formatContent() : null;

  if (children) {
    return (
      <div className="badge-wrapper" id={id} style={style}>
        {children}
        {shouldShowBadge && (
          <span 
            className={badgeClasses}
            style={getOffsetStyle()}
            onClick={onClick}
          >
            {badgeContent}
          </span>
        )}
      </div>
    );
  }

  return (
    <span 
      className={badgeClasses}
      id={id}
      style={style}
      onClick={onClick}
    >
      {badgeContent}
    </span>
  );
};

// Демо-компонент для примера использования
export const BadgeDemo: React.FC = () => {
  return (
    <div className="badge-demo">
      <h2>Примеры использования Badge</h2>

      <h3>Базовые варианты</h3>
      <div className="badge-demo-row">
        <Badge content="Default" />
        <Badge content="Primary" variant="primary" />
        <Badge content="Success" variant="success" />
        <Badge content="Warning" variant="warning" />
        <Badge content="Error" variant="error" />
        <Badge content="Info" variant="info" />
      </div>

      <h3>Размеры</h3>
      <div className="badge-demo-row">
        <Badge content="Small" size="small" />
        <Badge content="Medium" size="medium" />
        <Badge content="Large" size="large" />
      </div>

      <h3>Формы</h3>
      <div className="badge-demo-row">
        <Badge content="Circle" shape="circle" />
        <Badge content="Rounded" shape="rounded" />
        <Badge content="Square" shape="square" />
      </div>

      <h3>Счетчики</h3>
      <div className="badge-demo-row">
        <Badge content={5} />
        <Badge content={99} max={99} />
        <Badge content={0} showZero />
        <Badge content={0} />
      </div>

      <h3>Точки</h3>
      <div className="badge-demo-row">
        <Badge dot />
        <Badge dot variant="primary" />
        <Badge dot variant="success" />
      </div>

      <h3>С иконками</h3>
      <div className="badge-demo-row">
        <Badge content="🔔">
          <span className="icon">🔔</span>
        </Badge>
        <Badge content="📧">
          <span className="icon">📧</span>
        </Badge>
        <Badge content="❤️">
          <span className="icon">❤️</span>
        </Badge>
      </div>

      <h3>Смещение</h3>
      <div className="badge-demo-row">
        <Badge content={5} offset={[10, 10]}>
          <span className="icon">🔔</span>
        </Badge>
        <Badge content={3} offset={[-5, 5]}>
          <span className="icon">📧</span>
        </Badge>
      </div>
    </div>
  );
};

export default Badge; 