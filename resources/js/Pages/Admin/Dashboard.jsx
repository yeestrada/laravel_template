import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminSidebar from '@/Components/AdminSidebar';
import { Head, usePage } from '@inertiajs/react';

export default function AdminDashboard() {
    const { translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;

    return (
        <AuthenticatedLayout
            sidebar={<AdminSidebar />}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                    {t('dashboard.admin.title')}
                </h2>
            }
        >
            <Head title={t('dashboard.admin.title')} />

            <div className="flex h-full min-h-0 flex-1 flex-col p-4 sm:p-6">
                <div className="flex min-h-0 w-full flex-1">
                    <div className="relative flex min-h-0 w-full flex-1 overflow-hidden rounded-lg border border-gray-300 bg-gray-100/40 shadow-sm backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/40 dark:ring-1 dark:ring-gray-700">
                        <div className="relative z-10 p-4 sm:p-5 text-gray-900 dark:text-gray-100">
                            <p className="font-medium">{t('dashboard.admin.welcome')}</p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {t('dashboard.admin.placeholder')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
