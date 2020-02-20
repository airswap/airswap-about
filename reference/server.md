Servers are processes that implement the [Quote](../protocols/quote.md) and [Order](../protocols/order.md) protocols using [JSON-RPC 2.0](http://www.jsonrpc.org/specification) over HTTPS.

# Server Client

Add the `@airswap/protocols` package to your application.

```bash
$ yarn add @airswap/protocols
```

Import the Server client.

```TypeScript
import { Server } from '@airswap/protocols'
```

### `constructor`

Create a new `Server` client.

```TypeScript
public constructor(locator: string)
```

| Param     | Type     | Optionality | Description                                                  |
| :-------- | :------- | :---------- | :----------------------------------------------------------- |
| `locator` | `string` | `required`  | URL of the server, If no scheme provided, `https` is implied |

**Example**
Create a client to connect to `https://maker.example.com/`.

```java
const server = new Server('maker.example.com');
```

**Example**
Create a client to connect to a local development server.

```java
const server = new Server('http://localhost:3000');
```

### `Quotes`

Servers implement the [`Quote`](../protocols/quote.md) protocol.

**Example**
Call `getMaxQuote` on a Server.

```TypeScript
const server = new Server('http://localhost:3000');
const quote = await server.getMaxQuote(senderToken, signerToken);
```

### `Orders`

Servers implement the [`Order`](../protocols/order.md) protocol.

**Example**
Call `getSenderSideOrder` on a Server.

```TypeScript
const wallet = new ethers.Wallet('...');
const server = new Server('http://localhost:3000');
const quote = await server.getSenderSideOrder(signerAmount, signerToken, senderToken, wallet.address);
```
