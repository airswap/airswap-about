# Last Look API

Last look is to say that, after having emitted an indicative quote, a maker may accept or decline an order provided to it by a taker. Quotes are primarily served through the [`Quote`](./quote.md) protocol, but other methods to disseminate pricing information may exist, for example `SetRule` events on `Delegate` contracts.

## `provideOrder`

Given an order, assess its price, and conditionally perform a swap.

| Param   | Type    | Description    |
| :------ | :------ | :------------- |
| `order` | `Order` | Order to swap. |

**Example Delegate Call**

```TypeScript
import { Delegate } from '@airswap/protocols'
const delegate = new Delegate('...')
const hash = await delegate.provideOrder(order);
```
