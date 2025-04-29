import React, { useState, useRef, useEffect } from 'react';
import './VirtualList.css';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  containerHeight: number;
  overscanCount?: number;
  className?: string;
}

export const VirtualList = <T,>({
  items,
  itemHeight,
  renderItem,
  containerHeight,
  overscanCount = 3,
  className = '',
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const endIndex = Math.min(
    startIndex + visibleCount + overscanCount,
    items.length - 1
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  return (
    <div
      ref={containerRef}
      className={`virtual-list ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div
        className="virtual-list__inner"
        style={{ height: totalHeight }}
      >
        <div
          className="virtual-list__items"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              className="virtual-list__item"
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Демо-компонент
export const VirtualListDemo: React.FC = () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    text: `Элемент ${i + 1}`,
  }));

  return (
    <div className="virtual-list-demo">
      <h2>Пример использования VirtualList</h2>
      <VirtualList
        items={items}
        itemHeight={50}
        containerHeight={400}
        renderItem={(item) => (
          <div className="demo-item">
            {item.text}
          </div>
        )}
      />
    </div>
  );
};

export default VirtualList; 