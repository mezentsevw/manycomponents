# Radio

Компонент радио-кнопки с кастомным дизайном.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| checked | boolean | Yes | - | Состояние радио-кнопки |
| onChange | (checked: boolean) => void | Yes | - | Обработчик изменения состояния |
| label | string | No | - | Текст метки |
| className | string | No | - | Дополнительные CSS классы |

## Usage

```tsx
import { Radio } from './components/Radio';

// Пример использования
<Radio
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
  label="Опция 1"
/>
```

## Особенности

- Кастомный дизайн радио-кнопки
- Плавные анимации при взаимодействии
- Поддержка метки (label)
- Доступность (ARIA-совместимость)
- Адаптивный дизайн 