# ColorPicker

Компонент для выбора цвета с поддержкой различных форматов (HEX, RGB, HSL) и прозрачности.

## Зависимости

Компонент не требует дополнительных зависимостей, кроме React (версия 16.8+).

## Особенности

- Поддержка форматов HEX, RGB и HSL
- Возможность выбора прозрачности
- Адаптивный дизайн
- Поддержка клавиатурной навигации
- Кастомизируемый внешний вид

## Использование

```tsx
import { ColorPicker } from './ColorPicker';

// Базовое использование
<ColorPicker 
  value="#ff0000" 
  onChange={(color) => console.log(color)} 
/>

// С поддержкой прозрачности
<ColorPicker 
  value="rgba(255, 0, 0, 0.5)" 
  onChange={(color) => console.log(color)} 
  showAlpha={true} 
/>

// В формате RGB
<ColorPicker 
  value="rgb(255, 0, 0)" 
  onChange={(color) => console.log(color)} 
  format="rgb" 
/>
```

## Свойства

| Свойство   | Тип       | По умолчанию | Описание                                      |
|------------|-----------|--------------|-----------------------------------------------|
| value      | string    | -            | Начальное значение цвета                      |
| onChange   | function  | -            | Обработчик изменения цвета                    |
| format     | string    | "hex"        | Формат цвета (hex, rgb, hsl)                  |
| showAlpha  | boolean   | false        | Показывать ли ползунок прозрачности           |
| className  | string    | -            | Дополнительные CSS-классы                     |
| disabled   | boolean   | false        | Отключен ли компонент                         |

## Примеры

### Базовое использование
```tsx
<ColorPicker 
  value="#ff0000" 
  onChange={(color) => console.log(color)} 
/>
```

### С прозрачностью
```tsx
<ColorPicker 
  value="rgba(255, 0, 0, 0.5)" 
  onChange={(color) => console.log(color)} 
  showAlpha={true} 
/>
```

### В формате RGB
```tsx
<ColorPicker 
  value="rgb(255, 0, 0)" 
  onChange={(color) => console.log(color)} 
  format="rgb" 
/>
```

## Стилизация

Компонент использует BEM-нотацию для именования классов. Вы можете переопределить стили, используя следующие классы:

- `.color-picker` - основной контейнер
- `.color-picker__trigger` - кнопка выбора цвета
- `.color-picker__popover` - всплывающее окно с палитрой
- `.color-picker__saturation` - область насыщенности
- `.color-picker__saturation-white` - белый градиент насыщенности
- `.color-picker__saturation-black` - черный градиент насыщенности
- `.color-picker__hue` - ползунок оттенка
- `.color-picker__hue-slider` - указатель ползунка оттенка
- `.color-picker__alpha` - ползунок прозрачности
- `.color-picker__alpha-slider` - указатель ползунка прозрачности
- `.color-picker__input` - поле ввода цвета

### Примеры стилизации

```css
/* Изменение размера триггера */
.color-picker__trigger {
  width: 40px;
  height: 40px;
}

/* Кастомизация всплывающего окна */
.color-picker__popover {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Изменение размера области насыщенности */
.color-picker__saturation {
  width: 250px;
  height: 200px;
}
```

## Демо-компонент

В комплекте идет демо-компонент `ColorPickerDemo`, который демонстрирует различные варианты использования:

```tsx
import { ColorPickerDemo } from './ColorPicker';

// Использование демо-компонента
<ColorPickerDemo />
```

Демо-компонент включает примеры:
- Базового использования
- Выбора цвета в формате RGB
- Работы с прозрачностью
- Отключенного состояния

## Доступность

Компонент поддерживает:
- Клавиатурную навигацию
- ARIA-атрибуты
- Фокус и управление с клавиатуры
- Соответствие WCAG 2.1 