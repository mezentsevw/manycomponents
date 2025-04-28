# Checkbox

Компонент чекбокса с кастомным дизайном.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| checked | boolean | Yes | - | Состояние чекбокса |
| onChange | (checked: boolean) => void | Yes | - | Обработчик изменения состояния |
| label | string | No | - | Текст метки |
| className | string | No | - | Дополнительные CSS классы |

## Usage

```tsx
import { Checkbox } from './components/Checkbox';

// Example usage
<Checkbox
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
  label="Согласен с условиями"
/>
``` 