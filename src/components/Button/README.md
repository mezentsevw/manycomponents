# Button

Компонент кнопки с различными вариантами стилей, размерами и состояниями.

## Использование

```tsx
import { Button } from './Button';

// Базовое использование
<Button>Нажми меня</Button>

// С вариантом и размером
<Button variant="primary" size="lg">Большая кнопка</Button>

// С иконками
<Button 
  startIcon={<AddIcon />}
  endIcon={<ArrowIcon />}
>
  С иконками
</Button>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| variant | 'primary' \| 'secondary' \| 'outline' \| 'text' | 'primary' | Вариант стиля кнопки |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Размер кнопки |
| disabled | boolean | false | Отключение кнопки |
| loading | boolean | false | Состояние загрузки |
| fullWidth | boolean | false | Занимает всю доступную ширину |
| startIcon | React.ReactNode | - | Иконка в начале кнопки |
| endIcon | React.ReactNode | - | Иконка в конце кнопки |
| onClick | () => void | - | Обработчик клика |
| type | 'button' \| 'submit' \| 'reset' | 'button' | Тип кнопки |
| className | string | - | Дополнительные CSS классы |
| children | React.ReactNode | - | Содержимое кнопки |

## Примеры

### Варианты кнопок
```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="text">Text</Button>
```

### Размеры
```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Состояния
```tsx
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
```

### С иконками
```tsx
<Button startIcon={<span>🔍</span>}>Search</Button>
<Button endIcon={<span>→</span>}>Next</Button>
```

### Full Width
```tsx
<Button fullWidth>Full Width Button</Button>
```

## Стилизация

Компонент использует CSS-классы для стилизации:

- `.button` - базовая кнопка
- `.button.primary` - основной вариант
- `.button.secondary` - вторичный вариант
- `.button.outline` - контурный вариант
- `.button.text` - текстовый вариант
- `.button.sm` - маленький размер
- `.button.md` - средний размер
- `.button.lg` - большой размер
- `.button.loading` - состояние загрузки
- `.button.full-width` - полная ширина
- `.button-icon` - иконка
- `.button-loader` - индикатор загрузки

Вы можете переопределить стили, используя эти классы. 