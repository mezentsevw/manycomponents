# Input

Компонент поля ввода с поддержкой различных типов, валидации и состояний.

## Использование

```tsx
import { Input } from './Input';

// Базовое использование
<Input placeholder="Введите текст" />

// С label и валидацией
<Input 
  label="Email"
  type="email"
  error="Неверный формат email"
/>

// С иконками
<Input 
  startIcon={<SearchIcon />}
  endIcon={<ClearIcon />}
  placeholder="Поиск"
/>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| type | 'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' | 'text' | Тип поля ввода |
| label | string | - | Метка поля |
| placeholder | string | - | Подсказка в поле |
| value | string | - | Значение поля (контролируемый режим) |
| defaultValue | string | - | Начальное значение (неконтролируемый режим) |
| error | string | - | Текст ошибки |
| helperText | string | - | Вспомогательный текст |
| disabled | boolean | false | Отключение поля |
| required | boolean | false | Обязательное поле |
| fullWidth | boolean | false | Занимает всю доступную ширину |
| startIcon | React.ReactNode | - | Иконка в начале поля |
| endIcon | React.ReactNode | - | Иконка в конце поля |
| onChange | (value: string) => void | - | Обработчик изменения значения |
| onBlur | () => void | - | Обработчик потери фокуса |
| onFocus | () => void | - | Обработчик получения фокуса |
| className | string | - | Дополнительные CSS классы |
| name | string | - | Имя поля для формы |
| autoComplete | string | - | Автозаполнение поля |

## Примеры

### Разные типы полей
```tsx
<Input type="text" placeholder="Текстовое поле" />
<Input type="password" placeholder="Пароль" />
<Input type="email" placeholder="Email" />
<Input type="number" placeholder="Число" />
```

### Состояния
```tsx
<Input label="Обычное поле" placeholder="Введите текст" />
<Input label="Отключенное" placeholder="Disabled" disabled />
<Input label="С ошибкой" error="Обязательное поле" />
```

### С иконками
```tsx
<Input
  startIcon={<span>🔍</span>}
  placeholder="Поиск"
/>
<Input
  endIcon={<span>✓</span>}
  placeholder="С иконкой справа"
/>
```

### Валидация
```tsx
const [value, setValue] = useState('');
const [error, setError] = useState('');

<Input
  label="Поле с валидацией"
  value={value}
  onChange={(newValue) => {
    setValue(newValue);
    if (newValue.length < 3) {
      setError('Минимум 3 символа');
    } else {
      setError('');
    }
  }}
  error={error}
  helperText="Введите минимум 3 символа"
/>
```

## Стилизация

Компонент использует CSS-классы для стилизации:

- `.input-wrapper` - обертка поля
- `.input-label` - метка поля
- `.input-container` - контейнер поля ввода
- `.input-field` - само поле ввода
- `.input-icon` - иконка
- `.input-message` - сообщение об ошибке или подсказка

Вы можете переопределить стили, используя эти классы. 