import React, { useEffect, useRef, useState } from 'react';
import './Menu.css';

interface MenuItemBase {
  id: string;
}

interface MenuItemContent extends MenuItemBase {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: never;
  onClick?: () => void;
}

interface MenuItemDivider extends MenuItemBase {
  divider: true;
  label?: never;
  icon?: never;
  disabled?: never;
  onClick?: never;
}

type MenuItem = MenuItemContent | MenuItemDivider;

interface MenuProps {
  items: MenuItem[];
  trigger: React.ReactNode;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  items,
  trigger,
  placement = 'bottom-start',
  className = '',
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      closeMenu();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      onOpen?.();
    } else {
      onClose?.();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled) {
      item.onClick?.();
      closeMenu();
    }
  };

  const menuClasses = [
    'menu',
    `menu--${placement}`,
    isOpen && 'menu--open',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="menu-container">
      <div
        ref={triggerRef}
        className="menu__trigger"
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={menuClasses}
          role="menu"
        >
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {item.divider ? (
                <div className="menu__divider" />
              ) : (
                <div
                  className={[
                    'menu__item',
                    item.disabled && 'menu__item--disabled',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleItemClick(item)}
                  role="menuitem"
                  tabIndex={item.disabled ? -1 : 0}
                >
                  {item.icon && (
                    <span className="menu__item-icon">{item.icon}</span>
                  )}
                  <span className="menu__item-label">{item.label}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

// Демо-компонент
export const MenuDemo: React.FC = () => {
  const items: MenuItem[] = [
    {
      id: '1',
      label: 'Профиль',
      icon: '👤',
      onClick: () => console.log('Профиль'),
    },
    {
      id: '2',
      label: 'Настройки',
      icon: '⚙️',
      onClick: () => console.log('Настройки'),
    },
    {
      id: '3',
      divider: true,
    } as MenuItemDivider,
    {
      id: '4',
      label: 'Выйти',
      icon: '🚪',
      onClick: () => console.log('Выйти'),
    },
    {
      id: '5',
      label: 'Отключено',
      icon: '🔒',
      disabled: true,
    },
  ];

  return (
    <div className="menu-demo">
      <h2>Примеры использования Menu</h2>

      <div className="menu-demo-grid">
        <div className="menu-demo-group">
          <h3>Базовое меню</h3>
          <div className="menu-demo-row">
            <Menu
              items={items}
              trigger={<button>Открыть меню</button>}
            />
          </div>
        </div>

        <div className="menu-demo-group">
          <h3>Разные позиции</h3>
          <div className="menu-demo-row">
            <Menu
              items={items}
              trigger={<button>Bottom Start</button>}
              placement="bottom-start"
            />
            <Menu
              items={items}
              trigger={<button>Bottom End</button>}
              placement="bottom-end"
            />
            <Menu
              items={items}
              trigger={<button>Top Start</button>}
              placement="top-start"
            />
            <Menu
              items={items}
              trigger={<button>Top End</button>}
              placement="top-end"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu; 