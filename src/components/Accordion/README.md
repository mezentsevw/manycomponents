# Accordion Component

Компонент аккордеона для создания раскрывающихся панелей с плавной анимацией и расширенными возможностями настройки.

## Особенности

- Плавная анимация раскрытия/закрытия
- Поддержка кастомных иконок
- Возможность отключения
- Управление состоянием извне
- Настраиваемая длительность анимации
- Поддержка кастомных стилей
- Доступность (ARIA атрибуты)

## Использование

```tsx
import Accordion from './Accordion';

<Accordion title="Заголовок раздела">
  <p>Содержимое раздела</p>
</Accordion>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | - | Уникальный идентификатор компонента |
| title | string | - | Заголовок раздела (обязательный) |
| children | ReactNode | - | Содержимое раздела (обязательный) |
| isOpen | boolean | false | Начальное состояние (раскрыт/закрыт) |
| onToggle | (isOpen: boolean) => void | - | Callback при изменении состояния |
| disabled | boolean | false | Отключает возможность открытия/закрытия |
| icon | ReactNode | '▼' | Иконка для кнопки раскрытия |
| customIcon | boolean | false | Использовать кастомную иконку |
| animationDuration | number | 300 | Длительность анимации в миллисекундах |
| className | string | '' | Дополнительные CSS классы |
| style | React.CSSProperties | - | Стили для основного контейнера |
| headerStyle | React.CSSProperties | - | Стили для заголовка |
| contentStyle | React.CSSProperties | - | Стили для содержимого |

## Примеры

### Базовое использование
```tsx
<Accordion title="Раздел 1">
  <p>Содержимое первого раздела</p>
</Accordion>
```

### Управление состоянием
```tsx
const [isOpen, setIsOpen] = useState(false);

<Accordion 
  title="Управляемый раздел"
  isOpen={isOpen}
  onToggle={setIsOpen}
>
  <p>Содержимое раздела</p>
</Accordion>
```

### Отключенный аккордеон
```tsx
<Accordion 
  title="Отключенный раздел"
  disabled
>
  <p>Этот раздел нельзя открыть</p>
</Accordion>
```

### Кастомная иконка
```tsx
<Accordion 
  title="Раздел с кастомной иконкой"
  icon="→"
  customIcon
>
  <p>Содержимое раздела</p>
</Accordion>
```

### Настройка анимации
```tsx
<Accordion 
  title="Раздел с медленной анимацией"
  animationDuration={1000}
>
  <p>Содержимое раздела</p>
</Accordion>
```

### Кастомные стили
```tsx
<Accordion 
  title="Раздел с кастомными стилями"
  className="custom-accordion"
  style={{ borderColor: '#ff0000' }}
  headerStyle={{ backgroundColor: '#f0f0f0' }}
  contentStyle={{ padding: '30px' }}
>
  <p>Содержимое раздела</p>
</Accordion>
```

## Стилизация

Компонент использует следующие CSS-классы для стилизации:

- `.accordion` - основной контейнер
- `.accordion.disabled` - модификатор для отключенного состояния
- `.accordion-header` - заголовок раздела
- `.accordion-title` - текст заголовка
- `.accordion-icon` - стандартная иконка
- `.accordion-custom-icon` - контейнер для кастомной иконки
- `.accordion-content` - контейнер содержимого
- `.accordion-content-inner` - внутренний контейнер содержимого
- `.expanded` - модификатор для раскрытого состояния

## Доступность

Компонент поддерживает следующие ARIA атрибуты:
- `aria-expanded` - указывает состояние раскрытия
- `aria-hidden` - скрывает содержимое от скринридеров когда аккордеон закрыт

## Анимации

Компонент использует CSS анимации для плавного раскрытия/закрытия:
- `slideDown` - анимация раскрытия
- `slideUp` - анимация закрытия 