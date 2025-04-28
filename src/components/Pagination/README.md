# Pagination

Компонент пагинации для навигации по страницам.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| currentPage | number | Yes | - | Текущая страница |
| totalPages | number | Yes | - | Общее количество страниц |
| onPageChange | (page: number) => void | Yes | - | Обработчик изменения страницы |
| className | string | No | - | Дополнительные CSS классы |

## Usage

```tsx
import { Pagination } from './components/Pagination';

// Example usage
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log('Page changed:', page)}
/>
``` 