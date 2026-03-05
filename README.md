## Технології
- Backend: Laravel 12, PHP 8.3 (Docker image)
- Frontend: React 19, TypeScript, Inertia.js, Vite
- UI: Tailwind CSS 4, Radix UI, Lucide
- DB: MySQL 8.4 (Docker)
- Веб-сервер: Nginx (Docker)
- Планувальник: Laravel Scheduler (`schedule:work` у окремому контейнері)

## Запуск через Docker

### 1. Підготувати env
```bash
cp .env.docker.example .env
```

### 2. Підняти контейнери
```bash
docker compose up -d --build
```

### 3. Встановити залежності та згенерувати ключ
```bash
docker compose exec app composer install
docker compose exec app php artisan key:generate
```

### 4. Накатити міграції
```bash
docker compose exec app php artisan migrate --force
```

### 5. Відкрити проєкт
- App: http://localhost:8080
- Vite HMR: http://localhost:5173

## Корисні команди
```bash
# Логи
docker compose logs -f app
docker compose logs -f web
docker compose logs -f scheduler

# Зупинити
docker compose down

# Зупинити + видалити volume БД
docker compose down -v
```
