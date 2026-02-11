import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';

function MicrosoftLogo({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="10" height="10" fill="#F25022" />
            <rect x="11" width="10" height="10" fill="#7FBA00" />
            <rect y="11" width="10" height="10" fill="#00A4EF" />
            <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
        </svg>
    );
}

export default function LoginForm({
    onClose = null,
    canResetPassword = false,
    status = null,
    error = null,
    errorDetail = null,
    microsoftConfigured = false,
    showFooter = true,
    isModal = false,
    externalErrors = {},
}) {
    const { appName, appDebug, translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;
    const { data, setData, post, processing, errors: formErrors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const rawErrors = Object.keys(externalErrors).length ? externalErrors : formErrors;
    const errors = {
        email: Array.isArray(rawErrors.email) ? rawErrors.email[0] : rawErrors.email,
        password: Array.isArray(rawErrors.password) ? rawErrors.password[0] : rawErrors.password,
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
            preserveScroll: isModal,
        });
    };

    return (
        <div className="relative w-full">
            <div className="mb-6 text-center">
                <img
                    src="/images/WEC_Horizontal_Black.png"
                    alt={appName || t('Welcome')}
                    className="mx-auto h-8 w-auto object-contain object-center sm:h-10"
                    style={{ filter: 'brightness(0) invert(1)' }}
                />
            </div>

            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {t('login.sign_in_to')}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('login.welcome_back')}
                    </p>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex shrink-0 h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                        aria-label="Close"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="w-full">
                {status && (
                    <div className="mt-4 text-sm font-medium text-green-600 dark:text-green-400">
                        {status}
                    </div>
                )}
                {error && (
                    <div className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">
                        {error}
                        {errorDetail && (
                            <p className="mt-1 text-xs font-normal text-red-500 dark:text-red-400 break-words">
                                {errorDetail}
                            </p>
                        )}
                    </div>
                )}

                <div className="mt-6">
                    <a
                        href={route('auth.microsoft.redirect')}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        <MicrosoftLogo />
                        {t('login.continue_with_microsoft')}
                    </a>
                </div>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">{t('login.or')}</span>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value={t('login.username')} />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                            autoComplete="username"
                            isFocused={isModal}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value={t('login.password')} />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {canResetPassword && (
                        <div className="mt-2 text-right">
                            <Link
                                href={route('password.request')}
                                className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {t('login.forgot_password')}
                            </Link>
                        </div>
                    )}

                    <PrimaryButton
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center gap-2"
                        disabled={processing}
                    >
                        {t('login.continue')}
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </PrimaryButton>
                </form>

                {showFooter && (
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                            {t('login.secured_by')} {appName || 'WEC System'}
                        </p>
                        {appDebug && (
                            <p className="text-center text-xs font-medium text-orange-500 dark:text-orange-400">
                                {t('login.development_mode')}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
