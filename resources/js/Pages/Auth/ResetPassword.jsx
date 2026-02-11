import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LanguageSelector from '@/Components/LanguageSelector';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ThemeToggle from '@/Components/ThemeToggle';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { appName, translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title={t('reset.title')} />
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
                            {t('reset.title')}
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {t('reset.description')}
                        </p>

                        <form onSubmit={submit} className="mt-6 space-y-4">
                            <div>
                                <InputLabel htmlFor="email" value={t('forgot.email')} />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value={t('admin.users.password')} />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value={t('admin.users.password_confirmation')}
                                />

                                <TextInput
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                type="submit"
                                className="mt-2 flex w-full items-center justify-center text-xs font-semibold"
                                disabled={processing}
                            >
                                {t('reset.submit')}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
