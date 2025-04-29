# VirtualList

Компонент для эффективного рендеринга длинных списков с виртуализацией.

## Особенности

- Виртуализация для оптимизации производительности
- Поддержка динамической высоты элементов
- Плавная прокрутка
- Кастомизируемые стили
- Поддержка клавиатурной навигации
- Адаптивный дизайн

## Использование

```tsx
import { VirtualList } from './VirtualList';

const items = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  text: `Элемент ${i + 1}`,
}));

const MyList = () => {
  return (
    <VirtualList
      items={items}
      itemHeight={50}
      containerHeight={400}
      renderItem={(item) => (
        <div>{item.text}</div>
      )}
    />
  );
};
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| items | `T[]` | - | Массив элементов для отображения |
| itemHeight | `number` | - | Высота одного элемента в пикселях |
| renderItem | `(item: T, index: number) => React.ReactNode` | - | Функция рендеринга элемента |
| containerHeight | `number` | - | Высота контейнера в пикселях |
| overscanCount | `number` | 3 | Количество элементов для предварительной загрузки |
| className | `string` | - | Дополнительные классы |

## Примеры

### Базовое использование

```tsx
const items = [
  { id: 1, name: 'Элемент 1' },
  { id: 2, name: 'Элемент 2' },
  // ...
];

<VirtualList
  items={items}
  itemHeight={50}
  containerHeight={400}
  renderItem={(item) => (
    <div>{item.name}</div>
  )}
/>
```

### С кастомными стилями

```tsx
<VirtualList
  items={items}
  itemHeight={50}
  containerHeight={400}
  className="my-custom-list"
  renderItem={(item) => (
    <div className="custom-item">
      {item.name}
    </div>
  )}
/>
```

## Стилизация

Компонент использует BEM-нотацию для именования классов. Основные классы:

- `.virtual-list` - основной контейнер
- `.virtual-list__inner` - внутренний контейнер
- `.virtual-list__items` - контейнер видимых элементов
- `.virtual-list__item` - отдельный элемент списка

## Производительность

Компонент оптимизирован для работы с большими списками:
- Рендеринг только видимых элементов
- Использование `will-change` для оптимизации анимаций
- Эффективное управление DOM-элементами
- Минимальное количество перерисовок

## Доступность

- Поддержка клавиатурной навигации (стрелки, PageUp/PageDown)
- ARIA-атрибуты для скринридеров
- Семантическая разметка
- Фокус на активном элементе

## Зависимости

- React 16.8+
- TypeScript 4.0+ 