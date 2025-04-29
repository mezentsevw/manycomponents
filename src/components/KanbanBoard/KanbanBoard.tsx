import React, { useState, useCallback } from 'react';
import './KanbanBoard.css';

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

interface KanbanBoardProps {
  columns: Column[];
  onTaskMove?: (taskId: string, fromColumnId: string, toColumnId: string) => void;
  onTaskAdd?: (columnId: string, task: Omit<Task, 'id'>) => void;
  onTaskEdit?: (taskId: string, task: Partial<Task>) => void;
  onTaskDelete?: (taskId: string) => void;
  className?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns: initialColumns,
  onTaskMove,
  onTaskAdd,
  onTaskEdit,
  onTaskDelete,
  className = '',
}) => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedTask, setDraggedTask] = useState<{ task: Task; columnId: string } | null>(null);

  const handleDragStart = useCallback((task: Task, columnId: string) => {
    setDraggedTask({ task, columnId });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (columnId: string) => {
      if (!draggedTask) return;

      const { task, columnId: fromColumnId } = draggedTask;
      if (fromColumnId === columnId) return;

      const newColumns = columns.map((column) => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((t) => t.id !== task.id),
          };
        }
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, { ...task, status: column.title }],
          };
        }
        return column;
      });

      setColumns(newColumns);
      onTaskMove?.(task.id, fromColumnId, columnId);
      setDraggedTask(null);
    },
    [columns, draggedTask, onTaskMove]
  );

  const handleAddTask = useCallback(
    (columnId: string) => {
      const newTask: Omit<Task, 'id'> = {
        title: 'Новая задача',
        status: columns.find((col) => col.id === columnId)?.title || '',
        priority: 'medium',
      };
      onTaskAdd?.(columnId, newTask);
    },
    [columns, onTaskAdd]
  );

  const handleEditTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      onTaskEdit?.(taskId, updates);
    },
    [onTaskEdit]
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      onTaskDelete?.(taskId);
    },
    [onTaskDelete]
  );

  return (
    <div className={`kanban-board ${className}`}>
      {columns.map((column) => (
        <div
          key={column.id}
          className="kanban-board__column"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(column.id)}
        >
          <div className="kanban-board__column-header">
            <h3 className="kanban-board__column-title">{column.title}</h3>
            <button
              className="kanban-board__add-button"
              onClick={() => handleAddTask(column.id)}
              aria-label={`Добавить задачу в ${column.title}`}
            >
              +
            </button>
          </div>
          <div className="kanban-board__tasks">
            {column.tasks.map((task) => (
              <div
                key={task.id}
                className={`kanban-board__task kanban-board__task--${task.priority}`}
                draggable
                onDragStart={() => handleDragStart(task, column.id)}
              >
                <div className="kanban-board__task-header">
                  <h4 className="kanban-board__task-title">{task.title}</h4>
                  <div className="kanban-board__task-actions">
                    <button
                      className="kanban-board__edit-button"
                      onClick={() => handleEditTask(task.id, { title: 'Новое название' })}
                      aria-label="Редактировать задачу"
                    >
                      ✎
                    </button>
                    <button
                      className="kanban-board__delete-button"
                      onClick={() => handleDeleteTask(task.id)}
                      aria-label="Удалить задачу"
                    >
                      ×
                    </button>
                  </div>
                </div>
                {task.description && (
                  <p className="kanban-board__task-description">{task.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Демо-компонент
export const KanbanBoardDemo: React.FC = () => {
  const columns: Column[] = [
    {
      id: 'todo',
      title: 'К выполнению',
      tasks: [
        {
          id: '1',
          title: 'Задача 1',
          description: 'Описание задачи 1',
          status: 'К выполнению',
          priority: 'high' as const,
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'В работе',
      tasks: [
        {
          id: '2',
          title: 'Задача 2',
          description: 'Описание задачи 2',
          status: 'В работе',
          priority: 'medium' as const,
        },
      ],
    },
    {
      id: 'done',
      title: 'Выполнено',
      tasks: [
        {
          id: '3',
          title: 'Задача 3',
          description: 'Описание задачи 3',
          status: 'Выполнено',
          priority: 'low' as const,
        },
      ],
    },
  ];

  return (
    <div className="kanban-board-demo">
      <h2>Пример использования KanbanBoard</h2>
      <KanbanBoard
        columns={columns}
        onTaskMove={(taskId, fromColumnId, toColumnId) => {
          console.log(`Перемещена задача ${taskId} из ${fromColumnId} в ${toColumnId}`);
        }}
        onTaskAdd={(columnId, task) => {
          console.log(`Добавлена задача в колонку ${columnId}:`, task);
        }}
        onTaskEdit={(taskId, updates) => {
          console.log(`Изменена задача ${taskId}:`, updates);
        }}
        onTaskDelete={(taskId) => {
          console.log(`Удалена задача ${taskId}`);
        }}
      />
    </div>
  );
};

export default KanbanBoard; 