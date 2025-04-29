import React, { useState, useRef, useEffect, useCallback } from 'react';
import './InfiniteScroll.css';

export interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading?: boolean;
  threshold?: number;
  className?: string;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
}

export const InfiniteScroll = <T,>({
  items,
  renderItem,
  loadMore,
  hasMore,
  isLoading = false,
  threshold = 200,
  className = '',
  loader = <div className="infinite-scroll__loader">Загрузка...</div>,
  endMessage = <div className="infinite-scroll__end">Конец списка</div>,
}: InfiniteScrollProps<T>) => {
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoading || isFetching || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < threshold;

    if (isNearBottom) {
      setIsFetching(true);
      loadMore().finally(() => setIsFetching(false));
    }
  }, [isLoading, isFetching, hasMore, threshold, loadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className={`infinite-scroll ${className}`}
    >
      <div className="infinite-scroll__items">
        {items.map((item, index) => renderItem(item, index))}
      </div>
      {isLoading && loader}
      {!hasMore && !isLoading && items.length > 0 && endMessage}
    </div>
  );
};

// Демо-компонент
export const InfiniteScrollDemo: React.FC = () => {
  const [items, setItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    setIsLoading(true);
    // Имитация загрузки данных
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItems = Array.from(
      { length: 20 },
      (_, i) => items.length + i
    );
    
    setItems(prev => [...prev, ...newItems]);
    setHasMore(items.length < 100);
    setIsLoading(false);
  };

  return (
    <div className="infinite-scroll-demo">
      <h2>Пример использования InfiniteScroll</h2>
      <div className="infinite-scroll-demo__grid">
        <div className="infinite-scroll-demo__item">
          <h3>Базовый пример</h3>
          <InfiniteScroll
            items={items}
            renderItem={(item) => (
              <div key={item} className="infinite-scroll-demo__item-content">
                Элемент #{item}
              </div>
            )}
            loadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll; 