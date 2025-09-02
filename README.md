# 🚆 Train Schedule App - Backend

Backend сервіс для **Train Schedule App**, побудований на **TypeScript**, **Express** та **PostgreSQL**.  
Надає API для управління поїздами, аутентифікації користувачів та сесій.

---

## 🛠️ Features

### User Authentication

- Реєстрація, логін та логаут користувачів.
- JWT-based **access tokens** з **refresh tokens**.

### Train Management

- CRUD операції для поїздів:
  - `Create`, `Read`, `Update` (PATCH), `Delete`
- Сортування та фільтрація поїздів за:
  - Часом відправлення
  - Станціями
  - Ціною

### Sessions

- Безпечне зберігання **refresh tokens** в **cookies**.
- Автоматичне очищення прострочених сесій.

### TypeScript

- Повністю типізовані контролери, сервіси та запити до бази даних.

### Error Handling

- Центральна middleware для `404` та загальних помилок.

---

## ⚡ Tech Stack

- **Node.js + Express**
- **TypeScript**
- **PostgreSQL**
- **pg** для запитів до бази
- **JWT** для аутентифікації
- **bcrypt** для хешування паролів
- **nodemon & ts-node** для розробки

---

## 📦 Installation

1. Клонуємо репозиторій:

```bash
git clone https://github.com/yourusername/train-schedule-app-server.git
cd train-schedule-app-server
```

2. Встановлюємо залежності:

```bash
npm install
```

3. Створюємо .env файл у корені проєкту:

```bash
POSTGRESQL_PASS=your_db_password
JWT_SECRET=your_jwt_secret

```

4. 🚀 Running the Server

```bash
npm run dev

```

5. Build та запуск:

```bash
npm run build
npm start

```

build компілює TypeScript у папку dist/.

start запускає скомпільовані JavaScript файли.

🔑 Auth Endpoints
Method Endpoint Description
POST /auth/register Реєстрація нового користувача
POST /auth/login Логін користувача
POST /auth/logout Логаут користувача
GET /auth/me Отримати інформацію про користувача (Bearer)

🚉 Train Endpoints
Method Endpoint Description
GET /trains Отримати всі поїзди
GET /trains/:id Отримати поїзд за ID
POST /trains Створити новий поїзд
DELETE /trains/:id Видалити поїзд (auth only)
