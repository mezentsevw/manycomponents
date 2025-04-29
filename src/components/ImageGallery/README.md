# ImageGallery

Компонент для создания интерактивной галереи изображений.

## Особенности

- Автоматическое воспроизведение
- Миниатюры изображений
- Навигация с помощью кнопок
- Адаптивный дизайн
- Поддержка клавиатурной навигации
- Кастомизируемые стили

## Использование

```tsx
import { ImageGallery } from './ImageGallery';

const images = [
  {
    id: '1',
    src: '/images/image1.jpg',
    alt: 'Описание изображения 1',
    thumbnail: '/images/thumb1.jpg'
  },
  // ...
];

const MyGallery = () => {
  return (
    <ImageGallery
      images={images}
      showThumbnails={true}
      autoPlay={true}
      interval={3000}
    />
  );
};
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| images | `Image[]` | - | Массив изображений |
| showThumbnails | `boolean` | true | Показывать миниатюры |
| autoPlay | `boolean` | false | Автоматическое воспроизведение |
| interval | `number` | 3000 | Интервал между слайдами в мс |
| className | `string` | - | Дополнительные классы |

## Интерфейс Image

```typescript
interface Image {
  id: string;
  src: string;
  alt: string;
  thumbnail?: string;
}
```

## Примеры

### Базовое использование

```tsx
const images = [
  {
    id: '1',
    src: '/images/photo1.jpg',
    alt: 'Фотография 1'
  },
  {
    id: '2',
    src: '/images/photo2.jpg',
    alt: 'Фотография 2'
  }
];

<ImageGallery images={images} />
```

### С миниатюрами и автовоспроизведением

```tsx
<ImageGallery
  images={images}
  showThumbnails={true}
  autoPlay={true}
  interval={5000}
/>
```

### С кастомными стилями

```tsx
<ImageGallery
  images={images}
  className="my-custom-gallery"
/>
```

## Стилизация

Компонент использует BEM-нотацию для именования классов. Основные классы:

- `.image-gallery` - основной контейнер
- `.image-gallery__main` - контейнер основного изображения
- `.image-gallery__slide` - слайд
- `.image-gallery__image` - изображение
- `.image-gallery__button` - кнопки навигации
- `.image-gallery__play-button` - кнопка воспроизведения
- `.image-gallery__thumbnails` - контейнер миниатюр
- `.image-gallery__thumbnail` - миниатюра

Модификаторы:
- `.image-gallery__button--prev` - кнопка "Назад"
- `.image-gallery__button--next` - кнопка "Вперед"
- `.image-gallery__thumbnail--active` - активная миниатюра

## Доступность

- Поддержка клавиатурной навигации (стрелки, Space, Enter)
- ARIA-атрибуты для скринридеров
- Семантическая разметка
- Фокус на активных элементах
- Альтернативные тексты для изображений

## Зависимости

- React 16.8+
- TypeScript 4.0+ 