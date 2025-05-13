import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import './CardList.css';

/**
 * Демонстрационный компонент для CardList, показывающий различные уровни детализации
 */
export const CardListDemo: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>();
  const [detailLevel, setDetailLevel] = useState<number>(2); // Начинаем со стандартного уровня

  useEffect(() => { 
    console.log('CardListDemo компонент смонтирован, текущий уровень детализации:', detailLevel);
    return () => {
      console.log('CardListDemo компонент размонтирован');
    };
  }, [detailLevel]);

  // Демонстрационные данные для карточек
  const demoCards = [
    { id: '1', balance: 5000, icon: '💰' },
    { id: '2', balance: 7500, icon: '💳' },
    { id: '3', balance: 12000, icon: '🏦' },
    { id: '4', balance: 9000, icon: '💵' },
  ];

  // Обработчик выбора карточки
  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(cardId);
    console.log(`Выбрана карточка с ID: ${cardId}`);
  };

  // Обработчик изменения уровня детализации
  const handleDetailLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseInt(e.target.value, 10);
    setDetailLevel(newLevel);
  };

  // Получаем текстовое описание уровня детализации
  const getDetailLevelText = () => {
    switch (detailLevel) {
      case 0: return 'Минимальный';
      case 1: return 'Базовый';
      case 2: return 'Стандартный';
      case 3: return 'Расширенный';
      case 4: return 'Полный';
      default: return 'Стандартный';
    }
  };

  // Получаем пример кода для текущего уровня детализации
  const getDetailLevelCode = () => {
    switch (detailLevel) {
      case 0:
        return "<CardList id=\"my-card-list\" />";
      case 1:
        return "<CardList cardItems={[{ id: \"1\" }, { id: \"2\" }]} />";
      case 2:
        return "<CardList>\n  <Card id=\"card-1\" />\n  <Card id=\"card-2\" />\n</CardList>";
      case 3:
        return "<CardList cardItems={[{ id: \"1\", balance: 5000, icon: \"💰\" }]} />";
      case 4:
        return "<CardList>\n  <Card id=\"card-1\">\n    <Balance value={8500} />\n    <Icon name=\"💰\" />\n  </Card>\n</CardList>";
      default:
        return "<CardList />";
    }
  };

  return (
    <div className="card-list-demo">
      <h2>Демонстрация CardList</h2>
      
      {/* Описание компонента */}
      <div className="component-description" style={{ 
        background: 'rgba(0, 0, 0, 0.2)', 
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Описание компонента</h3>
        <p>
          <strong>CardList</strong> - компонент для отображения списка карточек. Может использоваться для демонстрации
          платежных карт, счетов, финансовых продуктов или любых других элементов, требующих выбора пользователем.
        </p>
        <h4 style={{ margin: '15px 0 5px 0' }}>Аргументы на вход:</h4>
        <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
          <li><code>id?: string</code> - идентификатор компонента</li>
          <li><code>cardItems?: CardItem[]</code> - массив данных для карточек</li>
          <li><code>children?: React.ReactNode</code> - дочерние элементы</li>
          <li><code>className?: string</code> - дополнительные CSS классы</li>
          <li><code>onSelectCard?: (cardId: string) =&gt; void</code> - обработчик выбора карточки</li>
          <li><code>detailLevel?: number</code> - уровень детализации (0-4)</li>
        </ul>
        <h4 style={{ margin: '15px 0 5px 0' }}>Использование LLM:</h4>
        <p>
          Компонент подходит для создания интерактивных интерфейсов выбора с визуальным представлением данных.
          Поддерживает несколько уровней детализации для разной сложности отображения - от простых элементов до
          сложных композиций с вложенными компонентами.
        </p>
      </div>

      {/* Ползунок уровня детализации */}
      <div className="detail-slider-container">
        <div className="detail-slider-label">
          <span>Уровень детализации: <span className="detail-level">{getDetailLevelText()}</span></span>
          <span>{detailLevel}/4</span>
        </div>
        <input
          type="range"
          min="0"
          max="4"
          step="1"
          value={detailLevel}
          onChange={handleDetailLevelChange}
          className="detail-slider"
        />
      </div>

      {/* Пример кода для текущего уровня */}
      <div style={{ 
        background: 'rgba(0, 0, 0, 0.3)', 
        padding: '15px',
        borderRadius: '8px',
        marginTop: '15px',
        fontFamily: 'monospace',
        whiteSpace: 'pre'
      }}>
        <div style={{ marginBottom: '5px', fontSize: '14px', color: '#aaa' }}>
          Пример кода для уровня {detailLevel}:
        </div>
        {getDetailLevelCode()}
      </div>

      {/* Информация о выбранной карточке */}
      {selectedCardId && (
        <div className="selected-card-info">
          <div className="selected-card-badge">
            Выбрана карточка: <span className="selected-card-id">{selectedCardId}</span>
          </div>
          <button 
            className="clear-selection"
            onClick={() => setSelectedCardId(undefined)}
          >
            Сбросить выбор
          </button>
        </div>
      )}

      {/* Текущая конфигурация */}
      <div style={{ 
        background: 'rgba(0, 0, 0, 0.2)', 
        padding: '10px', 
        margin: '15px 0', 
        borderRadius: '4px' 
      }}>
        Уровень детализации: {detailLevel} ({getDetailLevelText()}), Выбранная карточка: {selectedCardId || 'нет'}
      </div>

      {/* Демонстрация карточек с текущим уровнем детализации */}
      <div className="card-list-demo-container">
        <div className="card-list-demo-item">
          <h3>Отображение с уровнем детализации {detailLevel}</h3>
          <div className="card-list-wrapper">
            <CardList 
              cardItems={demoCards} 
              onSelectCard={handleCardSelect} 
              detailLevel={detailLevel} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 