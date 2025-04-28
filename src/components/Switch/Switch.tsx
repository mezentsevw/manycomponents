import React from 'react';
import './Switch.css';

type SwitchSize = 'small' | 'medium' | 'large';
type SwitchVariant = 'primary' | 'success' | 'danger' | 'warning';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: SwitchSize;
  variant?: SwitchVariant;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  className = '',
  label,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked);
    }
  };

  const switchClasses = [
    'switch',
    `switch--${size}`,
    `switch--${variant}`,
    checked && 'switch--checked',
    disabled && 'switch--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={switchClasses}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="switch__input"
      />
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
};

// Демо-компонент для примера использования
export const SwitchDemo: React.FC = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="switch-demo">
      <h2>Примеры использования Switch</h2>
      
      <div className="switch-demo-grid">
        <div className="switch-demo-group">
          <h3>Размеры</h3>
          <div className="switch-demo-row">
            <Switch
              checked={checked}
              onChange={setChecked}
              size="small"
              label="Small"
            />
            <Switch
              checked={checked}
              onChange={setChecked}
              size="medium"
              label="Medium"
            />
            <Switch
              checked={checked}
              onChange={setChecked}
              size="large"
              label="Large"
            />
          </div>
        </div>

        <div className="switch-demo-group">
          <h3>Варианты</h3>
          <div className="switch-demo-row">
            <Switch
              checked={checked}
              onChange={setChecked}
              variant="primary"
              label="Primary"
            />
            <Switch
              checked={checked}
              onChange={setChecked}
              variant="success"
              label="Success"
            />
            <Switch
              checked={checked}
              onChange={setChecked}
              variant="danger"
              label="Danger"
            />
            <Switch
              checked={checked}
              onChange={setChecked}
              variant="warning"
              label="Warning"
            />
          </div>
        </div>

        <div className="switch-demo-group">
          <h3>Состояния</h3>
          <div className="switch-demo-row">
            <Switch
              checked={true}
              onChange={() => {}}
              label="Включено"
            />
            <Switch
              checked={false}
              onChange={() => {}}
              label="Выключено"
            />
            <Switch
              checked={checked}
              onChange={setChecked}
              disabled
              label="Отключено"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Switch; 