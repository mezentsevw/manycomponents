# FileUpload

Компонент FileUpload предоставляет удобный интерфейс для загрузки файлов с поддержкой drag-and-drop, валидации и отображения списка выбранных файлов.

## Использование

```tsx
import FileUpload from './FileUpload';

// Базовое использование
<FileUpload
  onUpload={(files) => console.log(files)}
  onError={(error) => console.error(error)}
/>

// С кастомизацией
<FileUpload
  multiple
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  variant="success"
  size="large"
  label="Загрузить изображения"
  onUpload={handleUpload}
  onError={handleError}
/>
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| accept | string | '*' | Типы принимаемых файлов |
| multiple | boolean | false | Разрешить множественную загрузку |
| maxSize | number | 10MB | Максимальный размер файла в байтах |
| variant | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' | 'primary' | Цветовой вариант |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Размер компонента |
| className | string | - | Дополнительные CSS-классы |
| onUpload | (files: File[]) => void | - | Обработчик загрузки файлов |
| onError | (error: string) => void | - | Обработчик ошибок |
| disabled | boolean | false | Отключение компонента |
| label | string | 'Выберите файл' | Текст кнопки |
| icon | ReactNode | - | Иконка для кнопки |

## Размеры

- `small` - маленький (14px)
- `medium` - средний (16px)
- `large` - большой (18px)

## Варианты

- `primary` - синий (#2196f3)
- `secondary` - фиолетовый (#9c27b0)
- `success` - зеленый (#4caf50)
- `warning` - оранжевый (#ff9800)
- `error` - красный (#f44336)

## Особенности

1. Поддержка drag-and-drop
2. Валидация размера файлов
3. Отображение списка выбранных файлов
4. Поддержка множественной загрузки
5. Фильтрация по типам файлов
6. Анимации при наведении и перетаскивании
7. Доступность с клавиатуры
8. Адаптивность под разные размеры экрана 