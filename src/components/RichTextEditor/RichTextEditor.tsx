import React, { useRef, useState, useEffect } from 'react';
import './RichTextEditor.css';

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  toolbar?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    list?: boolean;
    align?: boolean;
    link?: boolean;
    image?: boolean;
  };
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Введите текст...',
  readOnly = false,
  className = '',
  toolbar = {
    bold: true,
    italic: true,
    underline: true,
    list: true,
    align: true,
    link: true,
    image: true,
  },
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
      }
    }
  };

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className={`rich-text-editor ${className} ${isFocused ? 'rich-text-editor--focused' : ''}`}>
      {!readOnly && (
        <div className="rich-text-editor__toolbar">
          {toolbar.bold && (
            <button
              type="button"
              className="rich-text-editor__button"
              onClick={() => execCommand('bold')}
              title="Жирный (Ctrl+B)"
            >
              <strong>B</strong>
            </button>
          )}
          {toolbar.italic && (
            <button
              type="button"
              className="rich-text-editor__button"
              onClick={() => execCommand('italic')}
              title="Курсив (Ctrl+I)"
            >
              <em>I</em>
            </button>
          )}
          {toolbar.underline && (
            <button
              type="button"
              className="rich-text-editor__button"
              onClick={() => execCommand('underline')}
              title="Подчеркнутый (Ctrl+U)"
            >
              <u>U</u>
            </button>
          )}
          {toolbar.list && (
            <>
              <button
                type="button"
                className="rich-text-editor__button"
                onClick={() => execCommand('insertUnorderedList')}
                title="Маркированный список"
              >
                • List
              </button>
              <button
                type="button"
                className="rich-text-editor__button"
                onClick={() => execCommand('insertOrderedList')}
                title="Нумерованный список"
              >
                1. List
              </button>
            </>
          )}
          {toolbar.align && (
            <>
              <button
                type="button"
                className="rich-text-editor__button"
                onClick={() => execCommand('justifyLeft')}
                title="Выровнять по левому краю"
              >
                ←
              </button>
              <button
                type="button"
                className="rich-text-editor__button"
                onClick={() => execCommand('justifyCenter')}
                title="Выровнять по центру"
              >
                ↔
              </button>
              <button
                type="button"
                className="rich-text-editor__button"
                onClick={() => execCommand('justifyRight')}
                title="Выровнять по правому краю"
              >
                →
              </button>
            </>
          )}
          {toolbar.link && (
            <button
              type="button"
              className="rich-text-editor__button"
              onClick={() => {
                const url = prompt('Введите URL:');
                if (url) execCommand('createLink', url);
              }}
              title="Вставить ссылку"
            >
              🔗
            </button>
          )}
          {toolbar.image && (
            <button
              type="button"
              className="rich-text-editor__button"
              onClick={() => {
                const url = prompt('Введите URL изображения:');
                if (url) execCommand('insertImage', url);
              }}
              title="Вставить изображение"
            >
              🖼️
            </button>
          )}
        </div>
      )}
      <div
        ref={editorRef}
        className="rich-text-editor__content"
        contentEditable={!readOnly}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
      />
    </div>
  );
};

// Демо-компонент
export const RichTextEditorDemo: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="rich-text-editor-demo">
      <h2>Rich Text Editor Demo</h2>
      <RichTextEditor
        value={value}
        onChange={setValue}
        placeholder="Начните вводить текст..."
      />
      <div className="rich-text-editor-demo__preview">
        <h3>Предпросмотр HTML:</h3>
        <pre>{value}</pre>
      </div>
    </div>
  );
};

export default RichTextEditor; 