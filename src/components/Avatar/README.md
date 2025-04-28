# Avatar

Компонент аватара для отображения изображения пользователя или его инициалов.

## Использование

```tsx
import { Avatar } from './Avatar';

// С изображением
<Avatar 
  src="https://example.com/avatar.jpg"
  alt="User Name"
/>

// С инициалами
<Avatar 
  initials="JD"
  size="lg"
/>

// С статусом
<Avatar 
  src="https://example.com/avatar.jpg"
  status="online"
/>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|-----------|
| src | string | - | URL изображения |
| alt | string | - | Альтернативный текст для изображения |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Размер аватара |
| shape | 'circle' \| 'square' | 'circle' | Форма аватара |
| status | 'online' \| 'offline' \| 'away' | - | Статус пользователя |
| initials | string | - | Инициалы пользователя |
| className | string | - | Дополнительные CSS классы |
| style | React.CSSProperties | - | Инлайн стили |
| onClick | () => void | - | Обработчик клика |

## Примеры

### Размеры
```tsx
<Avatar size="sm" initials="JD" />
<Avatar size="md" initials="JD" />
<Avatar size="lg" initials="JD" />
<Avatar size="xl" initials="JD" />
```

### Формы
```tsx
<Avatar shape="circle" initials="JD" />
<Avatar shape="square" initials="JD" />
```

### Статусы
```tsx
<Avatar status="online" initials="JD" />
<Avatar status="offline" initials="JD" />
<Avatar status="away" initials="JD" />
```

### Изображения
```tsx
<Avatar
  src="https://i.pravatar.cc/150?img=1"
  alt="User 1"
/>
<Avatar
  src="https://i.pravatar.cc/150?img=2"
  alt="User 2"
/>
```

### Инициалы
```tsx
<Avatar initials="JD" />
<Avatar initials="AB" />
<Avatar initials="CD" />
```

## Стилизация

Компонент использует CSS-классы для стилизации:

- `.avatar` - базовый аватар
- `.avatar.sm` - маленький размер
- `.avatar.md` - средний размер
- `.avatar.lg` - большой размер
- `.avatar.xl` - очень большой размер
- `.avatar.circle` - круглая форма
- `.avatar.square` - квадратная форма
- `.avatar.status-online` - статус онлайн
- `.avatar.status-offline` - статус оффлайн
- `.avatar.status-away` - статус отошел
- `.avatar-initials` - стили для инициалов
- `.avatar-status` - индикатор статуса

Вы можете переопределить стили, используя эти классы. 