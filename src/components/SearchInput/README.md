# SearchInput

Компонент поисковой строки с иконкой.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| value | string | Yes | - | Значение поиска |
| onChange | (value: string) => void | Yes | - | Обработчик изменения значения |
| placeholder | string | No | 'Поиск...' | Плейсхолдер |
| className | string | No | - | Дополнительные CSS классы |

## Usage

```tsx
import { SearchInput } from './components/SearchInput';

// Example usage
<SearchInput
  value={searchValue}
  onChange={(value) => setSearchValue(value)}
  placeholder="Поиск по сайту..."
/>
``` 