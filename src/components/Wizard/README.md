# Wizard

Компонент для создания пошаговых форм и мастеров.

## Особенности

- Пошаговая навигация с визуальным отображением прогресса
- Валидация шагов
- Сохранение состояния
- Адаптивный дизайн
- Поддержка клавиатурной навигации
- Кастомизируемые стили

## Использование

```tsx
import { Wizard } from './Wizard';

const steps = [
  {
    title: 'Шаг 1',
    content: <div>Содержимое первого шага</div>,
    validate: () => true
  },
  {
    title: 'Шаг 2',
    content: <div>Содержимое второго шага</div>,
    validate: () => true
  }
];

const MyWizard = () => {
  return (
    <Wizard
      steps={steps}
      onComplete={() => console.log('Завершено')}
    />
  );
};
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| steps | `Step[]` | - | Массив шагов |
| initialStep | `number` | 0 | Начальный шаг |
| onComplete | `() => void` | - | Колбэк при завершении |
| onStepChange | `(step: number) => void` | - | Колбэк при смене шага |
| className | `string` | - | Дополнительные классы |

## Интерфейс Step

```typescript
interface Step {
  title: string;
  content: React.ReactNode;
  validate?: () => boolean | Promise<boolean>;
}
```

## Примеры

### Базовое использование

```tsx
const steps = [
  {
    title: 'Личные данные',
    content: <PersonalInfoForm />
  },
  {
    title: 'Адрес',
    content: <AddressForm />
  },
  {
    title: 'Подтверждение',
    content: <Confirmation />
  }
];

<Wizard steps={steps} />
```

### С валидацией

```tsx
const steps = [
  {
    title: 'Личные данные',
    content: <PersonalInfoForm />,
    validate: () => {
      // Проверка валидности формы
      return formIsValid;
    }
  }
];

<Wizard steps={steps} />
```

### С сохранением состояния

```tsx
const [currentStep, setCurrentStep] = useState(0);

<Wizard
  steps={steps}
  initialStep={currentStep}
  onStepChange={setCurrentStep}
/>
```

## Стилизация

Компонент использует BEM-нотацию для именования классов. Основные классы:

- `.wizard` - основной контейнер
- `.wizard__steps` - контейнер шагов
- `.wizard__step` - отдельный шаг
- `.wizard__step-number` - номер шага
- `.wizard__step-title` - заголовок шага
- `.wizard__content` - контейнер содержимого
- `.wizard__navigation` - контейнер навигации
- `.wizard__button` - кнопки навигации

Модификаторы:
- `.wizard__step--active` - активный шаг
- `.wizard__step--completed` - завершенный шаг
- `.wizard__button--back` - кнопка "Назад"
- `.wizard__button--next` - кнопка "Далее"

## Доступность

- Поддержка клавиатурной навигации (Tab, Enter, Space)
- ARIA-атрибуты для скринридеров
- Семантическая разметка
- Фокус на активном шаге
- Сообщения об ошибках для скринридеров

## Зависимости

- React 16.8+
- TypeScript 4.0+ 