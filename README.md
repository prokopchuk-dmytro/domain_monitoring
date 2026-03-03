## Технології

- **Backend:** PHP 8.5, Laravel 12
- **Auth:** Laravel Fortify
- **Frontend:** React 19, TypeScript, Inertia.js
- **UI:** Tailwind CSS 4, Radix UI, Lucide Icons
- **Build tools:** Vite
- **Database:** SQLite
- **HTTP моніторинг:** Laravel HTTP Client (`Http::send`)
- **Scheduler:** Laravel Scheduler (`schedule:work` / `schedule:run`)
- **Тести/якість:** PHPUnit, ESLint, TypeScript (`tsc`)

## Запуск проєкту (Laravel 12 + React)

### 1. Клонування і встановлення
```bash
git clone

composer install
npm install
cp .env.example .env
php artisan key:generate

База даних
touch database/database.sqlite
php artisan migrate --force

Запуск dev
php artisan serve
npm run dev
php artisan schedule:work

Перевірка
http://localhost:8000
зареєструватись / увійти
перейти в Dashboard

Прод
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

cron 1хв
* * * * * cd /path/to/project && php artisan schedule:run >> /dev/null 2>&1
