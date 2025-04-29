# Calendar

Компонент для выбора даты с поддержкой локализации и праздников.

## Особенности

- Выбор даты с навигацией по месяцам
- Поддержка локализации
- Подсветка текущего дня
- Подсветка выходных дней
- Адаптивный дизайн
- Поддержка клавиатурной навигации
- Кастомизируемый внешний вид

## Использование

```tsx
import { Calendar } from './Calendar';

// Базовое использование
<Calendar 
  value={new Date()} 
  onChange={(date) => console.log(date)} 
/>

// С поддержкой праздников
<Calendar 
  value={new Date()} 
  onChange={(date) => console.log(date)} 
  showHolidays={true} 
/>

// С другой локализацией
<Calendar 
  value={new Date()} 
  onChange={(date) => console.log(date)} 
  locale="en-US" 
/>
```

## Свойства

| Свойство     | Тип       | По умолчанию | Описание                                      |
|--------------|-----------|--------------|-----------------------------------------------|
| value        | Date      | new Date()   | Начальная выбранная дата                      |
| onChange     | function  | -            | Обработчик изменения даты                     |
| locale       | string    | "ru-RU"      | Локаль для отображения дат                    |
| showHolidays | boolean   | false        | Показывать ли выходные дни                    |
| className    | string    | -            | Дополнительные CSS-классы                     |
| disabled     | boolean   | false        | Отключен ли компонент                         |

## Примеры

### Базовое использование
```tsx
<Calendar 
  value={new Date()} 
  onChange={(date) => console.log(date)} 
/>
```

### С праздниками
```tsx
<Calendar 
  value={new Date()} 
  onChange={(date) => console.log(date)} 
  showHolidays={true} 
/>
```

### С другой локализацией
```tsx
<Calendar 
  value={new Date()} 
  onChange={(date) => console.log(date)} 
  locale="en-US" 
/>
```

## Стилизация

Компонент использует BEM-нотацию для именования классов. Вы можете переопределить стили, используя следующие классы:

- `.calendar` - основной контейнер
- `.calendar__header` - заголовок с навигацией
- `.calendar__month-title` - название месяца и года
- `.calendar__nav-button` - кнопки навигации
- `.calendar__weekdays` - контейнер дней недели
- `.calendar__weekday` - день недели
- `.calendar__days` - контейнер дней месяца
- `.calendar__day` - день месяца
- `.calendar__day--today` - текущий день
- `.calendar__day--selected` - выбранный день
- `.calendar__day--other-month` - день другого месяца
- `.calendar__day--holiday` - выходной день

### Примеры стилизации

```css
/* Изменение размера календаря */
.calendar {
  width: 400px;
  padding: 24px;
}

/* Кастомизация выбранного дня */
.calendar__day--selected {
  background-color: #52c41a;
  color: #fff;
}

/* Изменение цвета выходных */
.calendar__day--holiday {
  color: #f5222d;
}
```

## Доступность

Компонент поддерживает:
- Клавиатурную навигацию (стрелки, Tab, Enter)
- ARIA-атрибуты
- Фокус и управление с клавиатуры
- Соответствие WCAG 2.1

## Демо-компонент

В комплекте идет демо-компонент `CalendarDemo`, который демонстрирует различные варианты использования:

```tsx
import { CalendarDemo } from './Calendar';

// Использование демо-компонента
<CalendarDemo />
```

Демо-компонент включает примеры:
- Базового использования
- Календаря с праздниками
- Отключенного состояния 