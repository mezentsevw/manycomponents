# DataTable Component

## Описание
Компонент DataTable отображает табличные данные с поддержкой различных уровней детализации и кастомизации.

## Аргументы
- `id` (string, опционально) - уникальный идентификатор
- `columns` (Column[], опционально) - массив колонок таблицы
- `data` (Record<string, any>[], опционально) - данные для отображения
- `children` (ReactNode, опционально) - кастомное содержимое

## Примеры использования

### Уровень 0: Базовая версия
```jsx
<DataTable id="table-1" />
```

### Уровень 1: С базовыми параметрами
```jsx
<DataTable
  columns={[
    { key: 'name', title: 'Имя' },
    { key: 'age', title: 'Возраст' }
  ]}
  data={[
    { name: 'Иван', age: 25 },
    { name: 'Мария', age: 30 }
  ]}
/>
```

### Уровень 2: С кастомной структурой
```jsx
<DataTable>
  <TableHeader>
    <TableTitle>Список пользователей</TableTitle>
    <TableActions>
      <Button>Добавить</Button>
    </TableActions>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Иван</TableCell>
      <TableCell>25</TableCell>
    </TableRow>
  </TableBody>
</DataTable>
```

### Уровень 3: С расширенными параметрами
```jsx
<DataTable>
  <TableHeader>
    <TableTitle>Список пользователей</TableTitle>
    <TableFilters>
      <SearchInput />
      <FilterSelect />
    </TableFilters>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>
        <Avatar src="avatar.jpg" />
        <UserName>Иван</UserName>
      </TableCell>
      <TableCell>
        <AgeBadge>25</AgeBadge>
      </TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <Pagination />
  </TableFooter>
</DataTable>
```

### Уровень 4: Полная кастомизация
```jsx
<DataTable>
  <TableHeader>
    <TableTitle>
      <Icon name="users" />
      <Text>Список пользователей</Text>
      <Badge count={100} />
    </TableTitle>
    <TableActions>
      <ButtonGroup>
        <Button variant="primary">
          <Icon name="plus" />
          <Text>Добавить</Text>
        </Button>
        <Button variant="secondary">
          <Icon name="export" />
          <Text>Экспорт</Text>
        </Button>
      </ButtonGroup>
    </TableActions>
  </TableHeader>
  <TableFilters>
    <SearchInput placeholder="Поиск..." />
    <FilterGroup>
      <FilterSelect options={statusOptions} />
      <FilterSelect options={roleOptions} />
    </FilterGroup>
  </TableFilters>
  <TableBody>
    <TableRow>
      <TableCell>
        <UserCell>
          <Avatar src="avatar.jpg" size="sm" />
          <UserInfo>
            <UserName>Иван</UserName>
            <UserEmail>ivan@example.com</UserEmail>
          </UserInfo>
        </UserCell>
      </TableCell>
      <TableCell>
        <StatusBadge type="active">Активен</StatusBadge>
      </TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <PaginationInfo>
      <Text>Показано 1-10 из 100</Text>
    </PaginationInfo>
    <Pagination>
      <PaginationButton active>1</PaginationButton>
      <PaginationButton>2</PaginationButton>
      <PaginationButton>3</PaginationButton>
    </Pagination>
  </TableFooter>
</DataTable>
```

## Когда использовать
- Для отображения структурированных данных
- При необходимости сортировки и фильтрации
- Для работы с большими наборами данных

## Настройка верстки
Компонент поддерживает:
- Различные уровни детализации
- Кастомизацию через CSS
- Пагинацию и сортировку
- Фильтрацию данных
- Адаптивный дизайн 