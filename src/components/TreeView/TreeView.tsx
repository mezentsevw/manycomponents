import React, { useState } from 'react';
import './TreeView.css';

type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: React.ReactNode;
  expanded?: boolean;
};

interface TreeViewProps {
  data: TreeNode[];
  onNodeClick?: (node: TreeNode) => void;
  onNodeToggle?: (node: TreeNode) => void;
  className?: string;
  defaultExpanded?: boolean;
}

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  onNodeClick,
  onNodeToggle,
  className = '',
  defaultExpanded = false,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleNodeClick = (node: TreeNode) => {
    onNodeClick?.(node);
  };

  const handleNodeToggle = (node: TreeNode) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (expandedNodes.has(node.id)) {
      newExpandedNodes.delete(node.id);
    } else {
      newExpandedNodes.add(node.id);
    }
    setExpandedNodes(newExpandedNodes);
    onNodeToggle?.(node);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id) || node.expanded || defaultExpanded;

    return (
      <div key={node.id} className="tree-view__node">
        <div
          className="tree-view__node-content"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {hasChildren && (
            <button
              className={`tree-view__toggle ${isExpanded ? 'tree-view__toggle--expanded' : ''}`}
              onClick={() => handleNodeToggle(node)}
              aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
            >
              <span className="tree-view__toggle-icon">▶</span>
            </button>
          )}
          <div
            className="tree-view__node-label"
            onClick={() => handleNodeClick(node)}
          >
            {node.icon && <span className="tree-view__node-icon">{node.icon}</span>}
            <span>{node.label}</span>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="tree-view__children">
            {node.children?.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`tree-view ${className}`}>
      {data.map((node) => renderNode(node))}
    </div>
  );
};

// Демо-компонент
export const TreeViewDemo: React.FC = () => {
  const demoData: TreeNode[] = [
    {
      id: '1',
      label: 'Документы',
      children: [
        {
          id: '1.1',
          label: 'Работа',
          children: [
            { id: '1.1.1', label: 'Отчеты' },
            { id: '1.1.2', label: 'Презентации' },
          ],
        },
        {
          id: '1.2',
          label: 'Личное',
          children: [
            { id: '1.2.1', label: 'Фото' },
            { id: '1.2.2', label: 'Видео' },
          ],
        },
      ],
    },
    {
      id: '2',
      label: 'Приложения',
      children: [
        { id: '2.1', label: 'Текстовые редакторы' },
        { id: '2.2', label: 'Графические редакторы' },
      ],
    },
  ];

  return (
    <div className="tree-view-demo">
      <h2>Примеры использования TreeView</h2>
      
      <div className="tree-view-demo-grid">
        <div className="tree-view-demo-group">
          <h3>Базовое использование</h3>
          <TreeView data={demoData} />
        </div>

        <div className="tree-view-demo-group">
          <h3>С обработчиками событий</h3>
          <TreeView
            data={demoData}
            onNodeClick={(node) => console.log('Выбран узел:', node)}
            onNodeToggle={(node) => console.log('Переключен узел:', node)}
          />
        </div>

        <div className="tree-view-demo-group">
          <h3>Развернутый по умолчанию</h3>
          <TreeView data={demoData} defaultExpanded />
        </div>
      </div>
    </div>
  );
};

export default TreeView; 