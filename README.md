# chain-runner

```js
import chainRunner from 'chain-runner'

const id = 0

function request() {
  console.log(this.props)
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
