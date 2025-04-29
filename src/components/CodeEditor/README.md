# CodeEditor

Компонент для редактирования кода с подсветкой синтаксиса.

## Особенности

- Поддержка различных языков программирования
- Подсветка синтаксиса
- Нумерация строк
- Светлая и темная темы
- Режим только для чтения
- Автоматические отступы
- Адаптивный дизайн
- Кастомизируемые стили

## Использование

```tsx
import { CodeEditor } from './CodeEditor';

const MyComponent = () => {
  const [code, setCode] = useState('');

  return (
    <CodeEditor
      value={code}
      onChange={setCode}
      language="javascript"
      theme="light"
      height="300px"
    />
  );
};
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| value | `string` | - | Текущее значение кода |
| onChange | `(value: string) => void` | - | Обработчик изменения значения |
| language | `string` | 'javascript' | Язык программирования |
| theme | `'light' \| 'dark'` | 'light' | Цветовая тема |
| readOnly | `boolean` | false | Режим только для чтения |
| lineNumbers | `boolean` | true | Показывать нумерацию строк |
| className | `string` | - | Дополнительные классы |
| placeholder | `string` | 'Введите код...' | Плейсхолдер |
| height | `string \| number` | '300px' | Высота редактора |

## Примеры

### Базовое использование

```tsx
<CodeEditor
  value={code}
  onChange={setCode}
  language="javascript"
  theme="light"
/>
```

### Темная тема

```tsx
<CodeEditor
  value={code}
  onChange={setCode}
  language="typescript"
  theme="dark"
/>
```

### Только для чтения

```tsx
<CodeEditor
  value="const greeting = 'Hello, World!';"
  readOnly
  language="javascript"
/>
```

### Без нумерации строк

```tsx
<CodeEditor
  value={code}
  onChange={setCode}
  lineNumbers={false}
/>
```

## Стилизация

Компонент использует BEM-нотацию для именования классов. Основные классы:

- `.code-editor` - основной контейнер
- `.code-editor__line-numbers` - контейнер номеров строк
- `.code-editor__line-number` - номер строки
- `.code-editor__content` - область редактирования

Модификаторы:
- `.code-editor--light` - светлая тема
- `.code-editor--dark` - темная тема

## Доступность

- Поддержка клавиатурной навигации
- Семантическая разметка
- Фокус на активных элементах

## Зависимости

- React 16.8+
- TypeScript 4.0+ 