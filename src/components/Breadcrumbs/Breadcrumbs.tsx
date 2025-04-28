import React, { ReactNode } from 'react';
import './Breadcrumbs.css';

export type BreadcrumbItem = {
  label: string;
  path?: string;
  icon?: ReactNode;
  disabled?: boolean;
};

interface BreadcrumbsProps {
  id?: string;
  items: BreadcrumbItem[];
  separator?: string | ReactNode;
  maxItems?: number;
  className?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  activeItemStyle?: React.CSSProperties;
  disabledItemStyle?: React.CSSProperties;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  id,
  items,
  separator = '/',
  maxItems,
  className = '',
  style,
  itemStyle,
  activeItemStyle,
  disabledItemStyle,
  onItemClick
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    if (item.disabled || !item.path) return;
    onItemClick?.(item, index);
  };

  const renderItems = () => {
    if (!maxItems || items.length <= maxItems || expanded) {
      return items.map((item, index) => (
        <React.Fragment key={index}>
          <span
            className={`breadcrumb-item ${item.disabled ? 'disabled' : ''} ${index === items.length - 1 ? 'active' : ''}`}
            style={{
              ...itemStyle,
              ...(index === items.length - 1 ? activeItemStyle : {}),
              ...(item.disabled ? disabledItemStyle : {})
            }}
            onClick={() => handleItemClick(item, index)}
          >
            {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
            {item.label}
          </span>
          {index < items.length - 1 && (
            <span className="breadcrumb-separator">{separator}</span>
          )}
        </React.Fragment>
      ));
    }

    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const middleItems = items.slice(1, -1);

    return (
      <>
        <span
          className={`breadcrumb-item ${firstItem.disabled ? 'disabled' : ''}`}
          style={{
            ...itemStyle,
            ...(firstItem.disabled ? disabledItemStyle : {})
          }}
          onClick={() => handleItemClick(firstItem, 0)}
        >
          {firstItem.icon && <span className="breadcrumb-icon">{firstItem.icon}</span>}
          {firstItem.label}
        </span>
        <span className="breadcrumb-separator">{separator}</span>
        <span
          className="breadcrumb-ellipsis"
          onClick={() => setExpanded(true)}
        >
          ...
        </span>
        <span className="breadcrumb-separator">{separator}</span>
        <span
          className="breadcrumb-item active"
          style={{
            ...itemStyle,
            ...activeItemStyle
          }}
          onClick={() => handleItemClick(lastItem, items.length - 1)}
        >
          {lastItem.icon && <span className="breadcrumb-icon">{lastItem.icon}</span>}
          {lastItem.label}
        </span>
      </>
    );
  };

  return (
    <nav
      id={id}
      className={`breadcrumbs ${className}`}
      style={style}
      aria-label="breadcrumb"
    >
      {renderItems()}
    </nav>
  );
};

// Демо-компонент для примера использования
export const BreadcrumbsDemo: React.FC = () => {
  const items: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Каталог', path: '/catalog' },
    { label: 'Электроника', path: '/catalog/electronics' },
    { label: 'Смартфоны', path: '/catalog/electronics/smartphones' },
    { label: 'Apple', path: '/catalog/electronics/smartphones/apple' },
    { label: 'iPhone 13', path: '/catalog/electronics/smartphones/apple/iphone-13' }
  ];

  const itemsWithIcons: BreadcrumbItem[] = [
    { label: 'Главная', path: '/', icon: '🏠' },
    { label: 'Документы', path: '/docs', icon: '📁' },
    { label: 'Отчеты', path: '/docs/reports', icon: '📊' },
    { label: '2023', path: '/docs/reports/2023', icon: '📅' }
  ];

  const itemsWithDisabled: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Настройки', path: '/settings' },
    { label: 'Профиль', path: '/settings/profile', disabled: true },
    { label: 'Редактирование', path: '/settings/profile/edit' }
  ];

  return (
    <div className="breadcrumbs-demo">
      <h2>Примеры использования Breadcrumbs</h2>

      <h3>Базовый пример</h3>
      <Breadcrumbs items={items} />

      <h3>С иконками</h3>
      <Breadcrumbs items={itemsWithIcons} />

      <h3>С отключенными элементами</h3>
      <Breadcrumbs items={itemsWithDisabled} />

      <h3>С кастомным разделителем</h3>
      <Breadcrumbs items={items} separator="→" />

      <h3>С ограничением количества элементов</h3>
      <Breadcrumbs items={items} maxItems={3} />

      <h3>С кастомными стилями</h3>
      <Breadcrumbs
        items={items}
        style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}
        itemStyle={{ color: '#6c757d' }}
        activeItemStyle={{ color: '#007bff', fontWeight: 'bold' }}
        disabledItemStyle={{ color: '#adb5bd', cursor: 'not-allowed' }}
      />
    </div>
  );
};

export default Breadcrumbs; 