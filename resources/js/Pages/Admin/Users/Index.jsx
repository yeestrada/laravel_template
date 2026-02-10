import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminSidebar from '@/Components/AdminSidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

function PencilIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
    );
}

function TrashIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    );
}

function PlusIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    );
}

function SearchIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
}

const inputDarkClass = 'mt-1 block w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500';
const selectDarkClass = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:dark:border-primary-400 focus:dark:ring-primary-500 sm:text-sm';

export default function UsersIndex() {
    const { translations = {}, users: usersPaginator = {}, roles = [], flash = {}, search: searchFromProps = '' } = usePage().props;
    const usersList = usersPaginator?.data ?? [];
    const t = (key) => translations[key] ?? key;
    const flashError = flash.error;
    const [editingUser, setEditingUser] = useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(searchFromProps);
    const searchTimeoutRef = useRef(null);

    useEffect(() => {
        setSearchInput(searchFromProps);
    }, [searchFromProps]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => {
            router.get(route('admin.users.index'), { search: value.trim() || undefined, page: 1 }, { preserveState: true });
        }, 300);
    };

    const { data, setData, put, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '',
    });

    const defaultUserRoleId = roles.find((r) => r.slug === 'user')?.id?.toString() ?? roles[0]?.id?.toString() ?? '';

    const openCreateModal = () => {
        setCreateModalOpen(true);
        setEditingUser(null);
        setData({ name: '', email: '', password: '', password_confirmation: '', role_id: defaultUserRoleId });
    };

    const openEditModal = (user) => {
        setCreateModalOpen(false);
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
            role_id: user.role_id?.toString() ?? defaultUserRoleId,
        });
    };

    const closeModal = () => {
        setEditingUser(null);
        setCreateModalOpen(false);
        reset();
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (editingUser) {
            put(route('admin.users.update', editingUser.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.users.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (user) => {
        if (!window.confirm(t('admin.users.delete_confirm'))) return;
        router.delete(route('admin.users.destroy', user.id), {
            preserveScroll: true,
        });
    };

    const currentUserId = usePage().props.auth?.user?.id;

    return (
        <AuthenticatedLayout
            sidebar={<AdminSidebar />}
            header={
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={openCreateModal}
                            title={t('admin.users.add_user')}
                            className="flex items-center justify-center rounded-lg bg-green-600 p-2 text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            <PlusIcon className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                            {t('admin.users.title')}
                        </h2>
                    </div>
                    <div className="relative w-full min-w-0 max-w-xs sm:max-w-sm">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                            <SearchIcon className="h-5 w-5" />
                        </span>
                        <input
                            type="search"
                            value={searchInput}
                            onChange={handleSearchChange}
                            placeholder={t('admin.users.search_placeholder')}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-500"
                        />
                    </div>
                </div>
            }
        >
            <Head title={t('admin.users.title')} />

            <div className="p-4 sm:p-6">
                <div className="w-full">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:ring-1 dark:ring-gray-700">
                        <div className="p-4 sm:p-5">
                            {flashError && (
                                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                                    {flashError}
                                </div>
                            )}
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                {t('admin.users.description')}
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.users.name')}
                                            </th>
                                            <th className="bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.users.email')}
                                            </th>
                                            <th className="bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.users.role')}
                                            </th>
                                            <th className="bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.users.created')}
                                            </th>
                                            <th className="w-0 bg-gray-50 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.users.actions')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                                        {usersList.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                                    {t('admin.users.empty')}
                                                </td>
                                            </tr>
                                        ) : (
                                            usersList.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {user.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {user.email}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {user.role?.name ?? t('admin.users.role_default')}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {user.created_at
                                                            ? new Date(user.created_at).toLocaleDateString(undefined, {
                                                                  year: 'numeric',
                                                                  month: 'short',
                                                                  day: 'numeric',
                                                              })
                                                            : '—'}
                                                    </td>
                                                    <td className="w-0 whitespace-nowrap pl-4 pr-[15px] py-3 text-right text-sm">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => openEditModal(user)}
                                                                title={t('admin.users.edit')}
                                                                className="flex items-center justify-center rounded-lg bg-white p-2 text-gray-800 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:ring-offset-gray-800"
                                                            >
                                                                <PencilIcon />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(user)}
                                                                disabled={user.id === currentUserId}
                                                                title={t('admin.users.delete')}
                                                                className="flex items-center justify-center rounded-lg bg-red-600 p-2 text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
                                                            >
                                                                <TrashIcon />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {usersPaginator?.links && (
                                <div className="mt-4 border-t border-gray-200 px-4 py-3 dark:border-gray-600 sm:px-5">
                                    <Pagination paginator={usersPaginator} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={createModalOpen || !!editingUser} onClose={closeModal} maxWidth="md">
                <form onSubmit={submitForm} className="p-6" autoComplete="off">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {editingUser ? t('admin.users.edit_modal_title') : t('admin.users.create_modal_title')}
                    </h3>
                    <div className="mt-4 space-y-4">
                        <div>
                            <InputLabel htmlFor={editingUser ? 'user-name' : 'create-user-name'} value={t('admin.users.name')} className="dark:text-gray-200" />
                            <TextInput
                                id={editingUser ? 'user-name' : 'create-user-name'}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={inputDarkClass}
                                autoComplete="off"
                                required
                            />
                            <InputError message={errors.name} className="mt-1 dark:text-red-400" />
                        </div>
                        <div>
                            <InputLabel htmlFor={editingUser ? 'user-email' : 'create-user-email'} value={t('admin.users.email')} className="dark:text-gray-200" />
                            <TextInput
                                id={editingUser ? 'user-email' : 'create-user-email'}
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={inputDarkClass}
                                autoComplete="off"
                                required
                            />
                            <InputError message={errors.email} className="mt-1 dark:text-red-400" />
                        </div>
                        {!editingUser && (
                            <>
                                <div>
                                    <InputLabel htmlFor="create-user-password" value={t('admin.users.password')} className="dark:text-gray-200" />
                                    <TextInput
                                        id="create-user-password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={inputDarkClass}
                                        autoComplete="new-password"
                                        required={!editingUser}
                                    />
                                    <InputError message={errors.password} className="mt-1 dark:text-red-400" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="user-password_confirmation" value={t('admin.users.password_confirmation')} className="dark:text-gray-200" />
                                    <TextInput
                                        id="create-user-password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className={inputDarkClass}
                                        autoComplete="new-password"
                                        required={!editingUser}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-1 dark:text-red-400" />
                                </div>
                            </>
                        )}
                        <div>
                            <InputLabel htmlFor="user-role_id" value={t('admin.users.role')} className="dark:text-gray-200" />
                            <select
                                id="user-role_id"
                                value={data.role_id}
                                onChange={(e) => setData('role_id', e.target.value)}
                                className={selectDarkClass}
                                required
                            >
                                <option value="">{t('admin.users.select_role')}</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.role_id} className="mt-1 dark:text-red-400" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            {t('admin.users.cancel')}
                        </button>
                        <PrimaryButton type="submit" disabled={processing}>
                            {t('admin.users.save')}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
