import React, { useState } from 'react';
import './DemoPanel.css';
import CardList, { CardListDemo } from '../CardList/CardList';
import ProgressBar, { ProgressBarDemo } from '../ProgressBar/ProgressBar';
import DataTable, { DataTableDemo } from '../DataTable/DataTable';
import Notification, { NotificationDemo } from '../Notification/Notification';
import Chart, { ChartDemo } from '../Chart/Chart';

interface DemoPanelProps {
  componentType: 'CardList' | 'ProgressBar' | 'Notification' | 'DataTable' | 'Chart';
}

const DemoPanel: React.FC<DemoPanelProps> = ({ componentType }) => {
  const [detailLevel, setDetailLevel] = useState(2);
  const [count, setCount] = useState(4);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const renderComponent = () => {
    switch (componentType) {
      case 'CardList':
        return renderCardList();
      case 'ProgressBar':
        return renderProgressBar();
      case 'DataTable':
        return renderDataTable();
      case 'Notification':
        return renderNotification();
      case 'Chart':
        return renderChart();
      default:
        return null;
    }
  };

  // Заглушка для компонентов, которые еще не реализованы
  const renderPlaceholder = (name: string, icon: string) => {
    return (
      <div className="component-placeholder">
        <div className="placeholder-icon">{icon}</div>
        <h3>Компонент "{name}" в разработке</h3>
        <p>Этот компонент скоро будет доступен. Следите за обновлениями!</p>
      </div>
    );
  };

  const renderCardList = () => {
    // Используем статический демо-компонент для гарантированного отображения
    if (detailLevel <= 1 || detailLevel >= 3) {
      return <CardListDemo />;
    }
    
    // Для уровня детализации 2 попробуем создать динамические карточки
    try {
      const items = Array(count).fill(null).map((_, i) => ({
        id: `${i + 1}`,
        title: `Карточка ${i + 1}`,
        content: `Это тестовое содержимое для карточки номер ${i + 1}`,
        icon: ['📊', '📈', '📱', '💻', '🔍'][i % 5],
        meta: `Пример ${i + 1}`
      }));
      
      return <CardList cardItems={items} id="dynamic-card-list" />;
    } catch (error) {
      console.error('Error rendering CardList:', error);
      return <CardListDemo />;
    }
  };

  const renderProgressBar = () => {
    if (detailLevel <= 1) {
      // Простой прогресс-бар
      const value = detailLevel === 0 ? 25 : 75;
      return (
        <ProgressBar 
          value={value} 
          max={100} 
          label="Тестовый прогресс" 
          animated={animationEnabled} 
        />
      );
    } else if (detailLevel === 2) {
      // Несколько прогресс-баров разных цветов
      return <ProgressBarDemo />;
    } else {
      // Создаем набор прогресс-баров на основе count
      return (
        <div className="progress-bar-demo">
          {Array(count).fill(null).map((_, i) => (
            <ProgressBar 
              key={i}
              value={Math.round(Math.random() * 100)} 
              label={`Прогресс ${i + 1}`} 
              color={['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'][i % 5]}
              animated={animationEnabled}
            />
          ))}
        </div>
      );
    }
  };

  const renderDataTable = () => {
    if (detailLevel <= 1) {
      // Простая таблица с минимальными данными
      const columns = [
        { key: 'id', title: 'ID', width: '60px' },
        { key: 'name', title: 'Имя' },
        { key: 'value', title: 'Значение' }
      ];
      
      const data = Array(count).fill(null).map((_, i) => ({
        id: i + 1,
        name: `Элемент ${i + 1}`,
        value: Math.round(Math.random() * 1000)
      }));
      
      return (
        <DataTable 
          title="Простая таблица" 
          columns={columns} 
          data={data} 
          showPagination={detailLevel === 1}
        />
      );
    } else if (detailLevel === 2) {
      // Демо-таблица
      return <DataTableDemo />;
    } else {
      // Более сложная таблица
      const columns = [
        { key: 'id', title: 'ID', width: '60px', sortable: true },
        { key: 'name', title: 'Товар', sortable: true },
        { key: 'category', title: 'Категория', sortable: true },
        { key: 'price', title: 'Цена', sortable: true },
        { key: 'stock', title: 'На складе', sortable: true },
        { key: 'rating', title: 'Рейтинг', sortable: true }
      ];
      
      const categories = ['Электроника', 'Одежда', 'Продукты', 'Дом', 'Спорт'];
      
      const data = Array(count * 2).fill(null).map((_, i) => ({
        id: i + 1,
        name: `Товар ${i + 1}`,
        category: categories[i % categories.length],
        price: Math.round(Math.random() * 10000) / 100,
        stock: Math.round(Math.random() * 100),
        rating: (Math.random() * 5).toFixed(1)
      }));
      
      return (
        <DataTable 
          title="Каталог товаров" 
          columns={columns} 
          data={data} 
          showPagination={true}
          pageSize={detailLevel === 3 ? 5 : 10}
        />
      );
    }
  };

  const renderNotification = () => {
    if (detailLevel === 0) {
      // Простое уведомление
      return (
        <Notification
          type="info"
          title="Тестовое уведомление"
          message="Это пример простого информационного уведомления"
          closable={true}
          autoClose={false}
        />
      );
    } else if (detailLevel === 1) {
      // Набор простых уведомлений
      const types = ['info', 'success', 'warning', 'error'];
      return (
        <div className="notification-list">
          {types.map((type, index) => (
            <Notification
              key={index}
              type={type as 'info' | 'success' | 'warning' | 'error'}
              title={`Уведомление типа ${type}`}
              message={`Это пример уведомления типа ${type}`}
              closable={true}
              autoClose={false}
            />
          ))}
        </div>
      );
    } else {
      // Демо-компонент с добавлением уведомлений
      return <NotificationDemo />;
    }
  };

  const renderChart = () => {
    if (detailLevel === 0) {
      // Простой график
      const data = [
        { label: 'A', value: 30 },
        { label: 'B', value: 70 },
        { label: 'C', value: 50 }
      ];
      return (
        <Chart 
          type="bar"
          data={data}
          title="Простой график"
        />
      );
    } else if (detailLevel === 1) {
      // График с данными на основе count
      const data = Array(count).fill(null).map((_, i) => ({
        label: String.fromCharCode(65 + i), // A, B, C, ...
        value: Math.round(Math.random() * 100),
        color: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'][i % 5]
      }));
      return (
        <Chart
          type="bar"
          data={data}
          title="Динамический график"
        />
      );
    } else {
      // Демо-график
      return <ChartDemo />;
    }
  };

  return (
    <div className="demo-panel">
      <div className="controls">
        <div className="control-group">
          <label>Уровень детализации: {detailLevel}</label>
          <input
            type="range"
            min="0"
            max="4"
            value={detailLevel}
            onChange={(e) => setDetailLevel(Number(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Количество элементов: {count}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>
            <input 
              type="checkbox" 
              checked={animationEnabled}
              onChange={(e) => setAnimationEnabled(e.target.checked)}
            />
            Анимация
          </label>
        </div>
      </div>
      <div className="component-preview">
        {renderComponent()}
      </div>
    </div>
  );
};

export default DemoPanel; 