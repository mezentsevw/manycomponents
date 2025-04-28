import React from 'react';
import './Button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  className = '',
  children
}) => {
  return (
    <button
      className={`button ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading && <span className="button-loader" />}
      {startIcon && !loading && <span className="button-icon start">{startIcon}</span>}
      <span className="button-content">{children}</span>
      {endIcon && !loading && <span className="button-icon end">{endIcon}</span>}
    </button>
  );
};

// Демо-компонент для примера использования
export const ButtonDemo: React.FC = () => {
  return (
    <div className="button-demo">
      <h2>Примеры использования Button</h2>
      
      <div className="button-demo-grid">
        <div className="button-demo-group">
          <h3>Варианты</h3>
          <div className="button-demo-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
          </div>
        </div>

        <div className="button-demo-group">
          <h3>Размеры</h3>
          <div className="button-demo-row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="button-demo-group">
          <h3>Состояния</h3>
          <div className="button-demo-row">
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </div>

        <div className="button-demo-group">
          <h3>С иконками</h3>
          <div className="button-demo-row">
            <Button startIcon={<span>🔍</span>}>Search</Button>
            <Button endIcon={<span>→</span>}>Next</Button>
          </div>
        </div>

        <div className="button-demo-group">
          <h3>Full Width</h3>
          <div className="button-demo-row">
            <Button fullWidth>Full Width Button</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Button; 