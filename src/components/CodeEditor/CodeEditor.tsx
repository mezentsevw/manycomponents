import React, { useState, useRef, useEffect } from 'react';
import './CodeEditor.css';

export interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  language?: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  lineNumbers?: boolean;
  className?: string;
  placeholder?: string;
  height?: string | number;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value = '',
  onChange,
  language = 'javascript',
  theme = 'light',
  readOnly = false,
  lineNumbers = true,
  className = '',
  placeholder = 'Введите код...',
  height = '300px',
}) => {
  const [content, setContent] = useState(value);
  const editorRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onChange) {
      onChange(content);
    }
  }, [content, onChange]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.textContent || '';
    setContent(newContent);
    updateLineNumbers();
  };

  const updateLineNumbers = () => {
    if (!lineNumbersRef.current || !editorRef.current) return;

    const lines = content.split('\n').length;
    const lineNumbersHtml = Array.from({ length: lines }, (_, i) => i + 1)
      .map((num) => `<div class="code-editor__line-number">${num}</div>`)
      .join('');

    lineNumbersRef.current.innerHTML = lineNumbersHtml;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const selection = window.getSelection();
      if (!selection) return;

      const range = selection.getRangeAt(0);
      const tabNode = document.createTextNode('  ');
      range.insertNode(tabNode);
      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div className={`code-editor ${className} code-editor--${theme}`}>
      {lineNumbers && (
        <div className="code-editor__line-numbers" ref={lineNumbersRef}>
          <div className="code-editor__line-number">1</div>
        </div>
      )}
      <div
        ref={editorRef}
        className="code-editor__content"
        contentEditable={!readOnly}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        style={{ height }}
        data-placeholder={placeholder}
        data-language={language}
      >
        {content}
      </div>
    </div>
  );
};

// Демо-компонент
export const CodeEditorDemo: React.FC = () => {
  const [code, setCode] = useState('');

  return (
    <div className="code-editor-demo">
      <h2>Пример использования CodeEditor</h2>
      <div className="code-editor-demo__grid">
        <div className="code-editor-demo__item">
          <h3>JavaScript</h3>
          <CodeEditor
            value={code}
            onChange={setCode}
            language="javascript"
            theme="light"
            height="200px"
            placeholder="Введите JavaScript код..."
          />
        </div>
        <div className="code-editor-demo__item">
          <h3>TypeScript</h3>
          <CodeEditor
            value={code}
            onChange={setCode}
            language="typescript"
            theme="dark"
            height="200px"
            placeholder="Введите TypeScript код..."
          />
        </div>
        <div className="code-editor-demo__item">
          <h3>Только для чтения</h3>
          <CodeEditor
            value="const greeting = 'Hello, World!';\nconsole.log(greeting);"
            readOnly
            language="javascript"
            height="200px"
          />
        </div>
        <div className="code-editor-demo__item">
          <h3>Без нумерации строк</h3>
          <CodeEditor
            value={code}
            onChange={setCode}
            language="javascript"
            lineNumbers={false}
            height="200px"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor; 