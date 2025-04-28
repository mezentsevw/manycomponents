# TreeView

Компонент TreeView предназначен для отображения иерархических данных в виде дерева. Поддерживает вложенные узлы, иконки, анимации разворачивания/сворачивания и обработку кликов.

## Использование

```tsx
import TreeView from './TreeView';

const treeData = [
  {
    id: '1',
    label: 'Узел 1',
    children: [
      {
        id: '1.1',
        label: 'Подузел 1.1',
        icon: <FolderIcon />
      }
    ]
  }
];

function App() {
  return (
    <TreeView
      data={treeData}
      onNodeClick={(node) => console.log('Клик по узлу:', node)}
      onNodeToggle={(node) => console.log('Переключение узла:', node)}
    />
  );
}
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| data | TreeNode[] | [] | Массив узлов дерева |
| onNodeClick | (node: TreeNode) => void | - | Обработчик клика по узлу |
| onNodeToggle | (node: TreeNode) => void | - | Обработчик разворачивания/сворачивания узла |
| defaultExpanded | string[] | [] | ID узлов, которые должны быть развернуты по умолчанию |
| className | string | - | Дополнительные CSS-классы |

## Структура TreeNode

```typescript
interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
}
```

## Особенности

- Поддержка вложенных узлов любой глубины
- Анимации разворачивания/сворачивания
- Возможность добавления иконок к узлам
- Обработка кликов по узлам
- Настраиваемые стили через CSS-классы
- Адаптивный дизайн
- Поддержка клавиатурной навигации 