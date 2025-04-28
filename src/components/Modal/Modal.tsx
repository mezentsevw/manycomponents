import React, { useEffect, useRef } from 'react';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div
        ref={modalRef}
        className={`modal ${size} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div className="modal-header">
          {title && <h2 id="modal-title" className="modal-title">{title}</h2>}
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        <div className="modal-content">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// Демо-компонент для примера использования
export const ModalDemo: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenLarge, setIsOpenLarge] = React.useState(false);
  const [isOpenSmall, setIsOpenSmall] = React.useState(false);

  return (
    <div className="modal-demo">
      <h2>Примеры использования Modal</h2>
      
      <div className="modal-demo-grid">
        <div className="modal-demo-group">
          <h3>Размеры</h3>
          <div className="modal-demo-row">
            <button onClick={() => setIsOpenSmall(true)}>Открыть маленькое окно</button>
            <button onClick={() => setIsOpen(true)}>Открыть среднее окно</button>
            <button onClick={() => setIsOpenLarge(true)}>Открыть большое окно</button>
          </div>
        </div>

        <div className="modal-demo-group">
          <h3>С контентом</h3>
          <div className="modal-demo-row">
            <button onClick={() => setIsOpen(true)}>Открыть модальное окно</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpenSmall}
        onClose={() => setIsOpenSmall(false)}
        title="Маленькое окно"
        size="sm"
      >
        <p>Это маленькое модальное окно</p>
      </Modal>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Среднее окно"
        size="md"
        footer={
          <div className="modal-footer-demo">
            <button onClick={() => setIsOpen(false)}>Отмена</button>
            <button onClick={() => setIsOpen(false)}>Подтвердить</button>
          </div>
        }
      >
        <p>Это среднее модальное окно с футером</p>
        <p>Вы можете добавить любой контент внутрь</p>
      </Modal>

      <Modal
        isOpen={isOpenLarge}
        onClose={() => setIsOpenLarge(false)}
        title="Большое окно"
        size="lg"
      >
        <div className="modal-content-demo">
          <p>Это большое модальное окно</p>
          <p>Оно может содержать много контента</p>
          <p>И даже формы или таблицы</p>
        </div>
      </Modal>
    </div>
  );
};

export default Modal; 