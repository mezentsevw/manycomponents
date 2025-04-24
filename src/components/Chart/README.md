# Chart Component

## Описание
Компонент Chart отображает различные типы графиков с поддержкой разных уровней детализации и кастомизации.

## Аргументы
- `id` (string, опционально) - уникальный идентификатор
- `type` ('bar' | 'line' | 'pie' | 'doughnut', опционально) - тип графика
- `data` (ChartData[], опционально) - данные для отображения
- `title` (string, опционально) - заголовок графика
- `children` (ReactNode, опционально) - кастомное содержимое

## Примеры использования

### Уровень 0: Базовая версия
```jsx
<Chart id="chart-1" />
```

### Уровень 1: С базовыми параметрами
```jsx
<Chart
  type="bar"
  data={[
    { label: 'Янв', value: 100 },
    { label: 'Фев', value: 200 }
  ]}
  title="Продажи"
/>
```

### Уровень 2: С кастомной структурой
```jsx
<Chart type="line">
  <ChartTitle>Продажи</ChartTitle>
  <ChartBody>
    <ChartLine>
      <ChartPoint value={100} />
      <ChartPoint value={200} />
    </ChartLine>
  </ChartBody>
</Chart>
```

### Уровень 3: С расширенными параметрами
```jsx
<Chart type="pie">
  <ChartHeader>
    <ChartTitle>Распределение</ChartTitle>
    <ChartActions>
      <ChartDownload />
      <ChartSettings />
    </ChartActions>
  </ChartHeader>
  <ChartBody>
    <ChartPie>
      <ChartSlice value={30} color="#FF0000" />
      <ChartSlice value={70} color="#00FF00" />
    </ChartPie>
    <ChartLegend />
  </ChartBody>
</Chart>
```

### Уровень 4: Полная кастомизация
```jsx
<Chart>
  <ChartHeader>
    <ChartTitle>
      <Icon name="chart" />
      <Text>Аналитика продаж</Text>
      <Badge>2023</Badge>
    </ChartTitle>
    <ChartActions>
      <ButtonGroup>
        <Button variant="primary">
          <Icon name="download" />
          <Text>Экспорт</Text>
        </Button>
        <Button variant="secondary">
          <Icon name="settings" />
          <Text>Настройки</Text>
        </Button>
      </ButtonGroup>
    </ChartActions>
  </ChartHeader>
  <ChartFilters>
    <DateRangePicker />
    <FilterSelect options={periodOptions} />
  </ChartFilters>
  <ChartBody>
    <ChartCanvas>
      <ChartGrid>
        <ChartAxis type="x">
          <AxisLabel>Месяц</AxisLabel>
          <AxisTicks />
        </ChartAxis>
        <ChartAxis type="y">
          <AxisLabel>Продажи</AxisLabel>
          <AxisTicks />
        </ChartAxis>
        <ChartBars>
          <ChartBar>
            <BarValue>100</BarValue>
            <BarLabel>Янв</BarLabel>
            <BarTooltip>
              <TooltipTitle>Январь</TooltipTitle>
              <TooltipValue>100 ед.</TooltipValue>
              <TooltipChange>+10%</TooltipChange>
            </BarTooltip>
          </ChartBar>
        </ChartBars>
      </ChartGrid>
    </ChartCanvas>
    <ChartLegend>
      <LegendItem>
        <LegendColor color="#FF0000" />
        <LegendLabel>Продукт A</LegendLabel>
        <LegendValue>100 ед.</LegendValue>
      </LegendItem>
    </ChartLegend>
  </ChartBody>
  <ChartFooter>
    <ChartStats>
      <StatItem label="Всего" value="1000" />
      <StatItem label="Среднее" value="100" />
      <StatItem label="Рост" value="+10%" />
    </ChartStats>
  </ChartFooter>
</Chart>
```

## Когда использовать
- Для визуализации статистических данных
- При необходимости показать тренды
- Для сравнения показателей

## Настройка верстки
Компонент поддерживает:
- Различные типы графиков (столбчатые, линейные, круговые)
- Кастомизацию через CSS
- Интерактивные элементы (тултипы, легенда)
- Адаптивный дизайн
- Анимации и переходы 