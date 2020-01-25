# chain-runner

## example

```js
import chainRunner, { getChainProps } from 'chain-runner'

const id = 0

function request() {
  return getChainProps(this)
}

const api = chainRunner({
  items: {
    list: request,
    [id]: {
      read: request
    }
  }
}, id)

api.items.list()
// => ['items', 'list']

api.items[100].read()
// => ['items', 100, 'read']
```
