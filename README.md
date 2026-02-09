<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

# Laravel Template — API + Auth + PostgreSQL + React

Base template with **Laravel**, **API authentication (Laravel Sanctum)**, **REST API**, **PostgreSQL**, and **React frontend** (Laravel Breeze + Inertia.js). Optional **Sign in with Microsoft** (Azure Entra ID) when `MICROSOFT_CLIENT_ID` and `MICROSOFT_CLIENT_SECRET` are set in `.env`.

## Requirements

- PHP 8.2+
- Composer
- PostgreSQL
- Node.js 18+ and npm (for React frontend)
- (Optional) PHP **zip** extension enabled for faster Composer installs

## Installation

```bash
# 1. Copy env and generate key
cp .env.example .env
php artisan key:generate

# 2. Configure PostgreSQL in .env
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=laravel
# DB_USERNAME=postgres
# DB_PASSWORD=your_password

# 3. Install dependencies (includes Laravel Sanctum)
composer install

# 4. Publish Sanctum migration (API tokens)
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# 5. Run migrations
php artisan migrate

# 6. Frontend dependencies (React) — already installed if you used Breeze
npm install
```

## Frontend: Breeze + React

The template includes **Laravel Breeze** with **React** and **Inertia.js**: web views (login, register, dashboard, etc.) are React components served by Laravel via Inertia.

### Development (hot reload)

Open **two terminals** in the project root:

```bash
# Terminal 1 — Laravel server
php artisan serve

# Terminal 2 — Vite (builds React in real time)
npm run dev
```

Visit **http://127.0.0.1:8000**: you will see the React welcome page and links to Login and Register.

### Frontend structure

| Path | Description |
|------|-------------|
| `resources/js/Pages/` | React page components (Welcome, Login, Register, Dashboard, etc.) |
| `resources/js/Layouts/` | Layouts (Guest for login/register, Authenticated for private area) |
| `resources/js/app.jsx` | React app entry (Inertia) |
| `vite.config.js` | Vite configuration |

### Production build

```bash
npm run build
```

Assets are output to `public/build/`. You do not need to run `npm run dev` in production; Laravel serves the built files.

## Localization (lang)

The app supports **English** and **Spanish**. The active locale is stored in the session and applied by the `SetLocale` middleware.

### Switching language

- **Web:** Use the language switcher (EN | ES) in the header (guest and authenticated layouts). It links to `GET /locale/{locale}` and redirects back.
- **Config:** Supported locales are in `config/app.php` under `available_locales` (default: `['en', 'es']`).

### Lang files

| Path | Purpose |
|------|---------|
| `lang/en.json`, `lang/es.json` | Key-value strings for the React frontend (shared via Inertia as `translations`) |
| `lang/en/messages.php`, `lang/es/messages.php` | PHP arrays for server-side `__('messages.key')` |
| `lang/es/auth.php` | Spanish auth messages (e.g. login errors); English uses Laravel’s default in `vendor` |

### In React

- **Current locale:** `usePage().props.locale`
- **Translations:** `usePage().props.translations` (object: key → string)
- **Hook:** `useTranslations()` from `@/hooks/useTranslations` returns `{ t(key), locale }`
- **Component:** `<LanguageSwitcher />` in layouts for EN/ES links

## API

Base URL: **`/api`** (e.g. `http://localhost:8000/api`).

### Public endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/register` | Register (name, email, password, password_confirmation) |
| POST | `/api/login` | Login (email, password). Returns `token` for header `Authorization: Bearer {token}` |

### Protected endpoints (header: `Authorization: Bearer {token}`)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/logout` | Logout (revoke token) |
| GET | `/api/user` | Authenticated user |
| GET | `/api/users` | List users (paginated, ?per_page=15) |
| GET | `/api/users/{id}` | Show a user |

### Example usage

```bash
# Register
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123","password_confirmation":"password123"}'

# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Authenticated user (replace TOKEN with the received token)
curl -H "Authorization: Bearer TOKEN" http://localhost:8000/api/user
```

## Quick start

```bash
# Backend only (API and built views)
php artisan serve

# With live frontend (React + Vite)
# Terminal 1: php artisan serve
# Terminal 2: npm run dev
```

- Web (React): **http://127.0.0.1:8000**
- API: **http://127.0.0.1:8000/api**

---

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
