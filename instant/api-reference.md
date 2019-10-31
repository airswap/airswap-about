{% hint style="warning" %}
This documentation is in the works and subject to change.
{% endhint %}

At the API level, a **signer** is the party that prices and cryptographically signs a trade, and a **sender** is the party that sends it to the blockchain for settlement.

# Peer API

## `getSenderSideQuote`

Given a `signerParam` and token pair, request a `senderParam` from the signer.

```json
{
  "jsonrpc": "2.0",
  "method": "getSenderSideQuote",
  "params": {
    "signerParam": "100000000",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a"
  },
  "id": "123"
}
```

| Param         | Type      | Description                                     |
| :------------ | :-------- | :---------------------------------------------- |
| `signerParam` | `uint256` | The amount of ERC-20 the signer would transfer. |
| `senderToken` | `address` | The token the sender would transfer.            |
| `signerToken` | `address` | The token the signer would transfer.            |

A successful `getSenderSideQuote` returns a [Quote](#quote-object) object including the requested `senderParam`.

## `getSignerSideQuote`

Given a `senderParam` and token pair, request a `signerParam` from the signer.

```json
{
  "jsonrpc": "2.0",
  "method": "getSignerSideQuote",
  "params": {
    "senderParam": "100000000",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a"
  },
  "id": "123"
}
```

| Param         | Type      | Description                                     |
| :------------ | :-------- | :---------------------------------------------- |
| `senderParam` | `uint256` | The amount of ERC-20 the sender would transfer. |
| `senderToken` | `address` | The token the sender would transfer.            |
| `signerToken` | `address` | The token the signer would transfer.            |

A successful `getSignerSideQuote` returns a [Quote](#quote-object) object including the requested `signerParam`.

## `getMaxQuote`

Given a token pair, request the maximum amounts a signer is willing to trade.

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

| Param         | Type      | Description                                     |
| :------------ | :-------- | :---------------------------------------------- |
| `senderToken` | `address` | The token the sender would transfer.            |
| `signerToken` | `address` | The token the signer would transfer.            |

A successful `getMaxQuote` returns a [Quote](#quote-object) object.

## `getSenderSideOrder`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSenderSideOrder",
  "params": {
    "signerParam": "10000",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2"
  },
  "id": "123"
}
```

| Param          | Type      | Description                                     |
| :------------- | :-------- | :---------------------------------------------- |
| `signerParam`  | `uint256` | The amount of ERC-20 the signer would transfer. |
| `signerToken`  | `address` | The token the signer would transfer.            |
| `senderToken`  | `address` | The token the sender would transfer.            |
| `senderWallet` | `address` | The wallet of the sender.                       |

A successful `getSenderSideOrder` returns a signed [Order](#order-object) object including the requested `senderParam`.

## `getSignerSideOrder`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSignerSideOrder",
  "params": {
    "senderParam": "100000000",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2"
  },
  "id": "123"
}
```

| Param          | Type      | Description                                     |
| :------------- | :-------- | :---------------------------------------------- |
| `senderParam`  | `uint256` | The amount of ERC-20 the sender would transfer. |
| `signerToken`  | `address` | The token the signer would transfer.            |
| `senderToken`  | `address` | The token the sender would transfer.            |
| `senderWallet` | `address` | The wallet of the sender.                       |

A successful `getSignerSideOrder` returns a signed [Order](#order-object) object including the requested `signerParam`.

# Error codes

The above call may have thrown an error, matched by `id`:

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

# Quotes and Orders

## Quote Object

Quotes are simple structures that only include the `token`, `param`, and `kind` fields for `signer` and `sender`.

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

Orders are full structures that include `wallet` for `signer` and `sender`, an `affiliate` party empty by default, and a `nonce`, `expiry`, and `signature`.

```json
{
  "nonce": "100",
  "expiry": "1566941284",
  "signer": {
    "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "param": "10000",
    "kind": "0x277f8169"
  },
  "sender": {
    "wallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "param": "100000000",
    "kind": "0x277f8169"
  },
  "affiliate": {
    "wallet": "0x0000000000000000000000000000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "param": "0",
    "kind": "0x277f8169"
  },
  "signature": {
    "signatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "version": "0x45",
    "v": "28",
    "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
    "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70"
  }
}
```

These values correlate to the structs in [Types](../contracts/types.md).

# Representation Formats

Messages passed between peers and smart contracts, including request parameters, order and quote responses, and contract events, are interchangeable between nested and flat formats.

## Nested Format

The nested format makes parameters available by dot syntax. For example, `signer.wallet` to access the signer wallet.

```json
{
  "nonce": "100",
  "expiry": "1566941284",
  "signer": {
    "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "param": "10000",
    "kind": "0x277f8169"
  },
  "sender": {
    "wallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "param": "100000000",
    "kind": "0x277f8169"
  },
  "affiliate": {
    "wallet": "0x0000000000000000000000000000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "param": "0",
    "kind": "0x277f8169"
  },
  "signature": {
    "signatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "version": "0x45",
    "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
    "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
    "v": "28"
  }
}
```

## Flat Format

The flat format of an order collapses the tree structure by concatenating each value as a path. For example, `signer.wallet` is represented as `signerWallet`.

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
  "signatureSigner": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
  "signatureVersion": "0x45",
  "signatureR": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
  "signatureS": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
  "signatureV": "28"
}
```
