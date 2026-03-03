import { Form, Head, usePage } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type DomainRow = {
    id: number;
    domain: string;
    check_interval_minutes: number;
    request_timeout_seconds: number;
    check_method: 'get' | 'head';
    is_active: boolean;
    last_status: 'up' | 'down' | 'error' | null;
    last_response_code: number | null;
    last_response_time_ms: number | null;
    last_error: string | null;
    last_checked_at: string | null;
    next_check_at: string | null;
};

type CheckRow = {
    id: number;
    status: 'up' | 'down' | 'error';
    response_code: number | null;
    response_time_ms: number | null;
    error: string | null;
    checked_at: string;
    domain: {
        id: number;
        domain: string;
    };
};

type Props = {
    domains: DomainRow[];
    recentChecks: CheckRow[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Domains',
        href: '/domains',
    },
];

function statusBadge(status: DomainRow['last_status']) {
    if (status === 'up') {
        return <Badge>UP</Badge>;
    }

    if (status === 'down' || status === 'error') {
        return <Badge variant="destructive">{status.toUpperCase()}</Badge>;
    }

    return <Badge variant="secondary">N/A</Badge>;
}

export default function DomainsIndex({ domains, recentChecks }: Props) {
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Domains" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Мониторинг доменов"
                    description="CRUD доменов, настройки проверок и история результатов."
                />

                {flash?.success && (
                    <p className="rounded-md border border-green-700/30 bg-green-50 p-3 text-sm text-green-800">
                        {flash.success}
                    </p>
                )}
                {flash?.error && (
                    <p className="rounded-md border border-red-700/30 bg-red-50 p-3 text-sm text-red-800">
                        {flash.error}
                    </p>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Добавить домен</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form action="/domains" method="post" className="grid gap-4 md:grid-cols-5">
                            {({ errors, processing }) => (
                                <>
                                    <div className="grid gap-2 md:col-span-2">
                                        <Label htmlFor="domain">Домен / URL</Label>
                                        <Input id="domain" name="domain" placeholder="example.com" required />
                                        {errors.domain && <p className="text-xs text-red-600">{errors.domain}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="check_interval_minutes">Интервал (мин)</Label>
                                        <Input
                                            id="check_interval_minutes"
                                            name="check_interval_minutes"
                                            type="number"
                                            min={1}
                                            defaultValue={5}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="request_timeout_seconds">Таймаут (сек)</Label>
                                        <Input
                                            id="request_timeout_seconds"
                                            name="request_timeout_seconds"
                                            type="number"
                                            min={1}
                                            defaultValue={10}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="check_method">Метод</Label>
                                        <select
                                            id="check_method"
                                            name="check_method"
                                            className="h-9 rounded-md border bg-transparent px-3 text-sm"
                                            defaultValue="head"
                                        >
                                            <option value="head">HEAD</option>
                                            <option value="get">GET</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2 md:col-span-5">
                                        <input id="is_active" name="is_active" type="checkbox" defaultChecked />
                                        <Label htmlFor="is_active">Активный мониторинг</Label>
                                    </div>
                                    <Button disabled={processing} className="md:col-span-5 md:w-fit">
                                        Сохранить
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Список доменов</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {domains.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                Доменов пока нет.
                            </p>
                        )}

                        {domains.map((domain) => (
                            <div key={domain.id} className="rounded-md border p-3">
                                <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                                    <span className="font-semibold">{domain.domain}</span>
                                    {statusBadge(domain.last_status)}
                                    <span>HTTP: {domain.last_response_code ?? '-'}</span>
                                    <span>Время: {domain.last_response_time_ms ?? '-'} ms</span>
                                    <span>
                                        Последняя: {domain.last_checked_at ? new Date(domain.last_checked_at).toLocaleString() : '-'}
                                    </span>
                                    <span>
                                        Следующая: {domain.next_check_at ? new Date(domain.next_check_at).toLocaleString() : '-'}
                                    </span>
                                </div>

                                <Form action={`/domains/${domain.id}`} method="post" className="grid gap-3 md:grid-cols-5">
                                    {({ processing }) => (
                                        <>
                                            <input type="hidden" name="_method" value="put" />
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label htmlFor={`domain-${domain.id}`}>Домен / URL</Label>
                                                <Input
                                                    id={`domain-${domain.id}`}
                                                    name="domain"
                                                    defaultValue={domain.domain}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor={`interval-${domain.id}`}>Интервал (мин)</Label>
                                                <Input
                                                    id={`interval-${domain.id}`}
                                                    type="number"
                                                    name="check_interval_minutes"
                                                    min={1}
                                                    defaultValue={domain.check_interval_minutes}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor={`timeout-${domain.id}`}>Таймаут (сек)</Label>
                                                <Input
                                                    id={`timeout-${domain.id}`}
                                                    type="number"
                                                    name="request_timeout_seconds"
                                                    min={1}
                                                    defaultValue={domain.request_timeout_seconds}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor={`method-${domain.id}`}>Метод</Label>
                                                <select
                                                    id={`method-${domain.id}`}
                                                    name="check_method"
                                                    className="h-9 rounded-md border bg-transparent px-3 text-sm"
                                                    defaultValue={domain.check_method}
                                                >
                                                    <option value="head">HEAD</option>
                                                    <option value="get">GET</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2 md:col-span-5">
                                                <input
                                                    id={`active-${domain.id}`}
                                                    name="is_active"
                                                    type="checkbox"
                                                    defaultChecked={domain.is_active}
                                                />
                                                <Label htmlFor={`active-${domain.id}`}>Активный мониторинг</Label>
                                            </div>
                                            <div className="flex gap-2 md:col-span-5">
                                                <Button disabled={processing}>Обновить</Button>
                                            </div>
                                        </>
                                    )}
                                </Form>

                                <div className="mt-2 flex gap-2">
                                    <Form action={`/domains/${domain.id}/checks`} method="post">
                                        {({ processing }) => (
                                            <Button variant="secondary" disabled={processing}>
                                                Проверить сейчас
                                            </Button>
                                        )}
                                    </Form>
                                    <Form action={`/domains/${domain.id}`} method="post">
                                        {({ processing }) => (
                                            <>
                                                <input type="hidden" name="_method" value="delete" />
                                                <Button variant="destructive" disabled={processing}>
                                                    Удалить
                                                </Button>
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>История проверок</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {recentChecks.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                История пуста.
                            </p>
                        )}

                        {recentChecks.map((check) => (
                            <div key={check.id} className="flex flex-wrap gap-2 rounded-md border p-2 text-sm">
                                <span className="min-w-52 font-medium">{check.domain.domain}</span>
                                <span>Статус: {check.status.toUpperCase()}</span>
                                <span>HTTP: {check.response_code ?? '-'}</span>
                                <span>Время: {check.response_time_ms ?? '-'} ms</span>
                                {check.error && (
                                    <span className="text-red-600">Ошибка: {check.error}</span>
                                )}
                                <span>
                                    Дата: {new Date(check.checked_at).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
