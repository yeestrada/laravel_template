import LoginForm from '@/Components/LoginForm';
import { Head, Link } from '@inertiajs/react';

export default function Login({ status, error, canResetPassword, microsoftConfigured = false }) {
    return (
        <>
            <Head title="Log in" />
            <div className="flex min-h-screen items-center justify-center bg-gray-600 p-4">
                <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
                    <Link
                        href="/"
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300"
                        aria-label="Close"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                    <div className="p-8">
                        <LoginForm
                            onClose={null}
                            canResetPassword={canResetPassword}
                            status={status}
                            error={error}
                            microsoftConfigured={microsoftConfigured}
                            showFooter={true}
                            isModal={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
