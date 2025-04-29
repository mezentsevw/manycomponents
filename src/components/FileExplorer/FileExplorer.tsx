import React, { useState, useRef, useEffect } from 'react';
import './FileExplorer.css';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified?: Date;
  path: string;
}

export interface FileExplorerProps {
  files: FileItem[];
  onFileSelect?: (file: FileItem) => void;
  onFolderOpen?: (folder: FileItem) => void;
  onFileDelete?: (file: FileItem) => void;
  onFileRename?: (file: FileItem, newName: string) => void;
  className?: string;
  initialPath?: string;
  sortBy?: 'name' | 'type' | 'size' | 'modified';
  sortDirection?: 'asc' | 'desc';
  showHidden?: boolean;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
  onFolderOpen,
  onFileDelete,
  onFileRename,
  className = '',
  initialPath = '/',
  sortBy = 'name',
  sortDirection = 'asc',
  showHidden = false,
}) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    file: FileItem;
  } | null>(null);
  const [renamingFile, setRenamingFile] = useState<FileItem | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const getCurrentFiles = () => {
    return files
      .filter((file) => file.path === currentPath)
      .filter((file) => showHidden || !file.name.startsWith('.'))
      .sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name) * direction;
          case 'type':
            return (a.type === b.type
              ? a.name.localeCompare(b.name)
              : a.type.localeCompare(b.type)) * direction;
          case 'size':
            return ((a.size || 0) - (b.size || 0)) * direction;
          case 'modified':
            return (
              (a.modified?.getTime() || 0) - (b.modified?.getTime() || 0)
            ) * direction;
          default:
            return 0;
        }
      });
  };

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file);
    if (file.type === 'folder') {
      onFolderOpen?.(file);
      setCurrentPath(file.path);
    } else {
      onFileSelect?.(file);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  const handleRename = () => {
    if (renamingFile && newFileName) {
      onFileRename?.(renamingFile, newFileName);
      setRenamingFile(null);
      setNewFileName('');
    }
  };

  const handleDelete = (file: FileItem) => {
    if (window.confirm(`Удалить ${file.name}?`)) {
      onFileDelete?.(file);
    }
  };

  const formatSize = (size?: number) => {
    if (!size) return '-';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(1)} ${units[i]}`;
  };

  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setContextMenu(null);
        setRenamingFile(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`file-explorer ${className}`}
    >
      <div className="file-explorer__header">
        <div className="file-explorer__path">
          {currentPath.split('/').map((part, index, array) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="file-explorer__path-separator">/</span>}
              <button
                className="file-explorer__path-part"
                onClick={() =>
                  setCurrentPath(array.slice(0, index + 1).join('/') || '/')
                }
              >
                {part || 'Root'}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="file-explorer__content">
        <table className="file-explorer__table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Тип</th>
              <th>Размер</th>
              <th>Изменен</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentFiles().map((file) => (
              <tr
                key={file.id}
                className={`file-explorer__row ${
                  selectedFile?.id === file.id ? 'file-explorer__row--selected' : ''
                }`}
                onClick={() => handleFileClick(file)}
                onContextMenu={(e) => handleContextMenu(e, file)}
              >
                <td>
                  {renamingFile?.id === file.id ? (
                    <input
                      type="text"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      onBlur={handleRename}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename();
                        if (e.key === 'Escape') {
                          setRenamingFile(null);
                          setNewFileName('');
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <>
                      <span className="file-explorer__icon">
                        {file.type === 'folder' ? '📁' : '📄'}
                      </span>
                      {file.name}
                    </>
                  )}
                </td>
                <td>{file.type === 'folder' ? 'Папка' : 'Файл'}</td>
                <td>{formatSize(file.size)}</td>
                <td>{formatDate(file.modified)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {contextMenu && (
        <div
          className="file-explorer__context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            className="file-explorer__context-menu-item"
            onClick={() => {
              setRenamingFile(contextMenu.file);
              setNewFileName(contextMenu.file.name);
              setContextMenu(null);
            }}
          >
            Переименовать
          </button>
          <button
            className="file-explorer__context-menu-item"
            onClick={() => {
              handleDelete(contextMenu.file);
              setContextMenu(null);
            }}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

// Демо-компонент
export const FileExplorerDemo: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Документы',
      type: 'folder',
      path: '/',
    },
    {
      id: '2',
      name: 'Изображения',
      type: 'folder',
      path: '/',
    },
    {
      id: '3',
      name: 'report.pdf',
      type: 'file',
      size: 1024 * 1024,
      modified: new Date(),
      path: '/',
    },
    {
      id: '4',
      name: 'presentation.pptx',
      type: 'file',
      size: 5 * 1024 * 1024,
      modified: new Date(Date.now() - 86400000),
      path: '/',
    },
  ]);

  const handleFileRename = (file: FileItem, newName: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === file.id ? { ...f, name: newName } : f
      )
    );
  };

  const handleFileDelete = (file: FileItem) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
  };

  return (
    <div className="file-explorer-demo">
      <h2>File Explorer Demo</h2>
      <FileExplorer
        files={files}
        onFileRename={handleFileRename}
        onFileDelete={handleFileDelete}
      />
    </div>
  );
};

export default FileExplorer; 