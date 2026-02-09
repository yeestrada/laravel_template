import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProfileModalContent from './Partials/ProfileModalContent';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status }) {
    const { translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;

    return (
        <AuthenticatedLayout header={null}>
            <Head title={t('Profile')} />

            {/* Overlay + modal-style profile */}
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-500/75 p-4">
                <div className="relative w-full max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-2xl sm:max-w-4xl">
                    <ProfileModalContent
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                    <Link
                        href={route('dashboard')}
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                        aria-label="Close"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
