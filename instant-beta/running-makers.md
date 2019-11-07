{% hint style="warning" %}
The following specification is in beta on Rinkeby. For production maker documentation, [click here](../instant/running-makers-legacy.md).
{% endhint %}

# Use the Maker Kit

Maker Kit includes tools and examples to help you get started on the AirSwap Network. Interact with indexers, tokens, and other peers.

![](../.gitbook/assets/set-intent-terminal.png)

[Check it out on GitHub](https://github.com/airswap/airswap-maker-kit) to get started.

# Build Your Own

## Terminology

At the liquidity level, a **maker** is a trading party that is generally available to provide pricing and make trades. A **taker** is a trading party that trades one-off or periodically and accepts the pricing of makers. Makers are expected to implement the following methods taking the API role of **signer** in all cases. The following Peer API is implemented by makers via JSON-RPC over HTTP. At the API level, a **signer** is the party that creates and cryptographically signs an order, and a **sender** is the party that sends it to the blockchain for settlement.

## Running a Server

Makers are HTTP servers that implement the following API using [JSON-RPC 2.0](http://www.jsonrpc.org/specification) and [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). To be accessible, the server must be run at a public URL, which is then posted to an indexer contract as "intent to trade" for visibility by prospective counterparties.

## Methods

### `getSenderSideQuote`

Given a `signerParam` and token pair, return a complete quote. The `senderParam` value is the amount the taker would send. The taker is **buying** from you.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSenderSideQuote",
  "params": {
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "signerParam": "100000000",
    "signatureValidator": "0x43f18D371f388ABE40b9dDaac44D1C9c9185a078"
  },
  "id": "123"
}
```

| Param         | Type      | Description                                 |
| :------------ | :-------- | :------------------------------------------ |
| `signerParam` | `uint256` | Amount of ERC-20 the signer would transfer. |
| `senderToken` | `address` | Token the sender would transfer.            |
| `signerToken` | `address` | Token the signer would transfer.            |

A successful `getSenderSideQuote` returns a [Quote](#quote-object) object including the requested `senderParam`.

### `getSignerSideQuote`

Given a `senderParam` and token pair, return a complete quote. The `signerParam` value is the amount you would send. The taker is **selling** to you.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSignerSideQuote",
  "params": {
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderParam": "100000000",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a"
  },
  "id": "123"
}
```

| Param         | Type      | Description                                 |
| :------------ | :-------- | :------------------------------------------ |
| `senderParam` | `uint256` | Amount of ERC-20 the sender would transfer. |
| `senderToken` | `address` | Token the sender would transfer.            |
| `signerToken` | `address` | Token the signer would transfer.            |

A successful `getSignerSideQuote` returns a [Quote](#quote-object) object including the requested `signerParam`. Maximum amounts of tokens you're willing to trade.

### `getMaxQuote`

Given a token pair, return a quote object with the maximum amounts you're willing to trade.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getMaxQuote",
  "params": {
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a"
  },
  "id": "123"
}
```

| Param         | Type      | Description                          |
| :------------ | :-------- | :----------------------------------- |
| `senderToken` | `address` | The token the sender would transfer. |
| `signerToken` | `address` | The token the signer would transfer. |

A successful `getMaxQuote` returns a [Quote](#quote-object) object.

### `getSenderSideOrder`

Given a `signerParam`, `senderWallet`, and token pair, return a complete order. The `senderParam` value is the amount the taker would send. The taker is **buying** from you.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSenderSideOrder",
  "params": {
    "signerParam": "10000",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "signatureValidator": "0x43f18D371f388ABE40b9dDaac44D1C9c9185a078"
  },
  "id": "123"
}
```

| Param                | Type      | Description                                 |
| :------------------- | :-------- | :------------------------------------------ |
| `signerParam`        | `uint256` | Amount of ERC-20 the signer would transfer. |
| `signerToken`        | `address` | Token the signer would transfer.            |
| `senderToken`        | `address` | Token the sender would transfer.            |
| `senderWallet`       | `address` | Wallet of the sender.                       |
| `signatureValidator` | `address` | Swap contract the sender intends to use.    |

A successful `getSenderSideOrder` returns a signed [Order](#order-object) object including the requested `senderParam`.

### `getSignerSideOrder`

Given a `senderParam`, `senderWallet`, and token pair, return a complete order. The `signerParam` value is the amount you would send. The taker is **selling** to you.

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSignerSideOrder",
  "params": {
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderParam": "100000000",
    "signatureValidator": "0x43f18D371f388ABE40b9dDaac44D1C9c9185a078"
  },
  "id": "123"
}
```

| Param                | Type      | Description                                     |
| :------------------- | :-------- | :---------------------------------------------- |
| `senderParam`        | `uint256` | The amount of ERC-20 the sender would transfer. |
| `signerToken`        | `address` | The token the signer would transfer.            |
| `senderToken`        | `address` | The token the sender would transfer.            |
| `senderWallet`       | `address` | The wallet of the sender.                       |
| `signatureValidator` | `address` | Swap contract the sender intends to use.        |

A successful `getSignerSideOrder` returns a signed [Order](#order-object) object including the requested `signerParam`.

## Error codes

The above call may have thrown an error, matched by `id`:

**Example**

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "error": {
    "code": -33605,
    "message": "Rate limit exceeded"
  }
}
```

The following are error codes in the [JSON-RPC specification](http://www.jsonrpc.org/specification#error_object):

- `-32700` Parse error
- `-32600` Invalid Request
- `-32601` Method not found
- `-32602` Invalid params
- `-32603` Internal error
- `-32000 to -32099` Reserved for implementation-defined server-errors.

We have allocated the following range for Swap Protocol errors:

- `-33600` Cannot provide the requested quote or order
- `-33601` Not trading the requested `signerToken` `senderToken` pair
- `-33602` The specified `senderParam` or `signerParam` is too low
- `-33603` The specified `senderParam` or `signerParam` is too high
- `-33604` Improperly formatted `signerToken`, `senderToken`, or `senderWallet` address
- `-33605` Rate limit exceeded
- `-33700 to -33799` Reserved for implementation specific trading errors.

# Interacting with Indexers

Indexers are smart contracts used to signal your intent to trade tokens and publish the URL at which your maker is running.

| Function to call | When to call it                                                                                                                                |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `setIntent`      | Start receiving requests. Sets a token pair and location of your server. Stake AirSwap Tokens (AST) to be ranked higher for better visibility. |
| `unsetIntent`    | Stop receiving requests. Unsets a token pair. Any staked AST will be returned.                                                                 |
| `getLocators`    | Get a list of all makers trading a token pair.                                                                                                 |
| `createIndex`    | If your token pair is not on the Indexer it must be created.                                                                                   |

See the [Indexer Contract](../contracts/indexer.md) for method details. You can interact with Indexer contracts either programmatically or through tools like [AirSwap Maker Kit](https://github.com/airswap/airswap-maker-kit) and [MEW](https://www.myetherwallet.com/).

# Quotes and Orders

## Quote Object

Quotes are simple structures that only include the `token`, `param`, and `kind` fields for `signer` and `sender`. The `kind` is the interface identifier for ERC-20 or ERC-721 - see [EIP-165](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md). The `param` is the number of ERC-20 tokens being transferred, or the ID of the ERC-721 being transferred.

**Example**

```json
{
  "signer": {
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "param": "10000",
    "kind": "0x277f8169"
  },
  "sender": {
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "param": "100000000",
    "kind": "0x277f8169"
  }
}
```

## Order Object

Orders are full structures that include `wallet` for `signer` and `sender`, an `affiliate` party empty by default, and a `nonce`, `expiry`, and `signature`. The `kind` is the interface identifier for ERC-20 or ERC-721 - see [EIP-165](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md). The `param` is the number of ERC-20 tokens being transferred, or the ID of the ERC-721 being transferred.

**Example**

```json
{
  "nonce": "100",
  "expiry": "1566941284",
  "signer": {
    "kind": "0x277f8169",
    "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "param": "10000"
  },
  "sender": {
    "kind": "0x277f8169",
    "wallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "param": "100000000"
  },
  "affiliate": {
    "kind": "0x277f8169",
    "wallet": "0x0000000000000000000000000000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "param": "0"
  },
  "signature": {
    "signatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "validator": "0x43f18D371f388ABE40b9dDaac44D1C9c9185a078",
    "version": "0x45",
    "v": "28",
    "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
    "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70"
  }
}
```

These values correlate to the structs in [Types](../contracts/types.md).

# Signatures

# Representation Formats

Messages passed between peers and smart contracts, including request parameters, order and quote responses, and contract events, are interchangeable between nested and flat formats.

## Nested Format

The nested format makes parameters available by dot syntax. For example, `signer.wallet` to access the signer wallet.

**Example**

```json
{
  "nonce": "100",
  "expiry": "1566941284",
  "signer": {
    "kind": "0x277f8169",
    "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "param": "10000"
  },
  "sender": {
    "kind": "0x277f8169",
    "wallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "param": "100000000"
  },
  "affiliate": {
    "kind": "0x277f8169",
    "wallet": "0x0000000000000000000000000000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "param": "0"
  },
  "signature": {
    "signatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "validator": "0x43f18D371f388ABE40b9dDaac44D1C9c9185a078",
    "version": "0x45",
    "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
    "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
    "v": "28"
  }
}
```

## Flat Format

The flat format of an order collapses the tree structure by concatenating each value as a path. For example, `signer.wallet` is represented as `signerWallet`.

**Example**

```json
{
  "nonce": "1566937684942",
  "expiry": "1566941284",
  "signerWallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
  "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
  "signerParam": "10000",
  "signerKind": "0x277f8169",
  "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
  "senderToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
  "senderParam": "100000000",
  "senderKind": "0x277f8169",
  "affiliateWallet": "0x0000000000000000000000000000000000000000",
  "affiliateToken": "0x0000000000000000000000000000000000000000",
  "affiliateParam": "0",
  "affiliateKind": "0x277f8169",
  "signatureSignatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
  "signatureValidator": "0x43f18D371f388ABE40b9dDaac44D1C9c9185a078",
  "signatureVersion": "0x45",
  "signatureR": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
  "signatureS": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
  "signatureV": "28"
}
```

# Helpful Links for Testing on Rinkeby

- **ETH** to pay for transactions - [ETH Faucet](https://faucet.rinkeby.io/)
- **WETH** for trading - `0xc778417e063141139fce010982780140aa0cd5ab` [Etherscan](https://rinkeby.etherscan.io/address/0xc778417e063141139fce010982780140aa0cd5ab)
- **DAI** for trading - `0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea` [Etherscan](https://rinkeby.etherscan.io/address/0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea)
- **AST** for staking - [AST Faucet](https://ast-faucet-ui.development.airswap.io/)
