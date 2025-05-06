import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import './ProgressBar.css';

/**
 * Демонстрационный компонент для ProgressBar, показывающий различные уровни детализации
 */
export const ProgressBarDemoComplex: React.FC = () => {
  const [detailLevel, setDetailLevel] = useState<number>(2); // Начинаем со стандартного уровня
  const [progress, setProgress] = useState<number>(65);

  useEffect(() => {
    console.log('ProgressBarDemoComplex компонент смонтирован, текущий уровень детализации:', detailLevel);
    return () => {
      console.log('ProgressBarDemoComplex компонент размонтирован');
    };
  }, [detailLevel]);

  // Обработчик изменения уровня детализации
  const handleDetailLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseInt(e.target.value, 10);
    setDetailLevel(newLevel);
  };

  // Обработчик изменения значения прогресса
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value, 10);
    setProgress(newProgress);
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
        return "&lt;ProgressBar value={65} detailLevel={0} /&gt;";
      case 1:
        return "&lt;ProgressBar value={65} type=\"primary\" detailLevel={1} /&gt;";
      case 2:
        return "&lt;ProgressBar value={65} type=\"success\" showLabel={true} detailLevel={2} /&gt;";
      case 3:
        return "&lt;ProgressBar\n  value={65}\n  type=\"warning\"\n  title=\"Загрузка файла\"\n  detailLevel={3}\n/&gt;";
      case 4:
        return "&lt;ProgressBar\n  value={65}\n  max={100}\n  type=\"error\"\n  animated={true}\n  title=\"Загрузка файла\"\n  description=\"Осталось примерно 5 минут до завершения\"\n  detailLevel={4}\n/&gt;";
      default:
        return "&lt;ProgressBar value={65} /&gt;";
    }
  };

  return (
    <div className="progress-bar-demo-complex">
      <h2>Демонстрация ProgressBar</h2>
      
      {/* Описание компонента */}
      <div className="component-description" style={{ 
        background: 'rgba(0, 0, 0, 0.05)', 
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Описание компонента</h3>
        <p>
          <strong>ProgressBar</strong> - компонент для отображения индикатора прогресса. Может использоваться для показа
          прогресса загрузки, выполнения операций, заполнения форм или любых других процессов, требующих визуального отображения.
        </p>
        <h4 style={{ margin: '15px 0 5px 0' }}>Аргументы на вход:</h4>
        <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
          <li><code>value: number</code> - текущее значение прогресса</li>
          <li><code>max?: number</code> - максимальное значение прогресса (по умолчанию 100)</li>
          <li><code>type?: 'primary' | 'success' | 'warning' | 'error'</code> - тип прогресс-бара</li>
          <li><code>showLabel?: boolean</code> - показывать ли метку процента</li>
          <li><code>animated?: boolean</code> - анимировать ли заполнение</li>
          <li><code>className?: string</code> - дополнительные CSS классы</li>
          <li><code>detailLevel?: number</code> - уровень детализации (0-4)</li>
          <li><code>title?: string</code> - заголовок (для уровней 3-4)</li>
          <li><code>description?: string</code> - описание (для уровня 4)</li>
        </ul>
        <h4 style={{ margin: '15px 0 5px 0' }}>Использование LLM:</h4>
        <p>
          Компонент подходит для создания интуитивно понятных индикаторов прогресса в интерфейсах.
          Поддерживает несколько уровней детализации для разной сложности отображения - от минимальной 
          до полной с дополнительными метриками и описаниями.
        </p>
      </div>

      {/* Управление значением прогресса */}
      <div className="detail-slider-container">
        <div className="detail-slider-label">
          <span>Значение прогресса:</span>
          <span>{progress}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={progress}
          onChange={handleProgressChange}
          className="detail-slider"
        />
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
        background: 'rgba(0, 0, 0, 0.05)', 
        padding: '15px',
        borderRadius: '8px',
        marginTop: '15px',
        fontFamily: 'monospace',
        whiteSpace: 'pre'
      }}>
        <div style={{ marginBottom: '5px', fontSize: '14px', color: '#555' }}>
          Пример кода для уровня {detailLevel}:
        </div>
        <div dangerouslySetInnerHTML={{ __html: getDetailLevelCode() }} />
      </div>

      {/* Текущая конфигурация */}
      <div style={{ 
        background: 'rgba(0, 0, 0, 0.05)', 
        padding: '10px', 
        margin: '15px 0', 
        borderRadius: '4px',
        color: '#555'
      }}>
        Уровень детализации: {detailLevel} ({getDetailLevelText()}), Прогресс: {progress}%
      </div>

      {/* Демонстрация с текущим уровнем детализации */}
      <div className="progress-bar-demo-item">
        <h3>Отображение с уровнем детализации {detailLevel}</h3>
        
        {detailLevel === 0 && (
          <ProgressBar 
            value={progress} 
            detailLevel={detailLevel} 
          />
        )}
        
        {detailLevel === 1 && (
          <ProgressBar 
            value={progress} 
            type="primary"
            detailLevel={detailLevel} 
          />
        )}
        
        {detailLevel === 2 && (
          <ProgressBar 
            value={progress} 
            type="success"
            showLabel={true}
            detailLevel={detailLevel} 
          />
        )}
        
        {detailLevel === 3 && (
          <ProgressBar 
            value={progress} 
            type="warning"
            title="Загрузка файла"
            detailLevel={detailLevel} 
          />
        )}
        
        {detailLevel === 4 && (
          <ProgressBar 
            value={progress} 
            max={100}
            type="error"
            animated={true}
            title="Загрузка файла"
            description="Осталось примерно 5 минут до завершения"
            detailLevel={detailLevel} 
          />
        )}
      </div>

      {/* Демонстрация всех типов прогресс-баров */}
      <div className="progress-bar-demo-item">
        <h3>Все типы прогресс-баров (уровень {detailLevel})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <p style={{ margin: '0 0 5px 0', color: '#555' }}>Primary</p>
            <ProgressBar 
              value={progress} 
              type="primary" 
              detailLevel={detailLevel}
              title="Загрузка контента"
              description="Происходит загрузка основных данных" 
            />
          </div>
          <div>
            <p style={{ margin: '0 0 5px 0', color: '#555' }}>Success</p>
            <ProgressBar 
              value={Math.min(progress + 15, 100)} 
              type="success" 
              detailLevel={detailLevel}
              title="Отправка формы"
              description="Сохранение данных на сервере" 
            />
          </div>
          <div>
            <p style={{ margin: '0 0 5px 0', color: '#555' }}>Warning</p>
            <ProgressBar 
              value={Math.max(progress - 15, 0)} 
              type="warning" 
              detailLevel={detailLevel}
              title="Сканирование системы"
              description="Проверка наличия обновлений" 
            />
          </div>
          <div>
            <p style={{ margin: '0 0 5px 0', color: '#555' }}>Error</p>
            <ProgressBar 
              value={Math.max(progress - 30, 0)} 
              type="error" 
              detailLevel={detailLevel}
              title="Проверка безопасности"
              description="Выполняется сканирование на наличие угроз" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 