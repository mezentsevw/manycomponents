import React from 'react';
import './Avatar.css';

type AvatarSize = 'small' | 'medium' | 'large';
type AvatarShape = 'circle' | 'square';
type AvatarStatus = 'online' | 'offline' | 'away';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  name,
  initials,
  size = 'medium',
  shape = 'circle',
  status,
  className = '',
  onClick,
}) => {
  const getInitials = () => {
    if (initials) return initials;
    if (name) {
      return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return '';
  };

  const getBackgroundColor = (str: string) => {
    const colors = [
      '#2196f3', // blue
      '#4caf50', // green
      '#ff9800', // orange
      '#f44336', // red
      '#9c27b0', // purple
      '#00bcd4', // cyan
      '#ffeb3b', // yellow
      '#795548', // brown
    ];
    const index = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const avatarClasses = [
    'avatar',
    `avatar--${size}`,
    `avatar--${shape}`,
    status ? `avatar--${status}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={avatarClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {src ? (
        <img src={src} alt={alt} className="avatar__image" />
      ) : (name || initials) ? (
        <div
          className="avatar__initials"
          style={{ backgroundColor: getBackgroundColor(name || initials || '') }}
        >
          {getInitials()}
        </div>
      ) : (
        <div className="avatar__placeholder">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
      {status && <span className="avatar__status" />}
    </div>
  );
};

// Демо-компонент для примера использования
export const AvatarDemo: React.FC = () => {
  return (
    <div className="avatar-demo">
      <h2>Примеры использования Avatar</h2>
      
      <div className="avatar-demo-grid">
        <div className="avatar-demo-group">
          <h3>Размеры</h3>
          <div className="avatar-demo-row">
            <Avatar size="small" name="John Doe" />
            <Avatar size="medium" name="John Doe" />
            <Avatar size="large" name="John Doe" />
          </div>
        </div>

        <div className="avatar-demo-group">
          <h3>Формы</h3>
          <div className="avatar-demo-row">
            <Avatar shape="circle" name="John Doe" />
            <Avatar shape="square" name="John Doe" />
          </div>
        </div>

        <div className="avatar-demo-group">
          <h3>Статусы</h3>
          <div className="avatar-demo-row">
            <Avatar status="online" name="John Doe" />
            <Avatar status="offline" name="John Doe" />
            <Avatar status="away" name="John Doe" />
          </div>
        </div>

        <div className="avatar-demo-group">
          <h3>Изображения</h3>
          <div className="avatar-demo-row">
            <Avatar
              src="https://i.pravatar.cc/150?img=1"
              alt="User 1"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=2"
              alt="User 2"
            />
          </div>
        </div>

        <div className="avatar-demo-group">
          <h3>Инициалы</h3>
          <div className="avatar-demo-row">
            <Avatar name="John Doe" />
            <Avatar initials="AB" />
            <Avatar name="Charlie Brown" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar; 