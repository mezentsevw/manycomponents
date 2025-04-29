import React, { useState } from 'react';
import './DemoPanel.css';
import CardList from '../CardList/CardList';
import { CardListDemo } from '../CardList/CardListDemo';
import ProgressBar, { ProgressBarDemo } from '../ProgressBar/ProgressBar';
import DataTable, { DataTableDemo } from '../DataTable/DataTable';
import Notification, { NotificationDemo } from '../Notification/Notification';
import Chart, { ChartDemo } from '../Chart/Chart';

interface DemoPanelProps {
  componentType: 'CardList' | 'ProgressBar' | 'Notification' | 'DataTable' | 'Chart';
}

const DemoPanel: React.FC<DemoPanelProps> = ({ componentType }) => {
  const [detailLevel, setDetailLevel] = useState<0 | 1 | 2 | 3 | 4>(0);

  const renderComponent = () => {
    switch (componentType) {
      case 'CardList':
        return <CardListDemo detailLevel={detailLevel} />;
      case 'ProgressBar':
        return <ProgressBarDemo />;
      case 'DataTable':
        return <DataTableDemo />;
      case 'Notification':
        return <NotificationDemo />;
      case 'Chart':
        return <ChartDemo />;
      default:
        return null;
    }
  };

  return (
    <div className="demo-panel">
      <div className="demo-controls">
        <div className="control-group">
          <label htmlFor="detailLevel">Уровень детализации:</label>
          <input
            type="range"
            id="detailLevel"
            min="0"
            max="4"
            value={detailLevel}
            onChange={(e) => setDetailLevel(Number(e.target.value) as 0 | 1 | 2 | 3 | 4)}
          />
          <span>{detailLevel}</span>
        </div>
      </div>
      <div className="demo-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default DemoPanel; 