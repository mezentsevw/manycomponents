# Breadcrumbs Component

Компонент навигационной цепочки (хлебных крошек) для отображения текущего местоположения пользователя в иерархии страниц.

## Особенности

- Поддержка иконок для элементов
- Возможность отключения элементов
- Кастомные разделители
- Ограничение количества отображаемых элементов
- Адаптивный дизайн
- Анимации при взаимодействии
- Доступность (ARIA атрибуты)
- Поддержка кастомных стилей

## Использование

```tsx
import Breadcrumbs from './Breadcrumbs';

const items = [
  { label: 'Главная', path: '/' },
  { label: 'Каталог', path: '/catalog' },
  { label: 'Товары', path: '/catalog/products' }
];

<Breadcrumbs items={items} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | - | Уникальный идентификатор компонента |
| items | BreadcrumbItem[] | - | Массив элементов навигации (обязательный) |
| separator | string \| ReactNode | '/' | Разделитель между элементами |
| maxItems | number | - | Максимальное количество отображаемых элементов |
| className | string | '' | Дополнительные CSS классы |
| style | React.CSSProperties | - | Стили для основного контейнера |
| itemStyle | React.CSSProperties | - | Стили для элементов навигации |
| activeItemStyle | React.CSSProperties | - | Стили для активного элемента |
| disabledItemStyle | React.CSSProperties | - | Стили для отключенных элементов |
| onItemClick | (item: BreadcrumbItem, index: number) => void | - | Обработчик клика по элементу |

### BreadcrumbItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Текст элемента (обязательный) |
| path | string | - | Путь для навигации |
| icon | ReactNode | - | Иконка элемента |
| disabled | boolean | false | Отключение элемента |

## Примеры

### Базовое использование
```tsx
const items = [
  { label: 'Главная', path: '/' },
  { label: 'Каталог', path: '/catalog' },
  { label: 'Товары', path: '/catalog/products' }
];

<Breadcrumbs items={items} />
```

### С иконками
```tsx
const items = [
  { label: 'Главная', path: '/', icon: '🏠' },
  { label: 'Документы', path: '/docs', icon: '📁' },
  { label: 'Отчеты', path: '/docs/reports', icon: '📊' }
];

<Breadcrumbs items={items} />
```

### С отключенными элементами
```tsx
const items = [
  { label: 'Главная', path: '/' },
  { label: 'Настройки', path: '/settings' },
  { label: 'Профиль', path: '/settings/profile', disabled: true },
  { label: 'Редактирование', path: '/settings/profile/edit' }
];

<Breadcrumbs items={items} />
```

### С кастомным разделителем
```tsx
<Breadcrumbs items={items} separator="→" />
```

### С ограничением количества элементов
```tsx
<Breadcrumbs items={items} maxItems={3} />
```

### С кастомными стилями
```tsx
<Breadcrumbs
  items={items}
  style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}
  itemStyle={{ color: '#6c757d' }}
  activeItemStyle={{ color: '#007bff', fontWeight: 'bold' }}
  disabledItemStyle={{ color: '#adb5bd', cursor: 'not-allowed' }}
/>
```

## Стилизация

Компонент использует следующие CSS-классы для стилизации:

- `.breadcrumbs` - основной контейнер
- `.breadcrumb-item` - элемент навигации
- `.breadcrumb-item.active` - активный элемент
- `.breadcrumb-item.disabled` - отключенный элемент
- `.breadcrumb-icon` - контейнер для иконки
- `.breadcrumb-separator` - разделитель
- `.breadcrumb-ellipsis` - многоточие при ограничении элементов

## Анимации

Компонент использует следующие анимации:
- `breadcrumbFadeIn` - плавное появление элементов

## Доступность

Компонент поддерживает следующие ARIA атрибуты:
- `aria-label="breadcrumb"` - для основного контейнера
- `aria-current="page"` - для активного элемента
- Фокус с помощью клавиатуры
- Поддержка навигации с помощью клавиатуры

## Адаптивность

Компонент адаптируется под различные размеры экрана:
- На мобильных устройствах уменьшается размер шрифта и отступы
- При недостатке места элементы переносятся на новую строку 