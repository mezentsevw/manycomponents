import React, { ReactNode, useState, useEffect } from 'react';
import './Accordion.css';

interface AccordionProps {
  id?: string;
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  disabled?: boolean;
  icon?: ReactNode;
  customIcon?: boolean;
  animationDuration?: number;
  className?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

const Accordion: React.FC<AccordionProps> = ({
  id,
  title,
  children,
  isOpen = false,
  onToggle,
  disabled = false,
  icon = '▼',
  customIcon = false,
  animationDuration = 300,
  className = '',
  style,
  headerStyle,
  contentStyle
}) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  useEffect(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isExpanded;
    setIsExpanded(newState);
    onToggle?.(newState);
  };

  const getContentStyle = () => {
    const baseStyle = {
      maxHeight: isExpanded ? `${contentHeight}px` : '0',
      transition: `max-height ${animationDuration}ms ease-out`,
      ...contentStyle
    };
    return baseStyle;
  };

  return (
    <div 
      className={`accordion ${className} ${disabled ? 'disabled' : ''}`} 
      id={id}
      style={style}
    >
      <button
        className="accordion-header"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        disabled={disabled}
        style={headerStyle}
      >
        <span className="accordion-title">{title}</span>
        {!customIcon && (
          <span 
            className={`accordion-icon ${isExpanded ? 'expanded' : ''}`}
            style={{ transition: `transform ${animationDuration}ms ease` }}
          >
            {icon}
          </span>
        )}
        {customIcon && (
          <span className="accordion-custom-icon">
            {icon}
          </span>
        )}
      </button>
      <div
        ref={contentRef}
        className={`accordion-content ${isExpanded ? 'expanded' : ''}`}
        style={getContentStyle()}
        aria-hidden={!isExpanded}
      >
        <div className="accordion-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

// Демо-компонент для примера использования
export const AccordionDemo: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  return (
    <div className="accordion-demo">
      <h2>Примеры использования Accordion</h2>
      
      <h3>Базовый пример</h3>
      <Accordion title="Базовый аккордеон">
        <p>Простой пример использования аккордеона с базовыми настройками.</p>
      </Accordion>

      <h3>Управляемый аккордеон</h3>
      <Accordion 
        title="Управляемый аккордеон"
        isOpen={activeAccordion === 1}
        onToggle={(isOpen) => setActiveAccordion(isOpen ? 1 : null)}
      >
        <p>Этот аккордеон управляется извне через состояние.</p>
      </Accordion>

      <h3>Отключенный аккордеон</h3>
      <Accordion 
        title="Отключенный аккордеон"
        disabled
      >
        <p>Этот аккордеон отключен и не может быть открыт.</p>
      </Accordion>

      <h3>Аккордеон с кастомной иконкой</h3>
      <Accordion 
        title="Аккордеон с кастомной иконкой"
        icon="→"
        customIcon
      >
        <p>Этот аккордеон использует кастомную иконку вместо стандартной.</p>
      </Accordion>

      <h3>Аккордеон с медленной анимацией</h3>
      <Accordion 
        title="Аккордеон с медленной анимацией"
        animationDuration={1000}
      >
        <p>Этот аккордеон имеет более медленную анимацию раскрытия.</p>
      </Accordion>
    </div>
  );
};

export default Accordion; 