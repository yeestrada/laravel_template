import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

function PersonIcon({ className = 'h-12 w-12' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function parseName(fullName) {
    const parts = (fullName || '').trim().split(/\s+/);
    return {
        first_name: parts[0] || '',
        last_name: parts.slice(1).join(' ') || '',
    };
}

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
    onCancel = null,
    variant = 'card',
}) {
    const { auth, translations = {} } = usePage().props;
    const user = auth.user;
    const t = (key) => translations[key] ?? key;

    const initialNames = useMemo(() => parseName(user.name), [user.name]);

    const { data, setData, patch, errors, processing, recentlySuccessful, transform } = useForm({
        first_name: initialNames.first_name,
        last_name: initialNames.last_name,
        email: user.email,
    });

    const buildPayload = (d) => ({
        name: [d.first_name, d.last_name].filter(Boolean).join(' ').trim() || d.first_name,
        email: d.email,
    });

    const submit = (e) => {
        e.preventDefault();
        transform(buildPayload);
        patch(route('profile.update'));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        transform(buildPayload);
        patch(route('profile.update'), { preserveScroll: true });
    };

    const nameValue = [data.first_name, data.last_name].filter(Boolean).join(' ').trim() || data.first_name;

    return (
        <section className={className}>
            {variant === 'card' ? (
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">{t('profile.update_profile')}</h3>

                    <form onSubmit={handleSubmit} className="mt-2.5 space-y-3">
                        {/* Avatar + Upload (and recommended text) */}
                        <div className="flex flex-row items-start gap-2">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-300 to-blue-300 text-white shadow-inner">
                                <PersonIcon className="h-7 w-7" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <button
                                    type="button"
                                    className="w-fit shrink-0 rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
                                >
                                    {t('profile.upload')}
                                </button>
                                <p className="text-xs text-gray-400 leading-snug">
                                    {t('profile.recommended_avatar_size')}
                                </p>
                            </div>
                        </div>

                        {/* First name + Last name below avatar block */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <InputLabel htmlFor="first_name" value={t('profile.first_name')} className="text-gray-700 text-sm" />
                                <TextInput
                                    id="first_name"
                                    className="mt-0.5 block w-full rounded-md border-gray-200 bg-white py-1.5 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:ring-gray-400"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    autoComplete="given-name"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="last_name" value={t('profile.last_name')} className="text-gray-700 text-sm" />
                                <TextInput
                                    id="last_name"
                                    className="mt-0.5 block w-full rounded-md border-gray-200 bg-white py-1.5 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:ring-gray-400"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    autoComplete="family-name"
                                />
                            </div>
                        </div>
                        {(errors.first_name || errors.last_name || errors.name) && (
                            <InputError message={errors.name || errors.first_name || errors.last_name} />
                        )}

                        <div>
                            <InputLabel htmlFor="email" value={t('profile.email')} className="text-gray-700 text-sm" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-0.5 block w-full rounded-md border-gray-200 bg-white py-1.5 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:ring-gray-400"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <InputError className="mt-1" message={errors.email} />
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div className="rounded-lg bg-gray-50 p-2">
                                <p className="text-sm text-gray-800">
                                    {t('profile.email_unverified')}{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-sm font-medium text-primary-600 underline hover:text-primary-700"
                                    >
                                        {t('profile.resend_verification')}
                                    </Link>
                                </p>
                                {status === 'verification-link-sent' && (
                                    <p className="mt-1 text-sm font-medium text-green-600">
                                        {t('profile.verification_sent')}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <span className="text-sm text-gray-500">{t('profile.saved')}</span>
                            </Transition>
                            <div className="flex items-center gap-2 ml-auto">
                                {onCancel && (
                                    <button
                                        type="button"
                                        onClick={onCancel}
                                        className="text-sm font-semibold uppercase tracking-wide text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 rounded"
                                    >
                                        {t('profile.cancel')}
                                    </button>
                                )}
                                <PrimaryButton type="submit" disabled={processing} className="rounded-lg">
                                    {t('profile.save')}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">{t('profile.information')}</h2>
                        <p className="mt-1 text-sm text-gray-600">{t('profile.information_description')}</p>
                    </header>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value={t('profile.name')} />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={nameValue}
                                onChange={(e) => {
                                    const p = parseName(e.target.value);
                                    setData('first_name', p.first_name);
                                    setData('last_name', p.last_name);
                                }}
                                required
                                autoComplete="name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value={t('profile.email')} />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="mt-2 text-sm text-gray-800">
                                    {t('profile.email_unverified')}{' '}
                                    <Link href={route('verification.send')} method="post" as="button" className="rounded-md text-sm text-gray-600 underline hover:text-gray-900">
                                        {t('profile.resend_verification')}
                                    </Link>
                                </p>
                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">{t('profile.verification_sent')}</div>
                                )}
                            </div>
                        )}
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>{t('profile.save')}</PrimaryButton>
                            <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                                <p className="text-sm text-gray-600">{t('profile.saved')}</p>
                            </Transition>
                        </div>
                    </form>
                </>
            )}
        </section>
    );
}
