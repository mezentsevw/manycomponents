# DemoPanel

Компонент для демонстрации и тестирования других компонентов с возможностью настройки параметров.

## Использование

```tsx
import { DemoPanel } from './DemoPanel';

// Демонстрация компонента CardList
<DemoPanel componentType="CardList" />

// Демонстрация компонента ProgressBar
<DemoPanel componentType="ProgressBar" />

// Демонстрация компонента DataTable
<DemoPanel componentType="DataTable" />
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| componentType | 'CardList' \| 'ProgressBar' \| 'Notification' \| 'DataTable' \| 'Chart' | - | Тип демонстрируемого компонента |

## Возможности

### Управление параметрами
- Уровень детализации (0-4)
- Количество элементов
- Включение/выключение анимации

### Поддерживаемые компоненты
- CardList - список карточек
- ProgressBar - индикатор прогресса
- Notification - уведомления
- DataTable - таблица данных
- Chart - графики

## Примеры

### Демонстрация CardList
```tsx
<DemoPanel componentType="CardList" />
```

### Демонстрация ProgressBar
```tsx
<DemoPanel componentType="ProgressBar" />
```

### Демонстрация DataTable
```tsx
<DemoPanel componentType="DataTable" />
```

### Демонстрация Notification
```tsx
<DemoPanel componentType="Notification" />
```

### Демонстрация Chart
```tsx
<DemoPanel componentType="Chart" />
```

## Стилизация

Компонент использует CSS-классы для стилизации:

- `.demo-panel` - основной контейнер
- `.controls` - панель управления
- `.control-group` - группа элементов управления
- `.component-preview` - область предпросмотра компонента
- `.component-placeholder` - плейсхолдер для компонентов в разработке

Вы можете переопределить стили, используя эти классы. 