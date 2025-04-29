# TimePicker

Компонент для выбора времени с поддержкой 12/24-часового формата.

## Особенности

- Поддержка 12-часового и 24-часового формата
- Настраиваемый интервал между временными значениями
- Валидация ввода
- Состояния ошибки и отключения
- Адаптивный дизайн
- Поддержка клавиатурной навигации
- Кастомизируемые стили

## Использование

```tsx
import { TimePicker } from './TimePicker';

const MyComponent = () => {
  const [time, setTime] = useState('');

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      format="24h"
      interval={30}
      placeholder="Выберите время"
    />
  );
};
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| value | `string` | - | Текущее значение времени |
| onChange | `(time: string) => void` | - | Обработчик изменения значения |
| format | `'12h' \| '24h'` | '24h' | Формат отображения времени |
| interval | `number` | 30 | Интервал между временными значениями в минутах |
| disabled | `boolean` | false | Отключение компонента |
| className | `string` | - | Дополнительные классы |
| placeholder | `string` | 'Выберите время' | Плейсхолдер для поля ввода |
| error | `string` | - | Текст ошибки |

## Примеры

### Базовое использование

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  format="24h"
  interval={30}
/>
```

### 12-часовой формат

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  format="12h"
  interval={15}
/>
```

### С ошибкой

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  error="Неверный формат времени"
/>
```

### Отключенный

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  disabled
/>
```

## Стилизация

Компонент использует BEM-нотацию для именования классов. Основные классы:

- `.time-picker` - основной контейнер
- `.time-picker__input` - поле ввода
- `.time-picker__dropdown` - выпадающий список
- `.time-picker__options` - контейнер опций
- `.time-picker__option` - опция времени
- `.time-picker__error` - сообщение об ошибке

Модификаторы:
- `.time-picker__input--error` - состояние ошибки
- `.time-picker__option--selected` - выбранная опция

## Доступность

- Поддержка клавиатурной навигации (стрелки, Enter, Escape)
- ARIA-атрибуты для скринридеров
- Семантическая разметка
- Фокус на активных элементах

## Зависимости

- React 16.8+
- TypeScript 4.0+ 