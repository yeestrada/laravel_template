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

export default function RolesIndex() {
    const { translations = {}, roles: rolesPaginator = {}, flash = {}, search: searchFromProps = '' } = usePage().props;
    const rolesList = rolesPaginator?.data ?? [];
    const t = (key) => translations[key] ?? key;
    const flashError = flash.error;
    const [editingRole, setEditingRole] = useState(null);
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
            router.get(route('admin.roles.index'), { search: value.trim() || undefined, page: 1 }, { preserveState: true });
        }, 300);
    };

    const { data, setData, put, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        description: '',
    });
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const openCreateModal = () => {
        setCreateModalOpen(true);
        setEditingRole(null);
        setData({ name: '', slug: '', description: '' });
    };

    const openEditModal = (role) => {
        setCreateModalOpen(false);
        setEditingRole(role);
        setData({
            name: role.name,
            slug: role.slug,
            description: role.description ?? '',
        });
    };

    const closeModal = () => {
        setEditingRole(null);
        setCreateModalOpen(false);
        reset();
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (editingRole) {
            put(route('admin.roles.update', editingRole.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.roles.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (role) => {
        if (!window.confirm(t('admin.roles.delete_confirm'))) return;
        router.delete(route('admin.roles.destroy', role.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            sidebar={<AdminSidebar />}
            header={
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={openCreateModal}
                            title={t('admin.roles.add_role')}
                            className="flex items-center justify-center rounded-lg bg-green-600 p-2 text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            <PlusIcon className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                            {t('admin.roles.title')}
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
                            placeholder={t('admin.roles.search_placeholder')}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-500"
                        />
                    </div>
                </div>
            }
        >
            <Head title={t('admin.roles.title')} />

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
                                {t('admin.roles.description')}
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.roles.name')}
                                            </th>
                                            <th className="bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.roles.slug')}
                                            </th>
                                            <th className="bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.roles.users_count')}
                                            </th>
                                            <th className="bg-gray-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.roles.description_label')}
                                            </th>
                                            <th className="w-0 bg-gray-50 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700/50 dark:text-gray-300">
                                                {t('admin.roles.actions')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                                        {rolesList.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                                    {t('admin.roles.empty')}
                                                </td>
                                            </tr>
                                        ) : (
                                            rolesList.map((role) => (
                                                <tr key={role.id}>
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {role.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {role.slug}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {role.users_count}
                                                    </td>
                                                    <td className="max-w-xs px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {role.description || '—'}
                                                    </td>
                                                    <td className="w-0 whitespace-nowrap pl-4 pr-[15px] py-3 text-right text-sm">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => openEditModal(role)}
                                                                title={t('admin.roles.edit')}
                                                                className="flex items-center justify-center rounded-lg bg-white p-2 text-gray-800 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:ring-offset-gray-800"
                                                            >
                                                                <PencilIcon />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(role)}
                                                                disabled={role.slug === 'admin' || role.users_count > 0}
                                                                title={t('admin.roles.delete')}
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
                            {rolesPaginator?.links && (
                                <div className="mt-4 border-t border-gray-200 px-4 py-3 dark:border-gray-600 sm:px-5">
                                    <Pagination paginator={rolesPaginator} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={createModalOpen || !!editingRole} onClose={closeModal} maxWidth="md">
                <form onSubmit={submitForm} className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {editingRole ? t('admin.roles.edit_modal_title') : t('admin.roles.create_modal_title')}
                    </h3>
                    <div className="mt-4 space-y-4">
                        <div>
                            <InputLabel htmlFor="role-name" value={t('admin.roles.name')} className="dark:text-gray-200" />
                            <TextInput
                                id="role-name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                                required
                            />
                            <InputError message={errors.name} className="mt-1 dark:text-red-400" />
                        </div>
                        <div>
                            <InputLabel htmlFor="role-slug" value={t('admin.roles.slug')} className="dark:text-gray-200" />
                            <TextInput
                                id="role-slug"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                className="mt-1 block w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                                required
                            />
                            <InputError message={errors.slug} className="mt-1 dark:text-red-400" />
                        </div>
                        <div>
                            <InputLabel htmlFor="role-description" value={t('admin.roles.description_label')} className="dark:text-gray-200" />
                            <textarea
                                id="role-description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500 sm:text-sm"
                            />
                            <InputError message={errors.description} className="mt-1 dark:text-red-400" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            {t('admin.roles.cancel')}
                        </button>
                        <PrimaryButton type="submit" disabled={processing}>
                            {t('admin.roles.save')}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
