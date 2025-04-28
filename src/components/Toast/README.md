# Toast

Компонент уведомления с поддержкой разных типов и автоматического закрытия.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| message | string | Yes | - | Текст уведомления |
| type | 'success' \| 'error' \| 'warning' \| 'info' | No | 'info' | Тип уведомления |
| duration | number | No | 3000 | Длительность отображения в миллисекундах |
| onClose | () => void | Yes | - | Обработчик закрытия уведомления |
| className | string | No | - | Дополнительные CSS классы |

## Usage

```tsx
import { Toast } from './components/Toast';

// Пример использования
const [showToast, setShowToast] = useState(false);

{showToast && (
  <Toast
    message="Операция выполнена успешно"
    type="success"
    duration={3000}
    onClose={() => setShowToast(false)}
  />
)}
```

## Примеры типов уведомлений

```tsx
// Успех
<Toast
  message="Операция выполнена успешно"
  type="success"
  onClose={() => {}}
/>

// Ошибка
<Toast
  message="Произошла ошибка"
  type="error"
  onClose={() => {}}
/>

// Предупреждение
<Toast
  message="Будьте осторожны"
  type="warning"
  onClose={() => {}}
/>

// Информация
<Toast
  message="Новая версия доступна"
  type="info"
  onClose={() => {}}
/>
```

## Особенности

- 4 типа уведомлений (success, error, warning, info)
- Автоматическое закрытие через заданное время
- Возможность закрыть вручную
- Плавная анимация появления/исчезновения
- Адаптивный дизайн
- Иконки для каждого типа уведомления
- Кастомные цвета для разных типов 