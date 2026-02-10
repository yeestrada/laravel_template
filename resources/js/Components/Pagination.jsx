import { Link } from '@inertiajs/react';

/**
 * Renders Laravel-style pagination links.
 * @param {Object} paginator - The paginator from Laravel (has .data, .links, .current_page, .last_page, .from, .to, .total)
 */
export default function Pagination({ paginator, className = '' }) {
    if (!paginator) {
        return null;
    }

    const { links = [], from, to, total = 0 } = paginator;

    return (
        <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {total > 0 ? (
                    <>
                        {from}–{to} of {total}
                    </>
                ) : (
                    '0 of 0'
                )}
            </p>
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
