# Select

Компонент выбора из выпадающего списка.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| options | Array<{ value: string; label: string }> | Yes | - | Список опций для выбора |
| value | string | Yes | - | Выбранное значение |
| onChange | (value: string) => void | Yes | - | Обработчик изменения значения |
| placeholder | string | No | 'Выберите...' | Плейсхолдер |
| className | string | No | - | Дополнительные CSS классы |

## Usage

```tsx
import { Select } from './components/Select';

const options = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
];

// Example usage
<Select
  options={options}
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  placeholder="Выберите опцию"
/>
``` 