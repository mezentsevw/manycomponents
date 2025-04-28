import React, { useEffect, useCallback } from 'react';
import './Drawer.css';

type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  width?: string | number;
  height?: string | number;
  className?: string;
  children: React.ReactNode;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  showOverlay?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  placement = 'left',
  width = 300,
  height = 300,
  className = '',
  children,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  showOverlay = true,
}) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (closeOnEsc && event.key === 'Escape') {
      onClose();
    }
  }, [closeOnEsc, onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  const drawerStyle: React.CSSProperties = {
    width: ['left', 'right'].includes(placement) ? width : '100%',
    height: ['top', 'bottom'].includes(placement) ? height : '100%',
  };

  const drawerClasses = [
    'drawer',
    `drawer--${placement}`,
    open && 'drawer--open',
    className,
  ].filter(Boolean).join(' ');

  if (!open) {
    return null;
  }

  return (
    <div className="drawer-container">
      {showOverlay && (
        <div
          className="drawer__overlay"
          onClick={closeOnOverlayClick ? onClose : undefined}
        />
      )}
      <div
        className={drawerClasses}
        style={drawerStyle}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

// Демо-компонент
export const DrawerDemo: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<DrawerPlacement>('left');

  const handleOpen = (newPlacement: DrawerPlacement) => {
    setPlacement(newPlacement);
    setIsOpen(true);
  };

  return (
    <div className="drawer-demo">
      <h2>Примеры использования Drawer</h2>

      <div className="drawer-demo-grid">
        <div className="drawer-demo-group">
          <h3>Разные позиции</h3>
          <div className="drawer-demo-row">
            <button onClick={() => handleOpen('left')}>
              Слева
            </button>
            <button onClick={() => handleOpen('right')}>
              Справа
            </button>
            <button onClick={() => handleOpen('top')}>
              Сверху
            </button>
            <button onClick={() => handleOpen('bottom')}>
              Снизу
            </button>
          </div>
        </div>
      </div>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        placement={placement}
      >
        <div className="drawer-demo-content">
          <h3>Drawer Content</h3>
          <p>Это содержимое боковой панели.</p>
          <button onClick={() => setIsOpen(false)}>
            Закрыть
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default Drawer; 