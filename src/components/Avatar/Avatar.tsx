import React from 'react';
import './Avatar.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away';
  initials?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  shape = 'circle',
  status,
  initials,
  className = '',
  style,
  onClick
}) => {
  const renderContent = () => {
    if (src) {
      return <img src={src} alt={alt || 'Avatar'} />;
    }
    if (initials) {
      return <span className="avatar-initials">{initials}</span>;
    }
    return <span className="avatar-placeholder">?</span>;
  };

  return (
    <div
      className={`avatar ${size} ${shape} ${status ? `status-${status}` : ''} ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {renderContent()}
      {status && <span className="avatar-status" />}
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
            <Avatar size="sm" initials="JD" />
            <Avatar size="md" initials="JD" />
            <Avatar size="lg" initials="JD" />
            <Avatar size="xl" initials="JD" />
          </div>
        </div>

        <div className="avatar-demo-group">
          <h3>Формы</h3>
          <div className="avatar-demo-row">
            <Avatar shape="circle" initials="JD" />
            <Avatar shape="square" initials="JD" />
          </div>
        </div>

        <div className="avatar-demo-group">
          <h3>Статусы</h3>
          <div className="avatar-demo-row">
            <Avatar status="online" initials="JD" />
            <Avatar status="offline" initials="JD" />
            <Avatar status="away" initials="JD" />
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
            <Avatar initials="JD" />
            <Avatar initials="AB" />
            <Avatar initials="CD" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar; 