# InfiniteScroll

Компонент для реализации бесконечной прокрутки списка элементов с подгрузкой данных.

## Использование

```tsx
import { InfiniteScroll } from './InfiniteScroll';

// Базовое использование
<InfiniteScroll
  items={items}
  renderItem={(item) => <div>{item.content}</div>}
  loadMore={loadMoreItems}
  hasMore={true}
  isLoading={false}
/>

// С кастомным лоадером и сообщением о конце списка
<InfiniteScroll
  items={items}
  renderItem={(item) => <div>{item.content}</div>}
  loadMore={loadMoreItems}
  hasMore={hasMore}
  isLoading={isLoading}
  loader={<CustomLoader />}
  endMessage={<p>Больше элементов нет</p>}
  threshold={100}
/>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| items | T[] | - | Массив элементов для отображения |
| renderItem | (item: T) => React.ReactNode | - | Функция рендера элемента |
| loadMore | () => Promise<void> | - | Функция загрузки следующей порции данных |
| hasMore | boolean | - | Флаг наличия дополнительных элементов |
| isLoading | boolean | false | Флаг процесса загрузки |
| threshold | number | 250 | Расстояние до конца списка для запуска подгрузки |
| className | string | - | Дополнительные CSS классы |
| loader | React.ReactNode | null | Кастомный компонент загрузки |
| endMessage | React.ReactNode | null | Сообщение при достижении конца списка |

## Примеры

### Базовый пример
```tsx
const [items, setItems] = useState<string[]>([]);
const [hasMore, setHasMore] = useState(true);
const [isLoading, setIsLoading] = useState(false);

const loadMoreItems = async () => {
  setIsLoading(true);
  const newItems = await fetchMoreItems();
  setItems([...items, ...newItems]);
  setHasMore(newItems.length > 0);
  setIsLoading(false);
};

return (
  <InfiniteScroll
    items={items}
    renderItem={(item) => <div className="item">{item}</div>}
    loadMore={loadMoreItems}
    hasMore={hasMore}
    isLoading={isLoading}
  />
);
```

### С кастомизацией
```tsx
<InfiniteScroll
  items={items}
  renderItem={(item) => (
    <Card key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </Card>
  )}
  loadMore={loadMoreItems}
  hasMore={hasMore}
  isLoading={isLoading}
  loader={<Spinner size="large" />}
  endMessage={
    <div className="end-message">
      <Icon name="check" />
      <span>Вы просмотрели все элементы</span>
    </div>
  }
  threshold={150}
  className="custom-scroll"
/>
```

## Стилизация

Компонент использует CSS-классы для стилизации:

- `.infinite-scroll` - контейнер компонента
- `.infinite-scroll__content` - контейнер для элементов
- `.infinite-scroll__loader` - контейнер для лоадера
- `.infinite-scroll__end-message` - контейнер для сообщения о конце списка

Вы можете переопределить стили, используя эти классы. 