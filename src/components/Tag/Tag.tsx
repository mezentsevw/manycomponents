import React from 'react';
import './Tag.css';

type TagVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type TagSize = 'small' | 'medium' | 'large';
type TagShape = 'default' | 'rounded' | 'pill';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  shape?: TagShape;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  shape = 'default',
  closable = false,
  onClose,
  className = '',
  onClick,
  icon,
}) => {
  const tagClasses = [
    'tag',
    `tag--${variant}`,
    `tag--${size}`,
    `tag--${shape}`,
    className,
  ].filter(Boolean).join(' ');

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  return (
    <span 
      className={tagClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <span className="tag__icon">{icon}</span>}
      <span className="tag__content">{children}</span>
      {closable && (
        <button 
          className="tag__close"
          onClick={handleClose}
          aria-label="Удалить тег"
        >
          ×
        </button>
      )}
    </span>
  );
};

// Демо-компонент для примера использования
export const TagDemo: React.FC = () => {
  return (
    <div className="tag-demo">
      <h2>Примеры использования Tag</h2>
      
      <div className="tag-demo-grid">
        <div className="tag-demo-group">
          <h3>Варианты</h3>
          <div className="tag-demo-row">
            <Tag variant="primary">Primary</Tag>
            <Tag variant="secondary">Secondary</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="danger">Danger</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="info">Info</Tag>
          </div>
        </div>

        <div className="tag-demo-group">
          <h3>Размеры</h3>
          <div className="tag-demo-row">
            <Tag size="small">Small</Tag>
            <Tag size="medium">Medium</Tag>
            <Tag size="large">Large</Tag>
          </div>
        </div>

        <div className="tag-demo-group">
          <h3>Формы</h3>
          <div className="tag-demo-row">
            <Tag shape="default">Default</Tag>
            <Tag shape="rounded">Rounded</Tag>
            <Tag shape="pill">Pill</Tag>
          </div>
        </div>

        <div className="tag-demo-group">
          <h3>Закрываемые</h3>
          <div className="tag-demo-row">
            <Tag closable>Закрываемый</Tag>
            <Tag variant="success" closable>Успех</Tag>
            <Tag variant="danger" closable>Ошибка</Tag>
          </div>
        </div>

        <div className="tag-demo-group">
          <h3>С иконками</h3>
          <div className="tag-demo-row">
            <Tag icon="🔔">Уведомления</Tag>
            <Tag icon="📧">Почта</Tag>
            <Tag icon="❤️">Избранное</Tag>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag; 