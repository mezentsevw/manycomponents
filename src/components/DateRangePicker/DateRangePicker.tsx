import React, { useState, useRef, useEffect } from 'react';
import './DateRangePicker.css';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  presets?: {
    label: string;
    range: DateRange;
  }[];
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value = { start: null, end: null },
  onChange,
  placeholder = 'Выберите диапазон дат',
  className = '',
  disabled = false,
  minDate,
  maxDate,
  presets = [
    {
      label: 'Сегодня',
      range: {
        start: new Date(),
        end: new Date(),
      },
    },
    {
      label: 'Вчера',
      range: {
        start: new Date(Date.now() - 86400000),
        end: new Date(Date.now() - 86400000),
      },
    },
    {
      label: 'Последние 7 дней',
      range: {
        start: new Date(Date.now() - 7 * 86400000),
        end: new Date(),
      },
    },
    {
      label: 'Последние 30 дней',
      range: {
        start: new Date(Date.now() - 30 * 86400000),
        end: new Date(),
      },
    },
    {
      label: 'Этот месяц',
      range: {
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        end: new Date(),
      },
    },
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    // Добавляем пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Добавляем дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateInRange = (date: Date) => {
    if (!value.start || !value.end) return false;
    return date >= value.start && date <= value.end;
  };

  const isDateHovered = (date: Date) => {
    if (!hoveredDate || !value.start) return false;
    return date >= value.start && date <= hoveredDate;
  };

  const handleDateClick = (date: Date) => {
    if (disabled) return;

    if (!value.start || (value.start && value.end)) {
      onChange?.({ start: date, end: null });
    } else if (date < value.start) {
      onChange?.({ start: date, end: value.start });
    } else {
      onChange?.({ start: value.start, end: date });
    }
  };

  const handlePresetClick = (range: DateRange) => {
    onChange?.(range);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div
      ref={containerRef}
      className={`date-range-picker ${className} ${disabled ? 'date-range-picker--disabled' : ''}`}
    >
      <div
        className="date-range-picker__input"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {value.start && value.end ? (
          `${formatDate(value.start)} - ${formatDate(value.end)}`
        ) : (
          <span className="date-range-picker__placeholder">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="date-range-picker__popover">
          <div className="date-range-picker__presets">
            {presets.map((preset, index) => (
              <button
                key={index}
                className="date-range-picker__preset"
                onClick={() => handlePresetClick(preset.range)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="date-range-picker__calendar">
            <div className="date-range-picker__header">
              <button
                className="date-range-picker__nav-button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                  )
                }
              >
                ←
              </button>
              <span className="date-range-picker__month">
                {currentMonth.toLocaleDateString('ru-RU', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button
                className="date-range-picker__nav-button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                  )
                }
              >
                →
              </button>
            </div>

            <div className="date-range-picker__weekdays">
              {weekDays.map((day) => (
                <div key={day} className="date-range-picker__weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="date-range-picker__days">
              {days.map((date, index) => (
                <div
                  key={index}
                  className={`date-range-picker__day ${
                    !date
                      ? 'date-range-picker__day--empty'
                      : date < (minDate || new Date(0))
                      ? 'date-range-picker__day--disabled'
                      : date > (maxDate || new Date(8640000000000000))
                      ? 'date-range-picker__day--disabled'
                      : value.start?.getTime() === date.getTime()
                      ? 'date-range-picker__day--start'
                      : value.end?.getTime() === date.getTime()
                      ? 'date-range-picker__day--end'
                      : isDateInRange(date)
                      ? 'date-range-picker__day--in-range'
                      : isDateHovered(date)
                      ? 'date-range-picker__day--hovered'
                      : ''
                  }`}
                  onClick={() => date && handleDateClick(date)}
                  onMouseEnter={() => date && setHoveredDate(date)}
                >
                  {date?.getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Демо-компонент
export const DateRangePickerDemo: React.FC = () => {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="date-range-picker-demo">
      <h2>Date Range Picker Demo</h2>
      <DateRangePicker
        value={range}
        onChange={setRange}
        placeholder="Выберите диапазон дат"
      />
      <div className="date-range-picker-demo__preview">
        <h3>Выбранный диапазон:</h3>
        <pre>
          {range.start && range.end
            ? `${range.start.toLocaleDateString()} - ${range.end.toLocaleDateString()}`
            : 'Не выбран'}
        </pre>
      </div>
    </div>
  );
};

export default DateRangePicker; 