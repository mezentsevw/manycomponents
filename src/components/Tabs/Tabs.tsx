import React, { useState } from 'react';
import './Tabs.css';

type TabOrientation = 'horizontal' | 'vertical';
type TabVariant = 'default' | 'pills' | 'underline';

interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  orientation?: TabOrientation;
  variant?: TabVariant;
  className?: string;
  onChange?: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveId,
  orientation = 'horizontal',
  variant = 'default',
  className = '',
  onChange,
}) => {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);

  const handleTabClick = (id: string) => {
    if (items.find(item => item.id === id)?.disabled) return;
    setActiveId(id);
    onChange?.(id);
  };

  const activeTab = items.find(item => item.id === activeId);

  const tabsClasses = [
    'tabs',
    `tabs--${orientation}`,
    `tabs--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={tabsClasses}>
      <div className="tabs__header">
        {items.map(item => (
          <button
            key={item.id}
            className={[
              'tabs__tab',
              activeId === item.id && 'tabs__tab--active',
              item.disabled && 'tabs__tab--disabled',
            ].filter(Boolean).join(' ')}
            onClick={() => handleTabClick(item.id)}
            disabled={item.disabled}
          >
            {item.icon && <span className="tabs__icon">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {activeTab?.content}
      </div>
    </div>
  );
};

// Демо-компонент для примера использования
export const TabsDemo: React.FC = () => {
  const items = [
    {
      id: 'tab1',
      label: 'Вкладка 1',
      content: <div>Содержимое вкладки 1</div>,
    },
    {
      id: 'tab2',
      label: 'Вкладка 2',
      content: <div>Содержимое вкладки 2</div>,
    },
    {
      id: 'tab3',
      label: 'Вкладка 3',
      content: <div>Содержимое вкладки 3</div>,
      disabled: true,
    },
  ];

  return (
    <div className="tabs-demo">
      <h2>Примеры использования Tabs</h2>
      
      <div className="tabs-demo-grid">
        <div className="tabs-demo-group">
          <h3>Горизонтальные вкладки</h3>
          <Tabs items={items} />
        </div>

        <div className="tabs-demo-group">
          <h3>Вертикальные вкладки</h3>
          <Tabs items={items} orientation="vertical" />
        </div>

        <div className="tabs-demo-group">
          <h3>Вариант Pills</h3>
          <Tabs items={items} variant="pills" />
        </div>

        <div className="tabs-demo-group">
          <h3>Вариант Underline</h3>
          <Tabs items={items} variant="underline" />
        </div>
      </div>
    </div>
  );
};

export default Tabs; 