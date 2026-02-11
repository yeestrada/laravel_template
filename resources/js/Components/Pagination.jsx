import { Link, router } from '@inertiajs/react';

/**
 * Renders Laravel-style pagination links.
 * @param {Object} paginator - The paginator from Laravel (has .data, .links, .current_page, .last_page, .from, .to, .total)
 * @param {number} perPage - Current items per page
 * @param {number[]} perPageOptions - Allowed options for per page (e.g. [10, 15, 25, 50, 100])
 * @param {string} routeName - Route name for building URLs when per_page changes (e.g. 'admin.users.index')
 * @param {Object} queryParams - Current query params to preserve (e.g. { search: '' })
 * @param {Function} t - Optional translation function for "per_page" label
 */
export default function Pagination({
    paginator,
    className = '',
    perPage,
    perPageOptions = [10, 15, 25, 50, 100],
    routeName,
    queryParams = {},
    t = (key) => key,
}) {
    if (!paginator) {
        return null;
    }

    const { links = [], from, to, total = 0 } = paginator;

    const handlePerPageChange = (e) => {
        const value = Number(e.target.value);
        if (!routeName || !value) return;
        router.get(route(routeName), { ...queryParams, per_page: value, page: 1 }, { preserveScroll: true, preserveState: true });
    };

    return (
        <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}>
            <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {total > 0 ? (
                        <>
                            {from}–{to} {t('pagination.of')} {total}
                        </>
                    ) : (
                        `0 ${t('pagination.of')} 0`
                    )}
                </p>
                {routeName && perPageOptions.length > 0 && (
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{t('pagination.per_page')}</span>
                        <select
                            value={perPage ?? 15}
                            onChange={handlePerPageChange}
                            className="rounded-md border border-gray-300 bg-white py-1.5 pl-2 pr-8 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        >
                            {perPageOptions.map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
            </div>
            {links.length > 0 && (
            <nav className="flex flex-wrap items-center gap-1" aria-label="Pagination">
                {links.map((link, i) => {
                    const isDisabled = !link.url;
                    const isActive = link.active;
                    const label = link.label;

                    if (isDisabled) {
                        return (
                            <span
                                key={i}
                                className="relative inline-flex cursor-not-allowed items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500"
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={i}
                            href={link.url}
                            preserveScroll
                            className={`relative inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                                isActive
                                    ? 'z-10 border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-500 dark:bg-primary-500/30 dark:text-gray-100'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                            }`}
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                })}
            </nav>
            )}
        </div>
    );
}
