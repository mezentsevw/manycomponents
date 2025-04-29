import React from 'react';
import './CardList.css';

export interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  return (
    <div className={`card__icon ${className}`}>
      {name}
    </div>
  );
}; 