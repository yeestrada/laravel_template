# Laravel Template — WEC System

Laravel app with **React** (Inertia.js + Vite), **Breeze** auth, **roles & permissions**, **API REST** (Sanctum), and optional **Microsoft sign-in**. Supports **PostgreSQL**, **MySQL**, or **SQLite**.

## Requirements

- PHP 8.2+, Composer
- Node.js 18+, npm
- Database: PostgreSQL, MySQL, or SQLite
- (Optional) PHP `zip` extension

## Install

```bash
cp .env.example .env
php artisan key:generate
# Set DB_* in .env (PostgreSQL, MySQL, or SQLite)

composer install
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

## Testing

```bash
php artisan test
```

The project includes comprehensive tests:
- **Feature tests**: Admin controllers (Users, Roles, Permissions), API endpoints
- **Unit tests**: Models (User, Role, Permission)
- **89+ tests** covering CRUD operations, validations, authorization, and security

## Deploy

```bash
git clone <repo> . && cd .
cp .env.example .env && php artisan key:generate
# Edit .env (DB_*, APP_URL)

composer install --no-dev --optimize-autoloader
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
| `lang/en/`, `lang/es/` | PHP translation files (app.php, auth.php, pagination.php) |
| `config/pagination.php` | Default per-page and options for admin lists |
| `tests/Feature/` | Feature tests (Admin controllers, API) |
| `tests/Unit/` | Unit tests (Models) |
| `database/factories/` | Model factories for testing |

## License

[MIT](https://opensource.org/licenses/MIT).
