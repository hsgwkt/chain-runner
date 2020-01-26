export type ChainParam = {
  props: PropertyKey[]
}

export default function <T>(target: T, fallback: PropertyKey | PropertyKey[] = []): T {
  const cache = new WeakMap()

  function getProxy<U>(target: U, props: PropertyKey[]): U {
    if (typeof target === 'function') {
      return target.bind({ props })
    }

    if (isPlainObject(target)) {
      let proxy = cache.get(target)
      if (!proxy) {

        proxy = new Proxy(target, {
          get(target, prop, receiver) {
            for (const key of [prop].concat(fallback)) {
              const value = Reflect.get(target, key, receiver)
              if (value !== undefined) {
                return getProxy(value, [...props, key])
              }
            }
          }
        })

        cache.set(target, proxy)
      }

      return proxy
    }

    return target
  }

  return getProxy(target, [])
}

type PlainObject = Record<PropertyKey, unknown>

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null &&
    (value.constructor === Object || !value.constructor)
}
