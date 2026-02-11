# Laravel Template — WEC System

Laravel app with **React** (Inertia.js + Vite), **Breeze** auth, **roles & permissions**, and optional **Microsoft sign-in**. Uses **PostgreSQL** by default.

## Requirements

- PHP 8.2+, Composer
- Node.js 18+, npm
- PostgreSQL
- (Optional) PHP `zip` extension

## Install

```bash
cp .env.example .env
php artisan key:generate
# Set DB_* in .env for PostgreSQL

composer install
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate

npm install
npm run build
```

## Run

```bash
# Backend
php artisan serve

# Frontend (dev with hot reload) — in another terminal
npm run dev
```

- App: **http://127.0.0.1:8000**
- API: **http://127.0.0.1:8000/api**

## Config (.env)

| Key | Purpose |
|-----|---------|
| `DB_*` | PostgreSQL connection |
| `APP_URL` | Base URL (e.g. `http://localhost:8000`) |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Optional Microsoft sign-in |
| `MAIL_*` | Mail (e.g. password reset) |

## Seed (admin users)

```bash
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=AdminUserSeeder
```

Default admin passwords: **`admin`**. Change in production.

## Deploy

```bash
git clone <repo> . && cd .
cp .env.example .env && php artisan key:generate
# Edit .env (DB_*, APP_URL)

composer install --no-dev --optimize-autoloader
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate --force
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=AdminUserSeeder

npm ci && npm run build
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

## Project layout

| Path | Description |
|------|-------------|
| `resources/js/Pages/` | React pages (Welcome, Dashboard, Admin: Users, Roles, Permissions) |
| `resources/js/Layouts/` | AuthenticatedLayout, etc. |
| `lang/en.json`, `lang/es.json` | Frontend strings (i18n) |
| `config/pagination.php` | Default per-page and options for admin lists |

## License

[MIT](https://opensource.org/licenses/MIT).
