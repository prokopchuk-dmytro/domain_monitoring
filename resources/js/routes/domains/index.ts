import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import checks from './checks'
/**
* @see \App\Http\Controllers\DomainController::index
* @see app/Http/Controllers/DomainController.php:15
* @route '/domains'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/domains',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DomainController::index
* @see app/Http/Controllers/DomainController.php:15
* @route '/domains'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainController::index
* @see app/Http/Controllers/DomainController.php:15
* @route '/domains'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::index
* @see app/Http/Controllers/DomainController.php:15
* @route '/domains'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DomainController::index
* @see app/Http/Controllers/DomainController.php:15
* @route '/domains'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::index
* @see app/Http/Controllers/DomainController.php:15
* @route '/domains'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::index
* @see app/Http/Controllers/DomainController.php:15
* @route '/domains'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\DomainController::store
* @see app/Http/Controllers/DomainController.php:20
* @route '/domains'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/domains',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DomainController::store
* @see app/Http/Controllers/DomainController.php:20
* @route '/domains'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainController::store
* @see app/Http/Controllers/DomainController.php:20
* @route '/domains'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DomainController::store
* @see app/Http/Controllers/DomainController.php:20
* @route '/domains'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DomainController::store
* @see app/Http/Controllers/DomainController.php:20
* @route '/domains'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DomainController::update
* @see app/Http/Controllers/DomainController.php:33
* @route '/domains/{domain}'
*/
export const update = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/domains/{domain}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DomainController::update
* @see app/Http/Controllers/DomainController.php:33
* @route '/domains/{domain}'
*/
update.url = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { domain: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { domain: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            domain: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        domain: typeof args.domain === 'object'
        ? args.domain.id
        : args.domain,
    }

    return update.definition.url
            .replace('{domain}', parsedArgs.domain.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainController::update
* @see app/Http/Controllers/DomainController.php:33
* @route '/domains/{domain}'
*/
update.put = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DomainController::update
* @see app/Http/Controllers/DomainController.php:33
* @route '/domains/{domain}'
*/
update.patch = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DomainController::update
* @see app/Http/Controllers/DomainController.php:33
* @route '/domains/{domain}'
*/
const updateForm = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DomainController::update
* @see app/Http/Controllers/DomainController.php:33
* @route '/domains/{domain}'
*/
updateForm.put = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DomainController::update
* @see app/Http/Controllers/DomainController.php:33
* @route '/domains/{domain}'
*/
updateForm.patch = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\DomainController::destroy
* @see app/Http/Controllers/DomainController.php:48
* @route '/domains/{domain}'
*/
export const destroy = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/domains/{domain}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DomainController::destroy
* @see app/Http/Controllers/DomainController.php:48
* @route '/domains/{domain}'
*/
destroy.url = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { domain: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { domain: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            domain: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        domain: typeof args.domain === 'object'
        ? args.domain.id
        : args.domain,
    }

    return destroy.definition.url
            .replace('{domain}', parsedArgs.domain.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainController::destroy
* @see app/Http/Controllers/DomainController.php:48
* @route '/domains/{domain}'
*/
destroy.delete = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DomainController::destroy
* @see app/Http/Controllers/DomainController.php:48
* @route '/domains/{domain}'
*/
const destroyForm = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DomainController::destroy
* @see app/Http/Controllers/DomainController.php:48
* @route '/domains/{domain}'
*/
destroyForm.delete = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const domains = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    checks: Object.assign(checks, checks),
}

export default domains