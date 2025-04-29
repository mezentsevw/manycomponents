# KanbanBoard

Компонент для создания канбан-досок с возможностью перетаскивания задач.

## Особенности

- Drag-and-drop для перемещения задач
- Приоритеты задач (высокий, средний, низкий)
- Добавление, редактирование и удаление задач
- Адаптивный дизайн
- Поддержка клавиатурной навигации
- Кастомизируемые стили

## Использование

```tsx
import { KanbanBoard } from './KanbanBoard';

const columns = [
  {
    id: 'todo',
    title: 'К выполнению',
    tasks: [
      {
        id: '1',
        title: 'Задача 1',
        description: 'Описание задачи',
        status: 'К выполнению',
        priority: 'high',
      },
    ],
  },
  // ...
];

const MyBoard = () => {
  return (
    <KanbanBoard
      columns={columns}
      onTaskMove={(taskId, fromColumnId, toColumnId) => {
        console.log(`Перемещена задача ${taskId}`);
      }}
    />
  );
};
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| columns | `Column[]` | - | Массив колонок с задачами |
| onTaskMove | `(taskId: string, fromColumnId: string, toColumnId: string) => void` | - | Колбэк при перемещении задачи |
| onTaskAdd | `(columnId: string, task: Omit<Task, 'id'>) => void` | - | Колбэк при добавлении задачи |
| onTaskEdit | `(taskId: string, task: Partial<Task>) => void` | - | Колбэк при редактировании задачи |
| onTaskDelete | `(taskId: string) => void` | - | Колбэк при удалении задачи |
| className | `string` | - | Дополнительные классы |

## Интерфейсы

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
```

## Примеры

### Базовое использование

```tsx
const columns = [
  {
    id: 'todo',
    title: 'К выполнению',
    tasks: [
      {
        id: '1',
        title: 'Задача 1',
        status: 'К выполнению',
      },
    ],
  },
];

<KanbanBoard columns={columns} />
```

### С обработчиками событий

```tsx
<KanbanBoard
  columns={columns}
  onTaskMove={(taskId, fromColumnId, toColumnId) => {
    // Обработка перемещения
  }}
  onTaskAdd={(columnId, task) => {
    // Обработка добавления
  }}
  onTaskEdit={(taskId, updates) => {
    // Обработка редактирования
  }}
  onTaskDelete={(taskId) => {
    // Обработка удаления
  }}
/>
```

### С кастомными стилями

```tsx
<KanbanBoard
  columns={columns}
  className="my-custom-board"
/>
```

## Стилизация

Компонент использует BEM-нотацию для именования классов. Основные классы:

- `.kanban-board` - основной контейнер
- `.kanban-board__column` - колонка
- `.kanban-board__column-header` - заголовок колонки
- `.kanban-board__column-title` - название колонки
- `.kanban-board__add-button` - кнопка добавления
- `.kanban-board__tasks` - контейнер задач
- `.kanban-board__task` - задача
- `.kanban-board__task-header` - заголовок задачи
- `.kanban-board__task-title` - название задачи
- `.kanban-board__task-actions` - действия с задачей
- `.kanban-board__task-description` - описание задачи

Модификаторы:
- `.kanban-board__task--high` - задача с высоким приоритетом
- `.kanban-board__task--medium` - задача со средним приоритетом
- `.kanban-board__task--low` - задача с низким приоритетом

## Доступность

- Поддержка клавиатурной навигации
- ARIA-атрибуты для скринридеров
- Семантическая разметка
- Фокус на активных элементах
- Подсказки для действий

## Зависимости

- React 16.8+
- TypeScript 4.0+ 