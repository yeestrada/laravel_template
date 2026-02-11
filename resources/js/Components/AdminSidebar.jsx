import { Link, usePage } from '@inertiajs/react';

function DashboardIcon({ className = 'h-4 w-4' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
            />
        </svg>
    );
}

function RolesIcon({ className = 'h-4 w-4' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.5 6h9.75M10.5 12h9.75M10.5 18H15M4.75 6h.008v.008H4.75V6zm0 6h.008v.008H4.75V12zm0 6h.008v.008H4.75V18z"
            />
        </svg>
    );
}

function UsersIcon({ className = 'h-4 w-4' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-1a4 4 0 00-4-4h-1M9 20H4v-1a4 4 0 014-4h1m3-3a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 10-2.646-7.018"
            />
        </svg>
    );
}

export default function AdminSidebar({ sidebarOpen = true, onToggleSidebar }) {
    const { translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;
    const current = route().current();

    return (
        <aside className="flex h-full flex-col">
            <div className="flex items-start justify-end p-2">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="flex shrink-0 items-center justify-center rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                    aria-label={sidebarOpen ? t('admin.menu.collapse') : t('admin.menu.expand')}
                    title={sidebarOpen ? t('admin.menu.collapse') : t('admin.menu.expand')}
                >
                    {sidebarOpen ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    )}
                </button>
            </div>
            <nav className={`flex flex-1 flex-col gap-1 p-4 ${sidebarOpen ? '' : 'hidden'}`}>
                {/* Main section */}
                <Link
                    href={route('dashboard')}
                    className={
                        'rounded-lg px-3 py-2 text-sm font-medium transition ' +
                        (current === 'dashboard'
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/30 dark:text-gray-100'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100')
                    }
                >
                    <span className="flex items-center gap-2">
                        <DashboardIcon />
                        <span>{t('admin.menu.dashboard')}</span>
                    </span>
                </Link>

                {/* Administration separator */}
                <div className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    {t('admin.menu.administration')}
                </div>

                {/* Administration links */}
                <Link
                    href={route('admin.roles.index')}
                    className={
                        'rounded-lg px-3 py-2 text-sm font-medium transition ' +
                        (current === 'admin.roles.index'
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/30 dark:text-gray-100'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100')
                    }
                >
                    <span className="flex items-center gap-2">
                        <RolesIcon />
                        <span>{t('admin.menu.roles')}</span>
                    </span>
                </Link>

                <Link
                    href={route('admin.users.index')}
                    className={
                        'rounded-lg px-3 py-2 text-sm font-medium transition ' +
                        (current === 'admin.users.index'
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/30 dark:text-gray-100'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100')
                    }
                >
                    <span className="flex items-center gap-2">
                        <UsersIcon />
                        <span>{t('admin.menu.users')}</span>
                    </span>
                </Link>
            </nav>
        </aside>
    );
}
