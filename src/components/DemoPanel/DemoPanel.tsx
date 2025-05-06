import React, { useState, useEffect } from 'react';
import './DemoPanel.css';
import { CardListDemo } from '../CardList/CardListDemo';
import ProgressBar, { ProgressBarDemo } from '../ProgressBar/ProgressBar';
import { ProgressBarDemoComplex } from '../ProgressBar/ProgressBarDemoComplex';
import DataTable, { DataTableDemo } from '../DataTable/DataTable';
import Notification, { NotificationDemo } from '../Notification/Notification';
import Chart, { ChartDemo } from '../Chart/Chart';

interface DemoPanelProps {
  componentType: 'CardList' | 'ProgressBar' | 'Notification' | 'DataTable' | 'Chart';
}

const DemoPanel: React.FC<DemoPanelProps> = ({ componentType }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('DemoPanel смонтирован, текущий компонент:', componentType);
    setMounted(true);
    return () => {
      setMounted(false);
      console.log('DemoPanel размонтирован');
    };
  }, [componentType]);

  const renderComponent = () => {
    console.log('Рендеринг компонента:', componentType);
    switch (componentType) {
      case 'CardList':
        return <CardListDemo />;
      case 'ProgressBar':
        return <ProgressBarDemoComplex />;
      case 'DataTable':
        return <DataTableDemo />;
      case 'Notification':
        return <NotificationDemo />;
      case 'Chart':
        return <ChartDemo />;
      default:
        return <div className="error-message">Неизвестный компонент: {componentType}</div>;
    }
  };

  const panelStyles = {
    padding: '20px',
    margin: '20px',
    borderRadius: '10px',
    backgroundColor: '#1a1a1a',
    color: 'white'
  };

  return (
    <div className="demo-panel" style={panelStyles}>
      <div className="demo-controls">
        <div className="component-info">
          Текущий компонент: <b>{componentType}</b>
          <span style={{ marginLeft: '10px', color: mounted ? 'green' : 'red' }}>
            {mounted ? '✅ Активен' : '❌ Не активен'}
          </span>
        </div>
      </div>
      
      <div className="demo-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default DemoPanel; 