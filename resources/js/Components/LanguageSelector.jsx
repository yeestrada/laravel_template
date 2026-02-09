import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

const LOCALES = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
];

function GlobeIcon({ className = 'h-5 w-5' }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}

function CheckIcon({ className = 'h-4 w-4' }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default function LanguageSelector({ className = '', buttonClass = '' }) {
    const { locale } = usePage().props;
    const currentLocale = locale || 'en';

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    type="button"
                    className={
                        `flex items-center justify-center rounded-lg bg-white p-2.5 text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black-500/20 ${
                            buttonClass || ''
                        }`.trim()
                    }
                    aria-label="Select language"
                >
                    <GlobeIcon />
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content align="right" width="48" contentClasses="py-1 bg-white rounded-lg shadow-xl">
                {LOCALES.map(({ code, label }) => (
                    <Link
                        key={code}
                        href={route('locale.switch', code)}
                        preserveScroll
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-100 ${
                            currentLocale === code ? 'bg-gray-50 font-medium' : ''
                        }`}
                    >
                        {currentLocale === code ? (
                            <CheckIcon className="h-4 w-4 shrink-0 text-gray-700" />
                        ) : (
                            <span className="w-4 shrink-0" aria-hidden />
                        )}
                        {label}
                    </Link>
                ))}
            </Dropdown.Content>
        </Dropdown>
    );
}
