import React, { useState, useRef, useEffect } from 'react';
import './SplitPanel.css';

interface SplitPanelProps {
  direction?: 'horizontal' | 'vertical';
  initialSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  children: [React.ReactNode, React.ReactNode];
}

export const SplitPanel: React.FC<SplitPanelProps> = ({
  direction = 'horizontal',
  initialSize = 50,
  minSize = 20,
  maxSize = 80,
  className = '',
  children,
}) => {
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let newSize;

    if (direction === 'horizontal') {
      const totalWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;
      newSize = (mouseX / totalWidth) * 100;
    } else {
      const totalHeight = containerRect.height;
      const mouseY = e.clientY - containerRect.top;
      newSize = (mouseY / totalHeight) * 100;
    }

    // Ограничиваем размер в пределах minSize и maxSize
    newSize = Math.max(minSize, Math.min(maxSize, newSize));
    setSize(newSize);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const panelStyle = {
    [direction === 'horizontal' ? 'width' : 'height']: `${size}%`,
  };

  const secondPanelStyle = {
    [direction === 'horizontal' ? 'width' : 'height']: `${100 - size}%`,
  };

  return (
    <div 
      ref={containerRef}
      className={`split-panel ${className} split-panel--${direction}`}
    >
      <div className="split-panel__first" style={panelStyle}>
        {children[0]}
      </div>
      <div 
        className="split-panel__divider"
        onMouseDown={handleMouseDown}
      />
      <div className="split-panel__second" style={secondPanelStyle}>
        {children[1]}
      </div>
    </div>
  );
};

// Демо-компонент
export const SplitPanelDemo: React.FC = () => {
  return (
    <div className="split-panel-demo">
      <h2>Примеры использования SplitPanel</h2>
      
      <div className="split-panel-demo-grid">
        <div className="split-panel-demo-group">
          <h3>Горизонтальное разделение</h3>
          <SplitPanel>
            <div className="demo-panel">Левая панель</div>
            <div className="demo-panel">Правая панель</div>
          </SplitPanel>
        </div>

        <div className="split-panel-demo-group">
          <h3>Вертикальное разделение</h3>
          <SplitPanel direction="vertical">
            <div className="demo-panel">Верхняя панель</div>
            <div className="demo-panel">Нижняя панель</div>
          </SplitPanel>
        </div>

        <div className="split-panel-demo-group">
          <h3>С ограничениями размера</h3>
          <SplitPanel minSize={30} maxSize={70}>
            <div className="demo-panel">Левая панель (30-70%)</div>
            <div className="demo-panel">Правая панель</div>
          </SplitPanel>
        </div>
      </div>
    </div>
  );
};

export default SplitPanel; 