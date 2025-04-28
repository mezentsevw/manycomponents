# Dropdown

Компонент выпадающего списка с поддержкой поиска и множественного выбора.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| options | Option[] | Yes | - | Массив опций для выбора |
| value | string \| string[] | No | - | Выбранное значение/значения |
| onChange | (value: string \| string[]) => void | Yes | - | Обработчик изменения значения |
| placeholder | string | No | 'Выберите опцию' | Текст плейсхолдера |
| searchable | boolean | No | false | Включить поиск по опциям |
| multiple | boolean | No | false | Разрешить множественный выбор |
| className | string | No | - | Дополнительные CSS классы |

## Interface Option

```typescript
interface Option {
  value: string;
  label: string;
}
```

## Usage

```tsx
import { Dropdown } from './components/Dropdown';

const options = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' }
];

// Пример одиночного выбора
<Dropdown
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Выберите опцию"
/>

// Пример множественного выбора с поиском
<Dropdown
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  multiple
  searchable
  placeholder="Выберите опции"
/>
```

## Особенности

- Поддержка одиночного и множественного выбора
- Встроенный поиск по опциям
- Автоматическое закрытие при клике вне компонента
- Плавные анимации
- Кастомный дизайн
- Адаптивная верстка 