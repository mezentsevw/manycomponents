# AudioPlayer

Компонент для воспроизведения аудио с поддержкой плейлистов и визуализацией.

## Особенности

- Воспроизведение аудиофайлов
- Поддержка плейлистов
- Визуализация звука
- Управление громкостью
- Перемотка трека
- Автоматическое воспроизведение
- Адаптивный дизайн
- Кастомизируемые стили

## Использование

```tsx
import { AudioPlayer } from './AudioPlayer';

const tracks = [
  {
    id: '1',
    title: 'Sample Track',
    artist: 'Artist Name',
    src: 'https://example.com/track.mp3',
    cover: 'https://example.com/cover.jpg',
  },
];

const MyComponent = () => {
  return (
    <AudioPlayer
      tracks={tracks}
      autoPlay={false}
      showVisualizer={true}
    />
  );
};
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| tracks | `AudioTrack[]` | - | Массив треков для воспроизведения |
| currentTrackIndex | `number` | 0 | Индекс текущего трека |
| onTrackChange | `(index: number) => void` | - | Обработчик смены трека |
| autoPlay | `boolean` | false | Автоматическое воспроизведение |
| showVisualizer | `boolean` | true | Показывать визуализацию |
| className | `string` | - | Дополнительные классы |

## Интерфейс AudioTrack

```typescript
interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
}
```

## Примеры

### Базовое использование

```tsx
const tracks = [
  {
    id: '1',
    title: 'Track 1',
    artist: 'Artist 1',
    src: '/tracks/track1.mp3',
  },
];

<AudioPlayer tracks={tracks} />
```

### С обложками и визуализацией

```tsx
const tracks = [
  {
    id: '1',
    title: 'Track 1',
    artist: 'Artist 1',
    src: '/tracks/track1.mp3',
    cover: '/covers/cover1.jpg',
  },
];

<AudioPlayer
  tracks={tracks}
  showVisualizer={true}
/>
```

### С автовоспроизведением

```tsx
<AudioPlayer
  tracks={tracks}
  autoPlay={true}
/>
```

### Без визуализации

```tsx
<AudioPlayer
  tracks={tracks}
  showVisualizer={false}
/>
```

## Стилизация

Компонент использует BEM-нотацию для именования классов. Основные классы:

- `.audio-player` - основной контейнер
- `.audio-player__cover` - контейнер обложки
- `.audio-player__info` - информация о треке
- `.audio-player__controls` - элементы управления
- `.audio-player__progress` - прогресс воспроизведения
- `.audio-player__volume` - управление громкостью
- `.audio-player__visualizer` - визуализатор

## Доступность

- Поддержка клавиатурной навигации
- ARIA-атрибуты для скринридеров
- Семантическая разметка
- Фокус на активных элементах

## Зависимости

- React 16.8+
- TypeScript 4.0+ 