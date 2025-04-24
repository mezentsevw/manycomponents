# ProgressBar Component

## Описание
Компонент ProgressBar отображает прогресс выполнения задачи в виде индикатора. Поддерживает различные уровни детализации и кастомизации.

## Аргументы
- `id` (string, опционально) - уникальный идентификатор
- `value` (number, опционально) - текущее значение прогресса
- `max` (number, опционально) - максимальное значение
- `label` (string, опционально) - текстовая метка
- `children` (ReactNode, опционально) - кастомное содержимое

## Примеры использования

### Уровень 0: Базовая версия
```jsx
<ProgressBar id="progress-1" />
```

### Уровень 1: С базовыми параметрами
```jsx
<ProgressBar value={50} max={100} />
```

### Уровень 2: С меткой
```jsx
<ProgressBar>
  <ProgressLabel text="Загрузка" />
  <ProgressTrack />
</ProgressBar>
```

### Уровень 3: С кастомным стилем
```jsx
<ProgressBar>
  <ProgressLabel text="Загрузка" />
  <ProgressTrack>
    <ProgressFill value={75} color="blue" />
  </ProgressTrack>
</ProgressBar>
```

### Уровень 4: Полная кастомизация
```jsx
<ProgressBar>
  <ProgressLabel>
    <Text>Загрузка</Text>
    <Percentage value={75} />
  </ProgressLabel>
  <ProgressTrack>
    <ProgressFill>
      <GradientFill startColor="#ff0000" endColor="#00ff00" />
      <ProgressText value={75} />
    </ProgressFill>
  </ProgressTrack>
</ProgressBar>
```

## Когда использовать
- Для отображения прогресса загрузки
- При показе выполнения длительных операций
- Для визуализации статистики

## Настройка верстки
Компонент поддерживает:
- Различные уровни детализации
- Кастомизацию через CSS
- Анимации и переходы
- Кастомные элементы внутри 