import React from 'react';
import './Timeline.css';

type TimelineOrientation = 'horizontal' | 'vertical';
type TimelineVariant = 'default' | 'compact' | 'detailed';

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: React.ReactNode;
  status?: 'success' | 'warning' | 'error' | 'info';
}

interface TimelineProps {
  items: TimelineItem[];
  orientation?: TimelineOrientation;
  variant?: TimelineVariant;
  className?: string;
  onItemClick?: (itemId: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = 'vertical',
  variant = 'default',
  className = '',
  onItemClick,
}) => {
  const timelineClasses = [
    'timeline',
    `timeline--${orientation}`,
    `timeline--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={timelineClasses}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const itemClasses = [
          'timeline__item',
          `timeline__item--${item.status || 'default'}`,
          onItemClick && 'timeline__item--clickable',
        ].filter(Boolean).join(' ');

        return (
          <React.Fragment key={item.id}>
            <div
              className={itemClasses}
              onClick={() => onItemClick?.(item.id)}
            >
              <div className="timeline__item-content">
                <div className="timeline__item-icon">
                  {item.icon || (
                    <div className="timeline__item-dot" />
                  )}
                </div>
                <div className="timeline__item-info">
                  <div className="timeline__item-title">{item.title}</div>
                  {item.description && (
                    <div className="timeline__item-description">
                      {item.description}
                    </div>
                  )}
                  <div className="timeline__item-date">{item.date}</div>
                </div>
              </div>
            </div>
            {!isLast && <div className="timeline__connector" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Демо-компонент для примера использования
export const TimelineDemo: React.FC = () => {
  const items = [
    {
      id: '1',
      title: 'Создание проекта',
      description: 'Инициализация нового проекта React',
      date: '2024-01-01',
      status: 'success',
    },
    {
      id: '2',
      title: 'Добавление компонентов',
      description: 'Разработка базовых компонентов UI',
      date: '2024-01-15',
      status: 'info',
    },
    {
      id: '3',
      title: 'Тестирование',
      description: 'Проведение unit-тестов',
      date: '2024-02-01',
      status: 'warning',
    },
    {
      id: '4',
      title: 'Деплой',
      description: 'Развертывание на продакшн',
      date: '2024-02-15',
      status: 'error',
    },
  ];

  return (
    <div className="timeline-demo">
      <h2>Примеры использования Timeline</h2>
      
      <div className="timeline-demo-grid">
        <div className="timeline-demo-group">
          <h3>Вертикальная хронология</h3>
          <Timeline items={items} />
        </div>

        <div className="timeline-demo-group">
          <h3>Горизонтальная хронология</h3>
          <Timeline items={items} orientation="horizontal" />
        </div>

        <div className="timeline-demo-group">
          <h3>Компактный вариант</h3>
          <Timeline items={items} variant="compact" />
        </div>

        <div className="timeline-demo-group">
          <h3>Подробный вариант</h3>
          <Timeline items={items} variant="detailed" />
        </div>
      </div>
    </div>
  );
};

export default Timeline; 