# Notification Component

## Описание
Компонент Notification отображает уведомления различных типов с возможностью кастомизации и разными уровнями детализации.

## Аргументы
- `id` (string, опционально) - уникальный идентификатор
- `type` ('info' | 'success' | 'warning' | 'error', опционально) - тип уведомления
- `title` (string, опционально) - заголовок уведомления
- `message` (string, опционально) - текст сообщения
- `icon` (string, опционально) - кастомная иконка
- `children` (ReactNode, опционально) - кастомное содержимое

## Примеры использования

### Уровень 0: Базовая версия
```jsx
<Notification id="notif-1" />
```

### Уровень 1: С базовыми параметрами
```jsx
<Notification 
  type="success"
  title="Успех"
  message="Операция выполнена успешно"
/>
```

### Уровень 2: С кастомной структурой
```jsx
<Notification type="warning">
  <NotificationIcon>⚠️</NotificationIcon>
  <NotificationContent>
    <NotificationTitle>Внимание</NotificationTitle>
    <NotificationMessage>Проверьте введенные данные</NotificationMessage>
  </NotificationContent>
</Notification>
```

### Уровень 3: С расширенными параметрами
```jsx
<Notification type="error" icon="❌">
  <NotificationContent>
    <NotificationTitle>Ошибка</NotificationTitle>
    <NotificationMessage>Что-то пошло не так</NotificationMessage>
    <NotificationActions>
      <Button>Повторить</Button>
      <Button>Отмена</Button>
    </NotificationActions>
  </NotificationContent>
</Notification>
```

### Уровень 4: Полная кастомизация
```jsx
<Notification>
  <NotificationHeader>
    <NotificationIcon>ℹ️</NotificationIcon>
    <NotificationTitle>Информация</NotificationTitle>
    <NotificationClose />
  </NotificationHeader>
  <NotificationBody>
    <NotificationMessage>Важное сообщение</NotificationMessage>
    <NotificationDetails>
      <DetailItem label="Время">12:00</DetailItem>
      <DetailItem label="Источник">Система</DetailItem>
    </NotificationDetails>
  </NotificationBody>
  <NotificationFooter>
    <NotificationActions>
      <Button variant="primary">Принять</Button>
      <Button variant="secondary">Отклонить</Button>
    </NotificationActions>
  </NotificationFooter>
</Notification>
```

## Когда использовать
- Для отображения системных уведомлений
- При необходимости показать статус операции
- Для информирования пользователя о важных событиях

## Настройка верстки
Компонент поддерживает:
- Различные типы уведомлений (info, success, warning, error)
- Кастомизацию через CSS
- Гибкую структуру компонентов
- Анимации появления/исчезновения 