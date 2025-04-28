# Tag

Компонент для отображения меток или категорий. Отличается от Badge тем, что предназначен для группировки и фильтрации контента, а не для отображения статусов или уведомлений.

## Использование

```tsx
import { Tag } from './Tag';

// Базовое использование
<Tag>Метка</Tag>

// С вариантом
<Tag variant="success">Успех</Tag>

// С размером
<Tag size="large">Большая метка</Tag>

// С формой
<Tag shape="pill">Pill</Tag>

// Закрываемая метка
<Tag closable onClose={() => console.log('Closed')}>
  Закрыть меня
</Tag>

// С иконкой
<Tag icon="🔔">Уведомления</Tag>

// Интерактивная метка
<Tag onClick={() => console.log('Clicked')}>
  Кликни меня
</Tag>
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| children | React.ReactNode | - | Содержимое метки |
| variant | 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' | 'primary' | Вариант стиля |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Размер метки |
| shape | 'default' \| 'rounded' \| 'pill' | 'default' | Форма метки |
| closable | boolean | false | Возможность закрыть метку |
| onClose | () => void | - | Обработчик закрытия |
| icon | React.ReactNode | - | Иконка метки |
| className | string | - | Дополнительные CSS классы |
| onClick | () => void | - | Обработчик клика |

## Варианты

- primary: синий (#2196f3)
- secondary: серый (#9e9e9e)
- success: зеленый (#4caf50)
- danger: красный (#f44336)
- warning: оранжевый (#ff9800)
- info: голубой (#00bcd4)

## Размеры

- small: padding 2px 6px, шрифт 12px
- medium: padding 4px 8px, шрифт 14px
- large: padding 6px 10px, шрифт 16px

## Формы

- default: небольшие скругления (2px)
- rounded: средние скругления (4px)
- pill: большие скругления (9999px)

## Особенности

- Поддержка иконок
- Возможность закрытия
- Интерактивность (клики)
- Поддержка клавиатурной навигации
- Адаптивный дизайн
- Плавные анимации при наведении и фокусе
- Поддержка RTL (справа налево) 