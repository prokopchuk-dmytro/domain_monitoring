import { Form, Head, usePage, usePoll } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
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

type DashboardProps = {
    stats: {
        totalDomains: number;
        activeDomains: number;
        lastDayChecks: number;
        lastDayErrors: number;
    };
    latestChecks: CheckRow[];
    domains: DomainRow[];
    recentChecks: CheckRow[];
    setupWarning: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
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

export default function Dashboard({ stats, latestChecks, domains, recentChecks, setupWarning }: DashboardProps) {
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
        };
    };

    usePoll(5000, {
        only: ['stats', 'latestChecks', 'domains', 'recentChecks', 'setupWarning'],
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Веб-інтерфейс керування моніторингом"
                    description="Усі дії з доменами, налаштуваннями перевірок і журналом в одному місці."
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
                {setupWarning && (
                    <p className="rounded-md border border-amber-700/30 bg-amber-50 p-3 text-sm text-amber-900">
                        {setupWarning}
                    </p>
                )}

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">
                                Всього доменів
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {stats.totalDomains}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">
                                Активних
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {stats.activeDomains}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">
                                Перевірок за 24г
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {stats.lastDayChecks}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">
                                Помилок за 24г
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {stats.lastDayErrors}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Додати домен</CardTitle>
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
                                        <Label htmlFor="check_interval_minutes">Інтервал (хв)</Label>
                                        <Input id="check_interval_minutes" name="check_interval_minutes" type="number" min={1} defaultValue={5} required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="request_timeout_seconds">Таймаут (сек)</Label>
                                        <Input id="request_timeout_seconds" name="request_timeout_seconds" type="number" min={1} defaultValue={10} required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="check_method">Метод</Label>
                                        <select id="check_method" name="check_method" className="h-9 rounded-md border bg-transparent px-3 text-sm" defaultValue="head">
                                            <option value="head">HEAD</option>
                                            <option value="get">GET</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2 md:col-span-5">
                                        <input id="is_active" name="is_active" type="checkbox" defaultChecked />
                                        <Label htmlFor="is_active">Активний моніторинг</Label>
                                    </div>
                                    <Button disabled={processing} className="md:col-span-5 md:w-fit">
                                        Зберегти
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Список доменів</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {domains.map((domain) => (
                            <div key={domain.id} className="rounded-md border p-3">
                                <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                                    <span className="font-semibold">{domain.domain}</span>
                                    {statusBadge(domain.last_status)}
                                    <span>HTTP: {domain.last_response_code ?? '-'}</span>
                                    <span>Час: {domain.last_response_time_ms ?? '-'} ms</span>
                                    <span>Остання: {domain.last_checked_at ? new Date(domain.last_checked_at).toLocaleString() : '-'}</span>
                                    <span>Наступна: {domain.next_check_at ? new Date(domain.next_check_at).toLocaleString() : '-'}</span>
                                </div>

                                <Form action={`/domains/${domain.id}`} method="post" className="grid gap-3 md:grid-cols-5">
                                    {({ processing }) => (
                                        <>
                                            <input type="hidden" name="_method" value="put" />
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label htmlFor={`domain-${domain.id}`}>Домен / URL</Label>
                                                <Input id={`domain-${domain.id}`} name="domain" defaultValue={domain.domain} required />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor={`interval-${domain.id}`}>Інтервал (хв)</Label>
                                                <Input id={`interval-${domain.id}`} type="number" name="check_interval_minutes" min={1} defaultValue={domain.check_interval_minutes} required />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor={`timeout-${domain.id}`}>Таймаут (сек)</Label>
                                                <Input id={`timeout-${domain.id}`} type="number" name="request_timeout_seconds" min={1} defaultValue={domain.request_timeout_seconds} required />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor={`method-${domain.id}`}>Метод</Label>
                                                <select id={`method-${domain.id}`} name="check_method" className="h-9 rounded-md border bg-transparent px-3 text-sm" defaultValue={domain.check_method}>
                                                    <option value="head">HEAD</option>
                                                    <option value="get">GET</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2 md:col-span-5">
                                                <input id={`active-${domain.id}`} name="is_active" type="checkbox" defaultChecked={domain.is_active} />
                                                <Label htmlFor={`active-${domain.id}`}>Активний моніторинг</Label>
                                            </div>
                                            <div className="flex gap-2 md:col-span-5">
                                                <Button disabled={processing}>Оновити</Button>
                                            </div>
                                        </>
                                    )}
                                </Form>

                                <div className="mt-2 flex gap-2">
                                    <Form action={`/domains/${domain.id}/checks`} method="post">
                                        {({ processing }) => (
                                            <Button variant="secondary" disabled={processing}>
                                                Перевірити зараз
                                            </Button>
                                        )}
                                    </Form>
                                    <Form action={`/domains/${domain.id}`} method="post">
                                        {({ processing }) => (
                                            <>
                                                <input type="hidden" name="_method" value="delete" />
                                                <Button variant="destructive" disabled={processing}>
                                                    Видалити
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
                        <CardTitle>Останні перевірки</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {latestChecks.map((check) => (
                            <div key={check.id} className="flex flex-wrap items-center gap-2 rounded-md border p-2 text-sm">
                                <span className="min-w-48 font-medium">{check.domain.domain}</span>
                                <Badge variant={check.status === 'up' ? 'default' : 'destructive'}>
                                    {check.status.toUpperCase()}
                                </Badge>
                                <span>HTTP: {check.response_code ?? '-'}</span>
                                <span>Час: {check.response_time_ms ?? '-'} ms</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Історія перевірок</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {recentChecks.map((check) => (
                            <div key={check.id} className="flex flex-wrap gap-2 rounded-md border p-2 text-sm">
                                <span className="min-w-52 font-medium">{check.domain.domain}</span>
                                <span>Статус: {check.status.toUpperCase()}</span>
                                <span>HTTP: {check.response_code ?? '-'}</span>
                                <span>Час: {check.response_time_ms ?? '-'} ms</span>
                                <span>Дата: {new Date(check.checked_at).toLocaleString()}</span>
                                {check.error && <span className="text-red-600">Помилка: {check.error}</span>}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
