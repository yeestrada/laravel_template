import { Link, usePage } from '@inertiajs/react';

const LOCALES = [
    { code: 'en', labelKey: 'English' },
    { code: 'es', labelKey: 'Spanish' },
];

export default function LanguageSwitcher({ className = '' }) {
    const { locale, translations } = usePage().props;
    const currentLocale = locale || 'en';

    const t = (key) => translations?.[key] ?? key;

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {LOCALES.map(({ code, labelKey }) => (
                <span key={code} className="flex items-center gap-1">
                    <Link
                        href={route('locale.switch', code)}
                        className={`rounded px-2 py-1 text-sm font-medium transition ${
                            currentLocale === code
                                ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                        }`}
                        preserveScroll
                    >
                        {t(labelKey)}
                    </Link>
                    {code !== LOCALES[LOCALES.length - 1].code && (
                        <span className="text-gray-400 dark:text-gray-500">|</span>
                    )}
                </span>
            ))}
        </div>
    );
}
