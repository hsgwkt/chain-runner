export default function <T>(target: T, fallback: PropertyKey | PropertyKey[] = []): T {
  const cache = new WeakMap()

  function getProxy<U>(target: U, props: PropertyKey[]): U {
    if (typeof target === 'function') {
      return target.bind({ props })
    }

    if (isObject(target)) {
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

export function getChainProps(value: any): PropertyKey[] {
  return value.props
}

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}
