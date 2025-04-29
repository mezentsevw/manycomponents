# Counter

Компонент счетчика с возможностью увеличения и уменьшения значения. Поддерживает как контролируемый, так и неконтролируемый режимы работы.

## Использование

```tsx
import { Counter } from './Counter';

// Неконтролируемый режим
<Counter />

// Контролируемый режим
<Counter
  value={value}
  onChange={setValue}
/>

// С настройками
<Counter
  initialValue={5}
  min={0}
  max={10}
  step={2}
  onChange={(value) => console.log(value)}
/>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| initialValue | number | 0 | Начальное значение (используется только в неконтролируемом режиме) |
| value | number | - | Текущее значение (для контролируемого режима) |
| min | number | -Infinity | Минимальное значение |
| max | number | Infinity | Максимальное значение |
| step | number | 1 | Шаг изменения |
| onChange | (value: number) => void | - | Обработчик изменения значения |
| className | string | - | Дополнительные CSS классы |
| disabled | boolean | false | Отключение компонента |

## Примеры

### Неконтролируемый режим
```tsx
<Counter
  initialValue={0}
  onChange={(value) => console.log('Новое значение:', value)}
/>
```

### Контролируемый режим
```tsx
const [value, setValue] = useState(0);

return (
  <Counter
    value={value}
    onChange={setValue}
  />
);
```

### Счетчик с ограничениями
```tsx
<Counter
  value={value}
  onChange={setValue}
  min={0}
  max={10}
  step={2}
/>
```

### Отключенный счетчик
```tsx
<Counter
  value={3}
  disabled={true}
/>
```

## Доступность

Компонент поддерживает:
- Управление с клавиатуры (стрелки вверх/вниз)
- ARIA-атрибуты для скринридеров
- Состояние disabled
- Фокус с клавиатуры

## Стилизация

Компонент использует CSS-классы для стилизации:

- `.counter` - основной контейнер
- `.counter--disabled` - состояние отключения
- `.counter__button` - кнопки увеличения/уменьшения
- `.counter__button--decrement` - кнопка уменьшения
- `.counter__button--increment` - кнопка увеличения
- `.counter__value` - отображаемое значение

Вы можете переопределить стили, используя эти классы. 