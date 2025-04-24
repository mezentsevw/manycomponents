import React, { ReactNode, useEffect } from 'react';
import './CardList.css';

interface CardItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
  meta?: string;
}

interface CardListProps {
  id?: string;
  cardItems?: CardItem[];
  children?: ReactNode;
}

const CardList: React.FC<CardListProps> = ({ id, cardItems = defaultCards, children }) => {
  // Логирование для отладки
  useEffect(() => {
    console.log('CardList render:', { cardItems, defaultCards });
  }, [cardItems]);

  // Если есть children, отображаем их
  if (children) {
    return (
      <div className="card-list" id={id}>
        {children}
      </div>
    );
  }

  // Иначе рендерим карточки из переданных данных или дефолтных
  return (
    <div className="card-list" id={id}>
      {cardItems.map((item) => (
        <div key={item.id} className="card">
          <div className="card-header">
            <div className="card-icon">{item.icon || '📊'}</div>
            <h3 className="card-title">{item.title}</h3>
          </div>
          <div className="card-content">
            {item.content}
          </div>
          <div className="card-footer">
            <div className="card-meta">{item.meta || 'Обновлено сегодня'}</div>
            <div className="card-actions">
              <button className="card-button">Подробнее</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Тестовые данные для демонстрации
const defaultCards: CardItem[] = [
  {
    id: '1',
    title: 'Аналитика продаж',
    content: 'Анализ продаж за последний квартал показывает рост на 15% по сравнению с предыдущим периодом.',
    icon: '📈',
    meta: 'Последнее обновление: вчера'
  },
  {
    id: '2',
    title: 'Клиентская база',
    content: 'В этом месяце к нам присоединилось 120 новых клиентов, что на 30% больше, чем в прошлом месяце.',
    icon: '👥',
    meta: 'Обновлено 2 дня назад'
  },
  {
    id: '3',
    title: 'Проекты в разработке',
    content: 'У нас сейчас 5 активных проектов. 3 из них будут завершены в следующем месяце.',
    icon: '🚀',
    meta: 'Статус: В процессе'
  },
  {
    id: '4',
    title: 'Финансовый отчет',
    content: 'Доходы выросли на 12%, а расходы уменьшились на 5% благодаря оптимизации процессов.',
    icon: '💰',
    meta: 'Квартал 2, 2023'
  }
];

// Статический компонент для демонстрации
export const CardListDemo: React.FC = () => {
  return (
    <div className="card-list">
      {defaultCards.map((item) => (
        <div key={item.id} className="card">
          <div className="card-header">
            <div className="card-icon">{item.icon}</div>
            <h3 className="card-title">{item.title}</h3>
          </div>
          <div className="card-content">
            {item.content}
          </div>
          <div className="card-footer">
            <div className="card-meta">{item.meta}</div>
            <div className="card-actions">
              <button className="card-button">Подробнее</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList; 