import React, { useState, useEffect } from 'react';
import './Calendar.css';

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  locale?: string;
  showHolidays?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  value = new Date(),
  onChange,
  locale = 'ru-RU',
  showHolidays = false,
  className = '',
  disabled = false,
}) => {
  const [currentDate, setCurrentDate] = useState(value);
  const [selectedDate, setSelectedDate] = useState(value);
  const [monthDays, setMonthDays] = useState<Date[]>([]);

  useEffect(() => {
    generateMonthDays();
  }, [currentDate]);

  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Добавляем дни предыдущего месяца
    const firstDayOfWeek = firstDay.getDay() || 7;
    for (let i = firstDayOfWeek - 1; i > 0; i--) {
      days.push(new Date(year, month, -i + 1));
    }

    // Добавляем дни текущего месяца
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Добавляем дни следующего месяца
    const lastDayOfWeek = lastDay.getDay() || 7;
    for (let i = 1; i <= 7 - lastDayOfWeek; i++) {
      days.push(new Date(year, month + 1, i));
    }

    setMonthDays(days);
  };

  const handleDateClick = (date: Date) => {
    if (disabled) return;
    setSelectedDate(date);
    onChange?.(date);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className={`calendar ${className}`}>
      <div className="calendar__header">
        <button 
          className="calendar__nav-button" 
          onClick={handlePrevMonth}
          disabled={disabled}
        >
          ←
        </button>
        <div className="calendar__month-title">
          {currentDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
        </div>
        <button 
          className="calendar__nav-button" 
          onClick={handleNextMonth}
          disabled={disabled}
        >
          →
        </button>
      </div>

      <div className="calendar__weekdays">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <div key={day} className="calendar__weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar__days">
        {monthDays.map((date, index) => (
          <div
            key={index}
            className={`calendar__day ${
              !isCurrentMonth(date) ? 'calendar__day--other-month' : ''
            } ${isToday(date) ? 'calendar__day--today' : ''} ${
              isSelected(date) ? 'calendar__day--selected' : ''
            } ${showHolidays && (date.getDay() === 0 || date.getDay() === 6) ? 'calendar__day--holiday' : ''}`}
            onClick={() => handleDateClick(date)}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

// Демо-компонент
export const CalendarDemo: React.FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-demo">
      <h2>Примеры использования Calendar</h2>
      
      <div className="calendar-demo-grid">
        <div className="calendar-demo-group">
          <h3>Базовое использование</h3>
          <Calendar value={date} onChange={setDate} />
        </div>

        <div className="calendar-demo-group">
          <h3>С праздниками</h3>
          <Calendar value={date} onChange={setDate} showHolidays />
        </div>

        <div className="calendar-demo-group">
          <h3>Отключенный</h3>
          <Calendar value={date} onChange={setDate} disabled />
        </div>
      </div>
    </div>
  );
};

export default Calendar; 