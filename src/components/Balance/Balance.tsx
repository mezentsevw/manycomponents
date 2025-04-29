import React from 'react';
import './Balance.css';

export interface BalanceProps {
  /** Значение баланса */
  value: number;
  /** Валюта */
  currency?: string;
  /** Дополнительные CSS классы */
  className?: string;
}

export const Balance: React.FC<BalanceProps> = ({
  value,
  currency = '₽',
  className = '',
}) => {
  const formattedValue = new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return (
    <div className={`balance ${className}`}>
      <span className="balance__value">{formattedValue}</span>
      <span className="balance__currency">{currency}</span>
    </div>
  );
}; 