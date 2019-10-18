Among peers, requests and responses use common terminology to describe the parties and signatures of orders and quotes. When requesting from and responding to peers, those requests with quotes and orders, both the request and response parameters are correlated.

### Nested

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
    "signer": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "version": "0x45",
    "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
    "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
    "v": "28"
  }
}
```

### Flat

The flat form of an order collapses the tree structure by concatenating each value as a path. For example, `maker.wallet` is represented as `makerWallet`.

```json
{
  "nonce": "1566937684942",
  "expiry": "1566941284",
  "makerWallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
  "makerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
  "makerParam": "10000",
  "makerKind": "0x277f8169",
  "takerWallet": "0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6",
  "takerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
  "takerParam": "100000000",
  "takerKind": "0x277f8169",
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
