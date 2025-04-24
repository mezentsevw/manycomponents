import React, { ReactNode, useState, useEffect } from 'react';
import './Notification.css';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationProps {
  id?: string;
  type?: NotificationType;
  title?: string;
  message?: string;
  icon?: string;
  closable?: boolean;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
  children?: ReactNode;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type = 'info',
  title,
  message,
  icon,
  closable = true,
  autoClose = false,
  duration = 5000,
  onClose,
  children
}) => {
  const [visible, setVisible] = useState(true);

  const getIcon = () => {
    if (icon) return icon;
    switch (type) {
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose, visible]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div className={`notification notification-${type}`} id={id}>
      {children || (
        <>
          <div className="notification-icon">{getIcon()}</div>
          <div className="notification-content">
            {title && <div className="notification-title">{title}</div>}
            {message && <div className="notification-message">{message}</div>}
          </div>
          {closable && (
            <button 
              className="notification-close" 
              onClick={handleClose}
              aria-label="Закрыть"
            >
              ✕
            </button>
          )}
        </>
      )}
    </div>
  );
};

// Демо-компонент для демонстрации уведомлений
export const NotificationDemo: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<{
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    autoClose: boolean;
  }[]>([
    {
      id: 1,
      type: 'info',
      title: 'Информация',
      message: 'Это информационное сообщение. Оно просто уведомляет вас о чем-то.',
      autoClose: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Успех!',
      message: 'Операция успешно выполнена. Все прошло отлично.',
      autoClose: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Внимание',
      message: 'Обратите внимание на это предупреждение. Возможно, потребуются дополнительные действия.',
      autoClose: false
    },
    {
      id: 4,
      type: 'error',
      title: 'Ошибка',
      message: 'Произошла ошибка. Пожалуйста, попробуйте еще раз или обратитесь в поддержку.',
      autoClose: false
    }
  ]);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(note => note.id !== id));
  };

  const addNotification = () => {
    const types: NotificationType[] = ['info', 'success', 'warning', 'error'];
    const newId = notificationCount + 5;
    setNotificationCount(prev => prev + 1);
    
    const newNotification = {
      id: newId,
      type: types[Math.floor(Math.random() * types.length)],
      title: `Новое уведомление #${newId}`,
      message: `Это автоматически созданное уведомление с ID ${newId}`,
      autoClose: true
    };
    
    setNotifications([...notifications, newNotification]);
  };

  return (
    <div className="notification-demo">
      <div className="notification-controls">
        <button className="add-notification" onClick={addNotification}>
          Добавить уведомление
        </button>
      </div>
      <div className="notification-list">
        {notifications.map(note => (
          <Notification
            key={note.id}
            type={note.type}
            title={note.title}
            message={note.message}
            closable
            autoClose={note.autoClose}
            duration={5000}
            onClose={() => removeNotification(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Notification; 