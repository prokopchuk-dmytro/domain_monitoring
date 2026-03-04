import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DomainCheckController::store
* @see app/Http/Controllers/DomainCheckController.php:12
* @route '/domains/{domain}/checks'
*/
export const store = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/domains/{domain}/checks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DomainCheckController::store
* @see app/Http/Controllers/DomainCheckController.php:12
* @route '/domains/{domain}/checks'
*/
store.url = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{domain}', parsedArgs.domain.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainCheckController::store
* @see app/Http/Controllers/DomainCheckController.php:12
* @route '/domains/{domain}/checks'
*/
store.post = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DomainCheckController::store
* @see app/Http/Controllers/DomainCheckController.php:12
* @route '/domains/{domain}/checks'
*/
const storeForm = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DomainCheckController::store
* @see app/Http/Controllers/DomainCheckController.php:12
* @route '/domains/{domain}/checks'
*/
storeForm.post = (args: { domain: number | { id: number } } | [domain: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const checks = {
    store: Object.assign(store, store),
}

export default checks