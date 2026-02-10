import { Link, usePage } from '@inertiajs/react';

export default function AdminSidebar({ sidebarOpen = true, onToggleSidebar }) {
    const { translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;
    const current = route().current();

    const menuItems = [
        { href: route('dashboard'), label: t('admin.menu.dashboard'), routeName: 'dashboard' },
        { href: route('admin.roles.index'), label: t('admin.menu.roles'), routeName: 'admin.roles.index' },
    ];

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
                {menuItems.map(({ href, label, routeName }) => {
                    const isActive = current === routeName;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={
                                'rounded-lg px-3 py-2 text-sm font-medium transition ' +
                                (isActive
                                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/30 dark:text-gray-100'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100')
                            }
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
