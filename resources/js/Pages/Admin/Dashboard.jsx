import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function AdminDashboard() {
    const { translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('dashboard.admin.title')}
                </h2>
            }
        >
            <Head title={t('dashboard.admin.title')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>{t('dashboard.admin.welcome')}</p>
                            <p className="mt-2 text-sm text-gray-500">
                                {t('dashboard.admin.placeholder')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
