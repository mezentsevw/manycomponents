import React from 'react';
import './CardList.css';

export interface BalanceProps {
  value: number;
  className?: string;
}

export const Balance: React.FC<BalanceProps> = ({ value, className = '' }) => {
  return (
    <div className={`card__balance ${className}`}>
      {value.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2,
      })}
    </div>
  );
}; 