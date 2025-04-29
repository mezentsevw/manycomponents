import React, { ReactNode } from 'react';
import './CardList.css';

export interface CardItem {
  id: string;
  balance?: number;
  icon?: string;
}

export interface CardProps {
  id?: string;
  balance?: number;
  icon?: string;
  children?: React.ReactNode;
}

export interface CardListProps {
  id?: string;
  cardItems?: CardItem[];
  children?: React.ReactNode;
  level?: 0 | 1 | 2 | 3 | 4;
}

const Card: React.FC<CardProps> = ({ id, balance, icon, children }) => {
  if (children) {
    return <div className="card">{children}</div>;
  }

  return (
    <div className="card">
      {balance !== undefined && <div className="card__balance">{balance}</div>}
      {icon && <div className="card__icon">{icon}</div>}
    </div>
  );
};

const CardList: React.FC<CardListProps> = ({ id, cardItems, children, level = 0 }) => {
  // Уровень 0: только id
  if (level === 0) {
    return <div className="card-list" id={id} />;
  }

  // Уровень 1: массив cardItems
  if (level === 1 && cardItems) {
    return (
      <div className="card-list" id={id}>
        {cardItems.map((item) => (
          <Card key={item.id} id={item.id} />
        ))}
      </div>
    );
  }

  // Уровень 2: дети с id
  if (level === 2) {
    return (
      <div className="card-list" id={id}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<CardProps>(child) && child.type === Card) {
            return React.cloneElement(child, { id: child.props.id || '' } as CardProps);
          }
          return child;
        })}
      </div>
    );
  }

  // Уровень 3: дети с balance и icon
  if (level === 3) {
    return (
      <div className="card-list" id={id}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<CardProps>(child) && child.type === Card) {
            return React.cloneElement(child, {
              balance: child.props.balance,
              icon: child.props.icon,
            } as CardProps);
          }
          return child;
        })}
      </div>
    );
  }

  // Уровень 4: полная структура с Balance и Icon
  return (
    <div className="card-list" id={id}>
      {children}
    </div>
  );
};

// Экспортируем Card для использования в демо
export { Card };

export default CardList; 