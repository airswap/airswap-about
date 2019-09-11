# `getMakerSideQuote`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getMakerSideQuote",
  "params": {
    "takerParam": "100000000",
    "takerToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "makerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
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
    "maker":
      "param": "100000000"
    }
  },
  "id": "123"
}
```

# `getTakerSideQuote`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getMakerSideQuote",
  "params": {
    "makerParam": "100000000",
    "makerToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "takerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
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
    "taker":
      "param": "100000000"
    }
  },
  "id": "123"
}
```

# `getMaxQuote`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getMaxQuote",
  "params": {
    "makerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "takerToken": "0xc778417e063141139fce010982780140aa0cd5ab"
  },
  "id": "123"
}
```

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "maker": {
      "param": "100000000"
    },
    "taker": {
      "param": "100000000"
    }
  },
  "id": "123"
}
```

# `getMakerSideOrder`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getMakerSideOrder",
  "params": {
    "makerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "takerToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "takerParam": "100000000",
    "takerWallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
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
    "maker": {
      "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      "param": "10000",
      "kind": "0x277f8169"
    },
    "taker": {
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

# `getTakerSideOrder`

**Example Request**

```json
{
  "jsonrpc": "2.0",
  "method": "getTakerSideOrder",
  "params": {
    "makerParam": "10000",
    "makerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "takerToken": "0xc778417e063141139fce010982780140aa0cd5ab",
    "takerWallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
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
    "maker": {
      "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      "param": "10000",
      "kind": "0x277f8169"
    },
    "taker": {
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

# `provideOrder`

**Example Response**

```json
{
  "jsonrpc": "2.0",
  "method": "provideOrder",
  "params": {
    "nonce": "100",
    "expiry": "1566941284",
    "maker": {
      "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
      "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      "param": "10000",
      "kind": "0x277f8169"
    },
    "taker": {
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
