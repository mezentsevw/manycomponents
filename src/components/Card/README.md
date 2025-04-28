# Card

Компонент карточки для отображения контента с различными вариантами стилей и возможностью добавления изображений, заголовков и действий.

## Использование

```tsx
import { Card } from './Card';

// Базовое использование
<Card title="Заголовок">
  <p>Содержимое карточки</p>
</Card>

// С изображением и подзаголовком
<Card
  title="Заголовок"
  subtitle="Подзаголовок"
  image="https://example.com/image.jpg"
  imageAlt="Описание изображения"
>
  <p>Содержимое карточки</p>
</Card>

// С действиями
<Card
  title="Заголовок"
  actions={
    <div>
      <button>Действие 1</button>
      <button>Действие 2</button>
    </div>
  }
>
  <p>Содержимое карточки</p>
</Card>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| title | string | - | Заголовок карточки |
| subtitle | string | - | Подзаголовок карточки |
| image | string | - | URL изображения |
| imageAlt | string | - | Альтернативный текст для изображения |
| actions | React.ReactNode | - | Действия (кнопки и т.д.) внизу карточки |
| children | React.ReactNode | - | Основное содержимое карточки |
| className | string | - | Дополнительные CSS классы |
| onClick | () => void | - | Обработчик клика по карточке |
| variant | 'elevated' \| 'outlined' \| 'filled' | 'elevated' | Вариант стиля карточки |

## Примеры

### Варианты стилей
```tsx
<Card variant="elevated" title="Elevated Card">
  <p>Карточка с тенью</p>
</Card>

<Card variant="outlined" title="Outlined Card">
  <p>Карточка с обводкой</p>
</Card>

<Card variant="filled" title="Filled Card">
  <p>Карточка с фоном</p>
</Card>
```

### С изображением
```tsx
<Card
  title="Card с изображением"
  subtitle="Подзаголовок"
  image="https://picsum.photos/400/200"
  imageAlt="Пример изображения"
>
  <p>Карточка с изображением и текстовым содержимым</p>
</Card>
```

### С действиями
```tsx
<Card
  title="Card с действиями"
  actions={
    <div>
      <button>Действие 1</button>
      <button>Действие 2</button>
    </div>
  }
>
  <p>Карточка с кнопками действий внизу</p>
</Card>
```

### Кликабельная карточка
```tsx
<Card
  title="Кликабельная карточка"
  onClick={() => alert('Карточка нажата!')}
>
  <p>Нажмите на карточку</p>
</Card>
```

## Стилизация

Компонент использует CSS-классы для стилизации:

- `.card` - базовая карточка
- `.card.elevated` - карточка с тенью
- `.card.outlined` - карточка с обводкой
- `.card.filled` - карточка с фоном
- `.card.clickable` - кликабельная карточка
- `.card-image` - контейнер изображения
- `.card-content` - контейнер контента
- `.card-header` - контейнер заголовка
- `.card-title` - заголовок
- `.card-subtitle` - подзаголовок
- `.card-body` - основное содержимое
- `.card-actions` - контейнер действий

Вы можете переопределить стили, используя эти классы. 