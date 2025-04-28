import React, { useRef, useState } from 'react';
import './FileUpload.css';

type FileUploadVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
type FileUploadSize = 'small' | 'medium' | 'large';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  variant?: FileUploadVariant;
  size?: FileUploadSize;
  className?: string;
  onUpload?: (files: File[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  label?: string;
  icon?: React.ReactNode;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '*',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  variant = 'primary',
  size = 'medium',
  className = '',
  onUpload,
  onError,
  disabled = false,
  label = 'Выберите файл',
  icon,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFiles = (files: FileList): File[] => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        errors.push(`Файл ${file.name} превышает максимальный размер ${maxSize / 1024 / 1024}MB`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      onError?.(errors.join('\n'));
    }

    return validFiles;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      setSelectedFiles(multiple ? [...selectedFiles, ...validFiles] : validFiles);
      onUpload?.(validFiles);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = e.target.files;
    if (files) {
      const validFiles = validateFiles(files);
      
      if (validFiles.length > 0) {
        setSelectedFiles(multiple ? [...selectedFiles, ...validFiles] : validFiles);
        onUpload?.(validFiles);
      }
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const uploadClasses = [
    'file-upload',
    `file-upload--${variant}`,
    `file-upload--${size}`,
    isDragging && 'file-upload--dragging',
    disabled && 'file-upload--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="file-upload-container">
      <div
        className={uploadClasses}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="file-upload__input"
          disabled={disabled}
        />
        {icon && <span className="file-upload__icon">{icon}</span>}
        <span className="file-upload__label">{label}</span>
      </div>
      {selectedFiles.length > 0 && (
        <div className="file-upload__files">
          {selectedFiles.map((file, index) => (
            <div key={index} className="file-upload__file">
              <span className="file-upload__file-name">{file.name}</span>
              <span className="file-upload__file-size">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Демо-компонент
export const FileUploadDemo: React.FC = () => {
  const handleUpload = (files: File[]) => {
    console.log('Загружены файлы:', files);
  };

  const handleError = (error: string) => {
    console.error('Ошибка загрузки:', error);
  };

  return (
    <div className="file-upload-demo">
      <h2>Примеры использования FileUpload</h2>

      <div className="file-upload-demo-grid">
        <div className="file-upload-demo-group">
          <h3>Варианты</h3>
          <div className="file-upload-demo-row">
            <FileUpload
              variant="primary"
              onUpload={handleUpload}
              onError={handleError}
            />
            <FileUpload
              variant="secondary"
              onUpload={handleUpload}
              onError={handleError}
            />
            <FileUpload
              variant="success"
              onUpload={handleUpload}
              onError={handleError}
            />
          </div>
        </div>

        <div className="file-upload-demo-group">
          <h3>Размеры</h3>
          <div className="file-upload-demo-row">
            <FileUpload
              size="small"
              onUpload={handleUpload}
              onError={handleError}
            />
            <FileUpload
              size="medium"
              onUpload={handleUpload}
              onError={handleError}
            />
            <FileUpload
              size="large"
              onUpload={handleUpload}
              onError={handleError}
            />
          </div>
        </div>

        <div className="file-upload-demo-group">
          <h3>Дополнительные опции</h3>
          <div className="file-upload-demo-row">
            <FileUpload
              multiple
              accept="image/*"
              maxSize={5 * 1024 * 1024}
              label="Загрузить изображения"
              onUpload={handleUpload}
              onError={handleError}
            />
            <FileUpload
              disabled
              label="Отключено"
              onUpload={handleUpload}
              onError={handleError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload; 