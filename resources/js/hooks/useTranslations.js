import { usePage } from '@inertiajs/react';

/**
 * Translation hook. Uses shared locale and translations from Laravel.
 * @returns {{ t: (key: string) => string, locale: string }}
 */
export function useTranslations() {
    const { locale, translations } = usePage().props;

    const t = (key) => {
        return translations?.[key] ?? key;
    };

    return { t, locale: locale || 'en' };
}
