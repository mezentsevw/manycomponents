import React from 'react';
import './Skeleton.css';

type SkeletonVariant = 'text' | 'rectangular' | 'circular';
type SkeletonAnimation = 'pulse' | 'wave';

interface SkeletonProps {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  animation = 'pulse',
  width,
  height,
  className = '',
}) => {
  const style: React.CSSProperties = {
    width,
    height,
  };

  const skeletonClasses = [
    'skeleton',
    `skeleton--${variant}`,
    `skeleton--${animation}`,
    className,
  ].filter(Boolean).join(' ');

  return <div className={skeletonClasses} style={style} />;
};

// Демо-компонент
export const SkeletonDemo: React.FC = () => {
  return (
    <div className="skeleton-demo">
      <h2>Примеры использования Skeleton</h2>

      <div className="skeleton-demo-grid">
        <div className="skeleton-demo-group">
          <h3>Варианты</h3>
          <div className="skeleton-demo-row">
            <Skeleton variant="text" width={200} height={24} />
            <Skeleton variant="rectangular" width={200} height={100} />
            <Skeleton variant="circular" width={50} height={50} />
          </div>
        </div>

        <div className="skeleton-demo-group">
          <h3>Анимации</h3>
          <div className="skeleton-demo-row">
            <Skeleton variant="text" animation="pulse" width={200} height={24} />
            <Skeleton variant="text" animation="wave" width={200} height={24} />
          </div>
        </div>

        <div className="skeleton-demo-group">
          <h3>Комплексный пример</h3>
          <div className="skeleton-demo-card">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="skeleton-demo-content">
              <Skeleton variant="text" width={150} height={20} />
              <Skeleton variant="text" width={200} height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton; 