import React from 'react';
import './Card.css';

export interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'elevated' | 'outlined' | 'filled';
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  imageAlt,
  actions,
  children,
  className = '',
  onClick,
  variant = 'elevated'
}) => {
  return (
    <div
      className={`card ${variant} ${onClick ? 'clickable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt || title} />
        </div>
      )}
      <div className="card-content">
        {(title || subtitle) && (
          <div className="card-header">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="card-body">{children}</div>
      </div>
      {actions && <div className="card-actions">{actions}</div>}
    </div>
  );
};

// Демо-компонент для примера использования
export const CardDemo: React.FC = () => {
  return (
    <div className="card-demo">
      <h2>Примеры использования Card</h2>
      
      <div className="card-demo-grid">
        <div className="card-demo-group">
          <h3>Варианты</h3>
          <div className="card-demo-row">
            <Card
              variant="elevated"
              title="Elevated Card"
              subtitle="С тенью"
            >
              <p>Содержимое карточки с тенью</p>
            </Card>

            <Card
              variant="outlined"
              title="Outlined Card"
              subtitle="С обводкой"
            >
              <p>Содержимое карточки с обводкой</p>
            </Card>

            <Card
              variant="filled"
              title="Filled Card"
              subtitle="С фоном"
            >
              <p>Содержимое карточки с фоном</p>
            </Card>
          </div>
        </div>

        <div className="card-demo-group">
          <h3>С изображением</h3>
          <div className="card-demo-row">
            <Card
              title="Card с изображением"
              subtitle="Подзаголовок"
              image="https://picsum.photos/400/200"
              imageAlt="Пример изображения"
            >
              <p>Карточка с изображением и текстовым содержимым</p>
            </Card>
          </div>
        </div>

        <div className="card-demo-group">
          <h3>С действиями</h3>
          <div className="card-demo-row">
            <Card
              title="Card с действиями"
              actions={
                <div className="card-actions-demo">
                  <button>Действие 1</button>
                  <button>Действие 2</button>
                </div>
              }
            >
              <p>Карточка с кнопками действий внизу</p>
            </Card>
          </div>
        </div>

        <div className="card-demo-group">
          <h3>Кликабельная</h3>
          <div className="card-demo-row">
            <Card
              title="Кликабельная карточка"
              onClick={() => alert('Карточка нажата!')}
            >
              <p>Нажмите на карточку</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card; 