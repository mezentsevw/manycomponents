# RichTextEditor

Компонент текстового редактора с расширенным форматированием и поддержкой различных стилей текста.

## Использование

```tsx
import { RichTextEditor } from './RichTextEditor';

// Базовое использование
<RichTextEditor
  value={content}
  onChange={setContent}
/>

// С настройкой панели инструментов и placeholder
<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Введите текст..."
  toolbarOptions={['bold', 'italic', 'link', 'bullet']}
  readOnly={false}
/>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| value | string | '' | Значение редактора в формате HTML |
| onChange | (value: string) => void | - | Обработчик изменения содержимого |
| placeholder | string | 'Введите текст...' | Текст-подсказка |
| toolbarOptions | string[] | ['bold', 'italic', 'underline', 'link', 'bullet', 'number', 'h1', 'h2', 'quote'] | Доступные инструменты форматирования |
| readOnly | boolean | false | Режим только для чтения |
| className | string | - | Дополнительные CSS классы |
| minHeight | number | 200 | Минимальная высота редактора |
| maxHeight | number | null | Максимальная высота редактора |

## Примеры

### Базовый редактор
```tsx
const [content, setContent] = useState('');

return (
  <RichTextEditor
    value={content}
    onChange={setContent}
    placeholder="Начните вводить текст..."
  />
);
```

### Настроенный редактор
```tsx
<RichTextEditor
  value={content}
  onChange={setContent}
  toolbarOptions={[
    'bold',
    'italic',
    'underline',
    'link',
    'bullet',
    'number',
    'h1',
    'h2'
  ]}
  minHeight={300}
  maxHeight={500}
  className="custom-editor"
/>
```

### Режим просмотра
```tsx
<RichTextEditor
  value={content}
  readOnly={true}
  toolbarOptions={[]}
  className="preview-mode"
/>
```

## Поддерживаемые форматы

- **Текст**: жирный, курсив, подчеркнутый
- **Списки**: маркированный, нумерованный
- **Заголовки**: H1, H2
- **Ссылки**: вставка и редактирование URL
- **Цитаты**: блоки с отступом
- **Выравнивание**: по левому краю, по центру, по правому краю

## Стилизация

Компонент использует CSS-классы для стилизации:

- `.rich-editor` - основной контейнер
- `.rich-editor__toolbar` - панель инструментов
- `.rich-editor__content` - область редактирования
- `.rich-editor__placeholder` - текст-подсказка
- `.rich-editor__button` - кнопки панели инструментов
- `.rich-editor__button--active` - активная кнопка
- `.rich-editor--readonly` - режим только для чтения

Вы можете переопределить стили, используя эти классы. 