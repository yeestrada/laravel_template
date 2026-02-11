import LanguageSelector from '@/Components/LanguageSelector';
import LoginForm from '@/Components/LoginForm';
import Modal from '@/Components/Modal';
import ThemeToggle from '@/Components/ThemeToggle';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const { auth, appName, validationErrors = {}, canResetPassword, microsoftConfigured, translations = {}, loginError, loginErrorDetail, openLoginModal = false } = usePage().props;
    const t = (key) => translations[key] ?? key;
    const hasLoginErrors = validationErrors && (validationErrors.email?.length || validationErrors.password?.length);
    const hasLoginError = !!loginError;
    const [showLoginModal, setShowLoginModal] = useState(!!hasLoginErrors || hasLoginError || openLoginModal);

    const closeLoginModal = () => {
        setShowLoginModal(false);
        if (hasLoginErrors || hasLoginError) {
            router.visit('/', { preserveState: false });
        }
    };

    return (
        <>
            <Head title="Welcome" />
            <div
                className="relative min-h-screen flex flex-col bg-black-500"
                style={{
                    backgroundImage: 'url(/images/background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                <div
                    className="absolute inset-0 bg-black-500/70"
                    aria-hidden
                />

                <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                    <ThemeToggle buttonClass="bg-white/95 text-gray-900 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-700 dark:border-gray-600" />
                    <LanguageSelector />
                </div>

                <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 text-white">
                    <div className="mx-auto w-full max-w-2xl text-center">
                        <img
                            src="/images/WEC_Horizontal_Black.png"
                            alt={appName || t('Welcome')}
                            className="mx-auto h-16 w-auto sm:h-20 md:h-24 object-contain object-center"
                            style={{ filter: 'brightness(0) invert(1)' }}
                        />
                        <p className="font-sans font-ef-light mt-6 text-lg text-white/95 max-w-xl mx-auto leading-relaxed tracking-ef-wide">
                            {t('welcome.tagline')}
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-8 py-3.5 text-ef-label font-ef-medium text-white shadow-lg transition hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black-500/50"
                                >
                                    {t('welcome.go_to_dashboard')}
                                </Link>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setShowLoginModal(true)}
                                        className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-8 py-3.5 text-ef-label font-ef-medium text-white shadow-lg transition hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black-500/50"
                                    >
                                        {t('welcome.sign_in')}
                                    </button>
                                </>
                            )}
                        </div>
                        <p className="font-sans text-ef-small font-ef-light mt-12 text-white/80">
                            {t('welcome.secure')}
                        </p>
                    </div>
                </div>
            </div>

            <Modal show={showLoginModal} onClose={closeLoginModal} maxWidth="md" align="top">
                <div className="p-8">
                    <LoginForm
                        onClose={closeLoginModal}
                        canResetPassword={canResetPassword}
                        microsoftConfigured={microsoftConfigured}
                        showFooter={true}
                        isModal={true}
                        externalErrors={validationErrors}
                        error={loginError}
                        errorDetail={loginErrorDetail}
                    />
                </div>
            </Modal>
        </>
    );
}
