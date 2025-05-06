import React, { ReactNode, ReactElement, useState, useCallback, useEffect } from 'react';
import Card from './Card';
import type { CardProps } from './Card';
import { Balance } from './Balance';
import { Icon } from './Icon';
import './CardList.css';

export interface CardItem {
  id: string;
  balance?: number;
  icon?: string;
}

export interface CardListProps {
  id?: string;
  cardItems?: CardItem[];
  children?: React.ReactNode;
  className?: string;
  onSelectCard?: (cardId: string) => void;
  detailLevel?: number; // Уровень детализации от 0 до 4
}

export const isCard = (element: ReactElement): element is ReactElement<CardProps> => {
  return element.type === Card;
};

/**
 * Компонент CardList - отображает список карточек с различными уровнями детализации
 * 
 * @param {string} id - Идентификатор компонента
 * @param {CardItem[]} cardItems - Массив данных для карточек
 * @param {React.ReactNode} children - Дочерние элементы (для ручного формирования карточек)
 * @param {string} className - Дополнительные CSS классы
 * @param {function} onSelectCard - Функция обратного вызова при выборе карточки
 * @param {number} detailLevel - Уровень детализации (0-4)
 * 
 * Уровни детализации:
 * 0: Минимальный - только контейнер
 * 1: Базовый - простые карточки только с id
 * 2: Стандартный - карточки с ID как children
 * 3: Расширенный - карточки с балансом и иконкой
 * 4: Полный - карточки с вложенными компонентами Balance и Icon
 */
const CardList: React.FC<CardListProps> = ({ 
  id, 
  cardItems, 
  children, 
  className = '',
  onSelectCard,
  detailLevel = 2 // По умолчанию стандартный уровень детализации
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>();
  
  useEffect(() => {
    console.log('CardList смонтирован', { id, cardItems, detailLevel });
  }, [id, cardItems, detailLevel]);

  // Базовые стили для гарантированного отображения
  const cardListStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#333',
    color: 'white',
    width: '100%',
    minHeight: '100px'
  };
  
  // Обработчик клика по карточке
  const handleCardClick = useCallback((cardId?: string) => {
    console.log('Клик по карточке', cardId);
    if (cardId) {
      setSelectedCardId(cardId);
      if (onSelectCard) {
        onSelectCard(cardId);
      }
    }
  }, [onSelectCard]);

  // Уровень 0: Минимальный - только контейнер
  if (detailLevel === 0) {
    return (
      <div 
        className={`card-list ${className}`} 
        id={id || 'card-list'}
        style={cardListStyles}
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div style={{ textAlign: 'center', padding: '20px', color: '#aaa' }}>
          Пустой контейнер карточек
        </div>
      </div>
    );
  }

  // Уровень 1: Базовый - простые карточки только с id
  if (detailLevel === 1) {
    const items = cardItems || [
      { id: 'card-1' },
      { id: 'card-2' },
      { id: 'card-3' }
    ];
    
    return (
      <div 
        className={`card-list ${className}`} 
        id={id || 'card-list'}
        style={cardListStyles}
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div style={{ marginBottom: '10px', color: '#aaa' }}>
          Карточек: {items.length}
        </div>
        {items.map((item) => (
          <Card 
            key={item.id} 
            id={item.id} 
            onClick={handleCardClick}
          />
        ))}
      </div>
    );
  }

  // Уровень 2: Стандартный - карточки c children в виде Card с id
  if (detailLevel === 2) {
    const defaultCards = (
      <>
        <Card id="card-1" />
        <Card id="card-2" />
        <Card id="card-3" />
      </>
    );
    
    return (
      <div 
        className={`card-list ${className}`} 
        id={id || 'card-list'}
        style={cardListStyles}
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div style={{ marginBottom: '10px', color: '#aaa' }}>
          Карточек: {React.Children.count(children) || 3}
        </div>
        {children || defaultCards}
      </div>
    );
  }

  // Уровень 3: Расширенный - карточки с балансом и иконкой
  if (detailLevel === 3) {
    const items = cardItems || [
      { id: 'card-1', balance: 5000, icon: '💰' },
      { id: 'card-2', balance: 7500, icon: '💳' },
      { id: 'card-3', balance: 12000, icon: '🏦' }
    ];
    
    return (
      <div 
        className={`card-list ${className}`} 
        id={id || 'card-list'}
        style={cardListStyles}
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div style={{ marginBottom: '10px', color: '#aaa' }}>
          Карточек: {items.length}
        </div>
        {items.map((item) => (
          <Card 
            key={item.id} 
            id={item.id} 
            balance={item.balance} 
            icon={item.icon}
            onClick={handleCardClick}
          />
        ))}
      </div>
    );
  }

  // Уровень 4: Полный - карточки с вложенными компонентами
  if (detailLevel === 4) {
    // Используем заранее импортированные компоненты Balance и Icon
    return (
      <div 
        className={`card-list ${className}`} 
        id={id || 'card-list'}
        style={cardListStyles}
        data-detail-level={detailLevel}
      >
        <div className="detail-level-indicator">
          Уровень: {detailLevel}
        </div>
        <div style={{ marginBottom: '10px', color: '#aaa' }}>
          Карточек: {3}
        </div>
        <Card id="custom-1" onClick={handleCardClick}>
          <div className="custom-card-content">
            <Balance value={8500} />
            <Icon name="💰" />
            <div className="card-details">
              <div className="card-title">Основной счет</div>
              <div className="card-subtitle">Дебетовая карта</div>
            </div>
          </div>
        </Card>
        <Card id="custom-2" onClick={handleCardClick}>
          <div className="custom-card-content">
            <Balance value={15000} />
            <Icon name="💳" />
            <div className="card-details">
              <div className="card-title">Кредитный счет</div>
              <div className="card-subtitle">Кредитная линия</div>
            </div>
          </div>
        </Card>
        <Card id="custom-3" onClick={handleCardClick}>
          <div className="custom-card-content">
            <Balance value={3000} />
            <Icon name="🏦" />
            <div className="card-details">
              <div className="card-title">Накопительный счет</div>
              <div className="card-subtitle">Сбережения</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  
  // Если передан какой-то другой уровень детализации, используем стандартный уровень 2
  console.log('Неизвестный уровень детализации, используем уровень 2');
  return (
    <div 
      className={`card-list ${className}`} 
      id={id || 'card-list'}
      style={cardListStyles}
      data-detail-level={2}
    >
      <div className="detail-level-indicator">
        Уровень: 2 (стандартный)
      </div>
      <div style={{ marginBottom: '10px', color: '#aaa' }}>
        Карточек: {React.Children.count(children) || 3}
      </div>
      {children || (
        <>
          <Card id="card-1" onClick={handleCardClick} />
          <Card id="card-2" onClick={handleCardClick} />
          <Card id="card-3" onClick={handleCardClick} />
        </>
      )}
    </div>
  );
};

export { Card };
export default CardList; 