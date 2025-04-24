import React, { ReactNode } from 'react';
import './Chart.css';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  id?: string;
  type?: 'bar' | 'line' | 'pie' | 'doughnut';
  data?: ChartData[];
  title?: string;
  height?: number;
  children?: ReactNode;
}

const Chart: React.FC<ChartProps> = ({
  id,
  type = 'bar',
  data = [],
  title,
  height = 300,
  children
}) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="chart-container" id={id}>
      {children || (
        <>
          {title && <div className="chart-title">{title}</div>}
          <div className={`chart chart-${type}`} style={{ height: `${height}px` }}>
            {type === 'bar' && data.map((item, index) => (
              <div
                key={index}
                className="chart-bar-item"
                style={{
                  backgroundColor: item.color || getColorByIndex(index),
                  height: `${(item.value / maxValue) * 80}%`
                }}
              >
                <div className="chart-value">{item.value}</div>
                <div className="chart-label">{item.label}</div>
              </div>
            ))}
          </div>
          
          {data.length > 0 && (
            <div className="chart-legend">
              {data.map((item, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: item.color || getColorByIndex(index) }}
                  ></div>
                  <div className="legend-label">{item.label}: {item.value}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

function getColorByIndex(index: number): string {
  const colors = [
    '#2196F3', '#4CAF50', '#FF9800', '#F44336', 
    '#9C27B0', '#673AB7', '#3F51B5', '#00BCD4',
    '#009688', '#FFEB3B', '#FF5722', '#795548'
  ];
  return colors[index % colors.length];
}

// Демо-компонент с примерами графиков
export const ChartDemo: React.FC = () => {
  const salesData = [
    { label: 'Янв', value: 65, color: '#2196F3' },
    { label: 'Фев', value: 80, color: '#4CAF50' },
    { label: 'Мар', value: 55, color: '#FF9800' },
    { label: 'Апр', value: 95, color: '#F44336' },
    { label: 'Май', value: 75, color: '#9C27B0' },
    { label: 'Июн', value: 85, color: '#673AB7' }
  ];

  return (
    <div className="chart-demo">
      <Chart 
        type="bar"
        data={salesData}
        title="Продажи по месяцам"
      />
    </div>
  );
};

export default Chart; 