import React, { useState } from 'react';
import { Counter } from './Counter';
import './Counter.css';

export const CounterDemo: React.FC = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(5);
  const [value3, setValue3] = useState(3);

  return (
    <div className="counter-demo">
      <h2>Демонстрация компонента Counter</h2>
      
      <div className="counter-demo__section">
        <h3>Базовый счетчик</h3>
        <Counter
          value={value1}
          onChange={setValue1}
        />
        <p>Текущее значение: {value1}</p>
      </div>

      <div className="counter-demo__section">
        <h3>Счетчик с ограничениями</h3>
        <Counter
          initialValue={5}
          min={0}
          max={10}
          step={2}
          value={value2}
          onChange={setValue2}
        />
        <p>Текущее значение: {value2}</p>
      </div>

      <div className="counter-demo__section">
        <h3>Отключенный счетчик</h3>
        <Counter
          initialValue={3}
          disabled={true}
          value={value3}
          onChange={setValue3}
        />
        <p>Значение: {value3} (неизменяемое)</p>
      </div>
    </div>
  );
}; 