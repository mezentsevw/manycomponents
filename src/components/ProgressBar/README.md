# ProgressBar

Компонент индикатора прогресса с поддержкой разных типов и анимации.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| value | number | Yes | - | Текущее значение прогресса |
| max | number | No | 100 | Максимальное значение прогресса |
| type | 'primary' \| 'success' \| 'warning' \| 'error' | No | 'primary' | Тип индикатора прогресса |
| showLabel | boolean | No | false | Показывать ли процентное значение |
| animated | boolean | No | false | Включить анимацию изменения значения |
| className | string | No | - | Дополнительные CSS классы |

## Usage

```tsx
import { ProgressBar } from './components/ProgressBar';

// Пример использования
<ProgressBar
  value={75}
  type="primary"
  showLabel
  animated
/>
```

## Примеры типов индикаторов

```tsx
// Основной
<ProgressBar
  value={75}
  type="primary"
  showLabel
/>

// Успех
<ProgressBar
  value={75}
  type="success"
  showLabel
/>

// Предупреждение
<ProgressBar
  value={75}
  type="warning"
  showLabel
/>

// Ошибка
<ProgressBar
  value={75}
  type="error"
  showLabel
/>
```

## Особенности

- 4 типа индикаторов (primary, success, warning, error)
- Поддержка анимации изменения значения
- Отображение процентного значения
- Плавные переходы при изменении значения
- Адаптивный дизайн
- Кастомные цвета для разных типов
- Поддержка максимального значения 