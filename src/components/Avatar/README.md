# Avatar

Компонент для отображения аватара пользователя. Поддерживает изображения, инициалы и плейсхолдер.

## Использование

```tsx
import { Avatar } from './Avatar';

// С изображением
<Avatar 
  src="/path/to/image.jpg" 
  alt="User Name" 
  size="medium" 
  shape="circle"
  status="online"
/>

// С инициалами
<Avatar 
  name="John Doe" 
  size="large" 
  shape="square"
/>

// С прямым указанием инициалов
<Avatar 
  initials="JD" 
  size="small"
/>

// Плейсхолдер
<Avatar size="medium" />

// Интерактивный аватар
<Avatar 
  name="John Doe" 
  onClick={() => console.log('Clicked!')} 
/>
```

## Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|-----------|
| src | string | - | URL изображения |
| alt | string | - | Альтернативный текст для изображения |
| name | string | - | Имя пользователя для генерации инициалов |
| initials | string | - | Прямое указание инициалов |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Размер аватара |
| shape | 'circle' \| 'square' | 'circle' | Форма аватара |
| status | 'online' \| 'offline' \| 'away' | - | Статус пользователя |
| className | string | - | Дополнительные CSS классы |
| onClick | () => void | - | Обработчик клика |

## Размеры

- small: 32x32px
- medium: 48x48px
- large: 64x64px

## Формы

- circle: круглая форма
- square: квадратная форма с закругленными углами

## Статусы

- online: зеленый индикатор
- offline: серый индикатор
- away: оранжевый индикатор

## Особенности

- Если указано изображение (`src`), оно будет отображаться
- Если изображение не указано, но есть имя (`name`) или инициалы (`initials`), будут отображаться инициалы
- Если ни изображение, ни имя/инициалы не указаны, отобразится плейсхолдер
- Цвет фона для инициалов генерируется на основе имени/инициалов
- Поддерживает интерактивность через `onClick`
- Полностью доступен для клавиатурной навигации

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