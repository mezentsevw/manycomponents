# Drawer

Компонент Drawer представляет собой боковую панель, которая может выдвигаться с любой стороны экрана. Часто используется для навигации, фильтров или дополнительной информации.

## Использование

```tsx
import Drawer from './Drawer';

const [isOpen, setIsOpen] = React.useState(false);

<Drawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  placement="left"
  width={300}
>
  <div>Содержимое боковой панели</div>
</Drawer>
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| open | boolean | - | Состояние открытия панели |
| onClose | () => void | - | Обработчик закрытия |
| placement | 'left' \| 'right' \| 'top' \| 'bottom' | 'left' | Позиция появления |
| width | string \| number | 300 | Ширина для left/right |
| height | string \| number | 300 | Высота для top/bottom |
| className | string | - | Дополнительные CSS-классы |
| children | ReactNode | - | Содержимое панели |
| closeOnEsc | boolean | true | Закрытие по клавише Esc |
| closeOnOverlayClick | boolean | true | Закрытие по клику вне панели |
| showOverlay | boolean | true | Показ затемнения фона |

## Позиции

- `left` - выдвигается слева
- `right` - выдвигается справа
- `top` - выдвигается сверху
- `bottom` - выдвигается снизу

## Особенности

1. Плавные анимации появления/исчезновения
2. Затемнение фона с анимацией
3. Блокировка прокрутки страницы при открытии
4. Закрытие по клавише Escape
5. Закрытие по клику вне панели
6. Адаптивность под мобильные устройства
7. Поддержка вложенного скролла
8. Доступность (ARIA-атрибуты)

## Пример с кастомизацией

```tsx
<Drawer
  open={isOpen}
  onClose={handleClose}
  placement="right"
  width="50%"
  closeOnEsc={false}
  showOverlay={false}
  className="custom-drawer"
>
  <div className="drawer-header">
    <h2>Заголовок</h2>
    <button onClick={handleClose}>✕</button>
  </div>
  <div className="drawer-content">
    Содержимое панели
  </div>
</Drawer>
``` 