import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LanguageSelector from '@/Components/LanguageSelector';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ThemeToggle from '@/Components/ThemeToggle';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { appName, translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title={t('login.forgot_password')} />
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

                <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-xl backdrop-blur-sm dark:bg-gray-900/95">
                        <div className="mb-6 text-center">
                            <img
                                src="/images/WEC_Horizontal_Black.png"
                                alt={appName || t('Welcome')}
                                className="mx-auto h-10 w-auto object-contain object-center"
                                style={{ filter: 'brightness(0) invert(1)' }}
                            />
                        </div>

                        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {t('login.forgot_password')}
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {t('forgot.description')}
                        </p>

                        {status && (
                            <div className="mt-4 rounded-md border border-green-100 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="mt-6 space-y-4">
                            <div>
                                <InputLabel htmlFor="email" value={t('forgot.email')} />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                                    autoComplete="email"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <PrimaryButton
                                type="submit"
                                className="mt-2 flex w-full items-center justify-center text-xs font-semibold"
                                disabled={processing}
                            >
                                {t('forgot.email_reset_link')}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
