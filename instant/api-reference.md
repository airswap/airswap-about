# Peer API

The following methods should be implemented by all makers on the network.

## `getSignerSideQuote`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSignerSideQuote",
  "params": {
    "senderParam": "100000000",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "affiliateToken": "0x0000000000000000000000000000000000000000",
    "affiliateParam": "0"
  },
  "id": "123"
}
```

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "signer":
      "param": "100000000"
    }
  },
  "id": "123"
}
```

## `getSenderSideQuote`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSignerSideQuote",
  "params": {
    "signerParam": "100000000",
    "signerToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "affiliateToken": "0x0000000000000000000000000000000000000000",
    "affiliateParam": "0"
  },
  "id": "123"
}
```

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "sender":
      "param": "100000000"
    }
  },
  "id": "123"
}
```

## `getMaxQuote`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getMaxQuote",
  "params": {
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab"
  },
  "id": "123"
}
```

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "signer": {
      "param": "100000000"
    },
    "sender": {
      "param": "100000000"
    }
  },
  "id": "123"
}
```

## `getSignerSideOrder`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getSignerSideOrder",
  "params": {
    "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "senderParam": "100000000",
    "senderWallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
    "affiliateToken": "0x0000000000000000000000000000000000000000",
    "affiliateParam": "0"
  },
  "id": "123"
}
```

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "nonce": "100",
    "expiry": "1566941284",
    "signer": {
      "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      "param": "10000",
      "kind": "0x277f8169"
    },
    "sender": {
      "wallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
      "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
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
      "signer": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "version": "0x45",
      "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
      "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
      "v": "28"
    }
  },
  "id": "123"
}
```

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
    "senderWallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
    "affiliateToken": "0x0000000000000000000000000000000000000000",
    "affiliateParam": "0"
  },
  "id": "123"
}
```

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "nonce": "100",
    "expiry": "1566941284",
    "signer": {
      "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      "param": "10000",
      "kind": "0x277f8169"
    },
    "sender": {
      "wallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
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
      "signer": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "version": "0x45",
      "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
      "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
      "v": "28"
    }
  },
  "id": "123"
}
```

## `provideOrder`

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "method": "provideOrder",
  "params": {
    "nonce": "100",
    "expiry": "1566941284",
    "signer": {
      "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      "param": "10000",
      "kind": "0x277f8169"
    },
    "sender": {
      "wallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
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
      "signer": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "version": "0x45",
      "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
      "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
      "v": "28"
    }
  },
  "id": "123"
}
```

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": "123"
}
```

# Indexer API

The following methods are implemented by the Indexer smart contract.

## `createTokenPairIndex`

**Example Request**

**Example Response**

## `setIntent`

**Example Request**

**Example Response**

## `unsetIntent`

**Example Request**

**Example Response**

## `getIntents`

**Example Request**

**Example Response**

# Message Formats

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
    "wallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
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

# Flat Format

The flat format of an order collapses the tree structure by concatenating each value as a path. For example, `signer.wallet` is represented as `signerWallet`.

```json
{
  "nonce": "1566937684942",
  "expiry": "1566941284",
  "signerWallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
  "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
  "signerParam": "10000",
  "signerKind": "0x277f8169",
  "senderWallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
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

# Orders and Quotes

Orders contain all the parameters listed above. Quotes, on the other hand, do not include the `nonce` or `signature` parameters.
