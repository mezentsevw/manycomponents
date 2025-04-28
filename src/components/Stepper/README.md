# Stepper

Компонент для отображения пошагового процесса. Показывает прогресс выполнения многошаговой операции и текущий активный шаг.

## Использование

```tsx
import { Stepper } from './Stepper';

// Базовое использование
<Stepper
  steps={[
    {
      id: 'step1',
      label: 'Шаг 1',
      description: 'Описание первого шага',
    },
    {
      id: 'step2',
      label: 'Шаг 2',
      description: 'Описание второго шага',
    },
  ]}
  activeStep="step2"
/>

// Вертикальный Stepper
<Stepper
  steps={steps}
  activeStep="step2"
  orientation="vertical"
/>

// С иконками
<Stepper
  steps={steps.map(step => ({
    ...step,
    icon: <Icon />,
  }))}
  activeStep="step2"
/>

// Интерактивный
<Stepper
  steps={steps}
  activeStep="step2"
  onStepClick={stepId => console.log('Clicked step:', stepId)}
/>
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| steps | Step[] | - | Массив объектов шагов |
| activeStep | string | - | ID активного шага |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Ориентация Stepper |
| className | string | - | Дополнительные CSS классы |
| onStepClick | (stepId: string) => void | - | Обработчик клика по шагу |

## Интерфейс Step

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| id | string | - | Уникальный идентификатор шага |
| label | string | - | Заголовок шага |
| description | string | - | Описание шага |
| status | 'completed' \| 'active' \| 'pending' | - | Статус шага |
| icon | React.ReactNode | - | Иконка шага |

## Состояния шагов

- completed: завершенный шаг (зеленый)
- active: текущий шаг (синий)
- pending: ожидающий шаг (серый)

## Ориентация

- horizontal: горизонтальное расположение шагов
- vertical: вертикальное расположение шагов

## Особенности

- Автоматическое определение статуса шагов
- Поддержка иконок
- Интерактивность (клики по шагам)
- Адаптивный дизайн
- Плавные переходы между состояниями
- Поддержка RTL (справа налево) 