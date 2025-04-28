# Modal

Компонент модального окна с поддержкой закрытия по клику вне окна и клавише Escape.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| isOpen | boolean | Yes | - | Состояние модального окна |
| onClose | () => void | Yes | - | Обработчик закрытия модального окна |
| title | string | No | - | Заголовок модального окна |
| children | React.ReactNode | Yes | - | Содержимое модального окна |
| className | string | No | - | Дополнительные CSS классы |

## Usage

```tsx
import { Modal } from './components/Modal';

// Пример использования
const [isModalOpen, setIsModalOpen] = useState(false);

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Заголовок модального окна"
>
  <div>
    <p>Содержимое модального окна</p>
    <button onClick={() => setIsModalOpen(false)}>Закрыть</button>
  </div>
</Modal>
```

## Особенности

- Плавная анимация появления/исчезновения
- Закрытие по клику вне окна
- Закрытие по клавише Escape
- Блокировка прокрутки фонового контента
- Адаптивный дизайн
- Поддержка любого контента внутри окна
- Кастомный заголовок
- Стилизация через CSS классы

## Использование

```tsx
import { Modal } from './Modal';

// Базовое использование
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>Открыть модальное окно</button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Заголовок"
>
  <p>Содержимое модального окна</p>
</Modal>

// С футером
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Заголовок"
  footer={
    <div>
      <button onClick={() => setIsOpen(false)}>Отмена</button>
      <button onClick={() => setIsOpen(false)}>Подтвердить</button>
    </div>
  }
>
  <p>Содержимое модального окна</p>
</Modal>
```

## Примеры

### Размеры
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Маленькое окно"
  size="sm"
>
  <p>Маленькое модальное окно</p>
</Modal>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Среднее окно"
  size="md"
>
  <p>Среднее модальное окно</p>
</Modal>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Большое окно"
  size="lg"
>
  <p>Большое модальное окно</p>
</Modal>
```

### С футером
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Окно с действиями"
  footer={
    <div className="modal-footer-demo">
      <button onClick={() => setIsOpen(false)}>Отмена</button>
      <button onClick={() => setIsOpen(false)}>Подтвердить</button>
    </div>
  }
>
  <p>Модальное окно с кнопками действий</p>
</Modal>
```

### Сложный контент
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Сложный контент"
>
  <div className="modal-content-demo">
    <h3>Заголовок</h3>
    <p>Параграф текста</p>
    <form>
      <input type="text" placeholder="Введите текст" />
      <button type="submit">Отправить</button>
    </form>
  </div>
</Modal>
```

## Стилизация

Компонент использует CSS-классы для стилизации:

- `.modal-overlay` - оверлей модального окна
- `.modal` - само модальное окно
- `.modal.sm` - маленький размер
- `.modal.md` - средний размер
- `.modal.lg` - большой размер
- `.modal-header` - шапка модального окна
- `.modal-title` - заголовок
- `.modal-close` - кнопка закрытия
- `.modal-content` - контейнер содержимого
- `.modal-footer` - футер модального окна

Вы можете переопределить стили, используя эти классы. 