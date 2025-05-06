import React, { useState, useEffect } from 'react';
import './CardList.css';

export interface CardProps {
  id?: string;
  balance?: number;
  icon?: string;
  children?: React.ReactNode;
  onClick?: (id?: string) => void;
}

const Card: React.FC<CardProps> = ({ id, balance, icon, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    console.log('Card смонтирован', { id, balance, icon });
  }, [id, balance, icon]);

  // Базовые стили для гарантированного отображения
  const baseCardStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#333',
    color: 'white',
    margin: '5px 0',
    cursor: 'pointer',
    position: 'relative' as const,
    minHeight: '60px'
  };

  const activeStyles = isActive ? {
    borderColor: '#2196F3',
    boxShadow: '0 0 0 2px rgba(33, 150, 243, 0.4)'
  } : {};

  const hoverStyles = isHovered ? {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
  } : {};

  const cardStyle = {
    ...baseCardStyle,
    ...activeStyles,
    ...hoverStyles
  };
  
  // Обработка клика по карточке
  const handleClick = () => {
    console.log('Клик по карточке', id);
    if (onClick) {
      onClick(id);
      setIsActive(prev => !prev);
    }
  };

  // Формируем классы для карточки
  const cardClassName = `card ${isHovered ? 'card--hover' : ''} ${isActive ? 'card--active' : ''} ${!id && !balance && !icon && !children ? 'card--empty' : ''}`;

  // Если есть дочерние элементы, используем их
  if (children) {
    return (
      <div 
        className={cardClassName}
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {id && <div className="card__id" style={{ fontSize: '12px', opacity: 0.7, backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '3px' }}>
          ID: {id}
        </div>}
        {children}
        {isHovered && (
          <div className="card__overlay" style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="card__action" style={{
              padding: '6px 12px',
              backgroundColor: 'rgba(33, 150, 243, 0.8)',
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              Нажмите для выбора
            </div>
          </div>
        )}
      </div>
    );
  }

  // Если нет дочерних элементов, но есть данные, отображаем их
  if (balance !== undefined || icon || id) {
    return (
      <div 
        className={cardClassName}
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {id && <div className="card__id" style={{ fontSize: '12px', opacity: 0.7, backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '3px' }}>
          ID: {id}
        </div>}
        <div className="card__content" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
          {balance !== undefined && <div className="card__balance" style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {balance.toLocaleString()} ₽
          </div>}
          {icon && <div className="card__icon" style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>}
        </div>
        {isHovered && (
          <div className="card__overlay" style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="card__action" style={{
              padding: '6px 12px',
              backgroundColor: 'rgba(33, 150, 243, 0.8)',
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              Нажмите для выбора
            </div>
          </div>
        )}
      </div>
    );
  }

  // Если нет никаких данных, отображаем плейсхолдер
  return (
    <div 
      className={cardClassName}
      style={{
        ...baseCardStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px dashed #444',
        justifyContent: 'center',
        cursor: 'default'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card__placeholder" style={{ width: '100%', textAlign: 'center', fontStyle: 'italic', opacity: 0.5 }}>
        Пустая карточка
      </div>
      {isHovered && (
        <div className="card__overlay" style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="card__action" style={{
            padding: '6px 12px',
            backgroundColor: 'rgba(33, 150, 243, 0.8)',
            color: 'white',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            Нет действий
          </div>
        </div>
      )}
    </div>
  );
};

export default Card; 