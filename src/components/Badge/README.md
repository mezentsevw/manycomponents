# Badge Component

Компонент бейджа для отображения статусов, счетчиков и меток с поддержкой различных вариантов стилизации и анимаций.

## Особенности

- Различные варианты цветов (default, primary, success, warning, error, info)
- Три размера (small, medium, large)
- Три формы (circle, rounded, square)
- Поддержка точек вместо текста
- Ограничение максимального значения для счетчиков
- Возможность отображения нулевых значений
- Позиционирование относительно контента
- Анимации при наведении
- Доступность (ARIA атрибуты)

## Использование

```tsx
import Badge from './Badge';

<Badge content="New" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | - | Уникальный идентификатор компонента |
| content | string \| number \| ReactNode | - | Содержимое бейджа (обязательный) |
| variant | 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'default' | Вариант стилизации |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Размер бейджа |
| shape | 'circle' \| 'rounded' \| 'square' | 'circle' | Форма бейджа |
| max | number | - | Максимальное значение для счетчика |
| showZero | boolean | false | Показывать ли бейдж при нулевом значении |
| dot | boolean | false | Отображать точку вместо текста |
| offset | [number, number] | - | Смещение относительно контента [x, y] |
| className | string | '' | Дополнительные CSS классы |
| style | React.CSSProperties | - | Стили для бейджа |
| onClick | () => void | - | Обработчик клика |
| children | ReactNode | - | Контент, относительно которого позиционируется бейдж |

## Примеры

### Базовое использование
```tsx
<Badge content="New" />
<Badge content={5} />
```

### Варианты стилизации
```tsx
<Badge content="Primary" variant="primary" />
<Badge content="Success" variant="success" />
<Badge content="Warning" variant="warning" />
<Badge content="Error" variant="error" />
<Badge content="Info" variant="info" />
```

### Размеры
```tsx
<Badge content="Small" size="small" />
<Badge content="Medium" size="medium" />
<Badge content="Large" size="large" />
```

### Формы
```tsx
<Badge content="Circle" shape="circle" />
<Badge content="Rounded" shape="rounded" />
<Badge content="Square" shape="square" />
```

### Счетчики
```tsx
<Badge content={5} />
<Badge content={99} max={99} />
<Badge content={0} showZero />
```

### Точки
```tsx
<Badge dot />
<Badge dot variant="primary" />
```

### С контентом
```tsx
<Badge content={5}>
  <span>🔔</span>
</Badge>
```

### Смещение
```tsx
<Badge content={5} offset={[10, 10]}>
  <span>🔔</span>
</Badge>
```

## Стилизация

Компонент использует следующие CSS-классы для стилизации:

- `.badge` - основной класс бейджа
- `.badge-{variant}` - модификатор варианта (default, primary, success и т.д.)
- `.badge-{size}` - модификатор размера (small, medium, large)
- `.badge-{shape}` - модификатор формы (circle, rounded, square)
- `.badge-dot` - модификатор для точки
- `.badge-wrapper` - обертка для бейджа с контентом

## Анимации

Компонент использует следующие анимации:
- `badgePulse` - пульсация при наведении

## Доступность

Компонент поддерживает следующие ARIA атрибуты:
- `role="status"` - для индикации статуса
- `aria-label` - для описания содержимого
- Фокус с помощью клавиатуры 