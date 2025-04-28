import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
type TooltipVariant = 'default' | 'light' | 'dark';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'default',
  delay = 0,
  className = '',
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  let timeoutId: NodeJS.Timeout;

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutId = setTimeout(() => {
      if (triggerRef.current && tooltipRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        
        let top = 0;
        let left = 0;

        switch (position) {
          case 'top':
            top = triggerRect.top - tooltipRect.height - 8;
            left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
            break;
          case 'right':
            top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
            left = triggerRect.right + 8;
            break;
          case 'bottom':
            top = triggerRect.bottom + 8;
            left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
            break;
          case 'left':
            top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
            left = triggerRect.left - tooltipRect.width - 8;
            break;
        }

        setCoords({ top, left });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const tooltipClasses = [
    'tooltip',
    `tooltip--${position}`,
    `tooltip--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="tooltip-wrapper">
      <div
        ref={triggerRef}
        className="tooltip-trigger"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={tooltipClasses}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// Демо-компонент для примера использования
export const TooltipDemo: React.FC = () => {
  return (
    <div className="tooltip-demo">
      <h2>Примеры использования Tooltip</h2>
      
      <div className="tooltip-demo-grid">
        <div className="tooltip-demo-group">
          <h3>Позиции</h3>
          <div className="tooltip-demo-row">
            <Tooltip content="Подсказка сверху" position="top">
              <button>Top</button>
            </Tooltip>
            <Tooltip content="Подсказка справа" position="right">
              <button>Right</button>
            </Tooltip>
            <Tooltip content="Подсказка снизу" position="bottom">
              <button>Bottom</button>
            </Tooltip>
            <Tooltip content="Подсказка слева" position="left">
              <button>Left</button>
            </Tooltip>
          </div>
        </div>

        <div className="tooltip-demo-group">
          <h3>Варианты</h3>
          <div className="tooltip-demo-row">
            <Tooltip content="Стандартная подсказка" variant="default">
              <button>Default</button>
            </Tooltip>
            <Tooltip content="Светлая подсказка" variant="light">
              <button>Light</button>
            </Tooltip>
            <Tooltip content="Темная подсказка" variant="dark">
              <button>Dark</button>
            </Tooltip>
          </div>
        </div>

        <div className="tooltip-demo-group">
          <h3>С задержкой</h3>
          <div className="tooltip-demo-row">
            <Tooltip content="Появляется через 500мс" delay={500}>
              <button>Задержка 500мс</button>
            </Tooltip>
            <Tooltip content="Появляется через 1000мс" delay={1000}>
              <button>Задержка 1000мс</button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip; 