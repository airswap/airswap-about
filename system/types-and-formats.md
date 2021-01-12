See the `@airswap/types` package for [TypeScript](https://github.com/airswap/airswap-protocols/blob/master/source/types/index.ts) and [Solidity](https://github.com/airswap/airswap-protocols/blob/master/source/types/contracts/Types.sol) types.

# Orders

A full order has the following properties:

| Property  | Type        | Description                                                         |
| :-------- | :---------- | :------------------------------------------------------------------ |
| nonce     | `uint256`   | Unique per signer and should be sequential.                         |
| expiry    | `uint256`   | Expiry in seconds since 1 January 1970.                             |
| signer    | `Party`     | Party to the trade that sets and signs terms.                       |
| sender    | `Party`     | Party to the trade that accepts and sends terms.                    |
| affiliate | `Party`     | `optional` Party compensated for facilitating the trade.            |
| signature | `Signature` | Signature of the order, described [here](./generate-signatures.md). |

Each `Party` has the following properties.

| Property | Type      | Description                                                                |
| :------- | :-------- | :------------------------------------------------------------------------- |
| kind     | `bytes4`  | `0x36372b07` (ERC-20), `0x80ac58cd` (ERC-721), or `0xd9b67a26` (ERC-1155). |
| wallet   | `address` | Wallet address of the party.                                               |
| token    | `address` | Contract address of the token.                                             |
| amount   | `uint256` | Amount of the token (ERC-20).                                              |
| id       | `uint256` | ID of the token (ERC-721).                                                 |

These properties correlate to the structs in [Types](../contracts/types.md).

**Example**

```json
{
  "nonce": "100",
  "expiry": "1566941284",
  "signer": {
    "kind": "0x36372b07",
    "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "amount": "10000",
    "id": "0"
  },
  "sender": {
    "kind": "0x36372b07",
    "wallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "amount": "100000000",
    "id": "0"
  },
  "affiliate": {
    "kind": "0x36372b07",
    "wallet": "0x0000000000000000000000000000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "amount": "0",
    "id": "0"
  },
  "signature": {
    "signatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "validator": "0x3E0c31C3D4067Ed5d7d294F08B79B6003B7bf9c8",
    "version": "0x45",
    "v": "28",
    "r": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
    "s": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70"
  }
}
```

## Light Order

A light order (ERC20-only) has the following properties:

| Property     | Type      | Description                                                                      |
| :----------- | :-------- | :------------------------------------------------------------------------------- |
| nonce        | `uint256` | Unique per signer and should be sequential.                                      |
| expiry       | `uint256` | Expiry in seconds since 1 January 1970.                                          |
| signerToken  | `address` | Wallet that sets and signs terms.                                                |
| signerAmount | `uint256` | Amount that the signer will transfer.                                            |
| senderToken  | `address` | Token that the sender will transfer.                                             |
| senderAmount | `uint256` | Amount that the sender will transfer.                                            |
| signature    | `bytes`   | Signature of the order, described [here](./generate-signatures.md#light-orders). |

:bulb: Note: `signerWallet` is derived from the [signature](./generate-signatures.md#light-orders). The `senderWallet` is hashed into the `signature` and checked against `msg.sender` at settlement.

**Example**

```json
{
  "nonce": "100",
  "expiry": "1566941284",
  "signerToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
  "signerAmount": "10000",
  "senderToken": "0xc778417e063141139fce010982780140aa0cd5ab",
  "senderAmount": "100000000",
  "signature": "0x67e0723b0afd357d4f28523bd633dfee16e0eab2f3cbcf8ce1afd32a035d27641b71e6e633b3334fc88faf4ec0ca1b7611883bc0de4df7024abec07af78b97c31c"
}
```

# Quotes

A `Quote` has the following properties:

| Property | Type    | Description                                      |
| :------- | :------ | :----------------------------------------------- |
| signer   | `Party` | Party to the trade that sets and signs terms.    |
| sender   | `Party` | Party to the trade that accepts and sends terms. |

Each `Party` has the following properties.

| Property | Type      | Description                                                                |
| :------- | :-------- | :------------------------------------------------------------------------- |
| kind     | `bytes4`  | `0x36372b07` (ERC-20), `0x80ac58cd` (ERC-721), or `0xd9b67a26` (ERC-1155). |
| token    | `address` | Contract address of the token.                                             |
| amount   | `uint256` | Amount of the token (ERC-20, ERC-1155).                                    |
| id       | `uint256` | ID of the token (ERC-721, ERC-1155).                                       |

**Example**

```json
{
  "signer": {
    "kind": "0x36372b07",
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "amount": "10000",
    "id": "0"
  },
  "sender": {
    "kind": "0x36372b07",
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "amount": "100000000",
    "id": "0"
  }
}
```

# Formatting

Throughout the network, messages passed between peers and smart contracts, including request parameters, order and quote responses, and contract events, are interchangeable between nested and flat formats.

## Nested Format

The nested format makes parameters available by dot syntax. For example, `signer.wallet` to access the signer wallet.

**Example**

```json
{
  "nonce": "100",
  "expiry": "1566941284",
  "signer": {
    "kind": "0x36372b07",
    "wallet": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "token": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
    "amount": "10000",
    "id": "0"
  },
  "sender": {
    "kind": "0x36372b07",
    "wallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
    "token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "amount": "100000000",
    "id": "0"
  },
  "affiliate": {
    "kind": "0x36372b07",
    "wallet": "0x0000000000000000000000000000000000000000",
    "token": "0x0000000000000000000000000000000000000000",
    "amount": "0",
    "id": "0"
  },
  "signature": {
    "signatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
    "validator": "0x3E0c31C3D4067Ed5d7d294F08B79B6003B7bf9c8",
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
  "signerAmount": "10000",
  "signerId": "0",
  "signerKind": "0x36372b07",
  "senderWallet": "0x1FF808E34E4DF60326a3fc4c2b0F80748A3D60c2",
  "senderToken": "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
  "senderAmount": "100000000",
  "senderId": "0",
  "senderKind": "0x36372b07",
  "affiliateWallet": "0x0000000000000000000000000000000000000000",
  "affiliateToken": "0x0000000000000000000000000000000000000000",
  "affiliateAmount": "0",
  "affiliateId": "0",
  "affiliateKind": "0x36372b07",
  "signatureSignatory": "0x6556b252b05ad2ff5435d04a812b77875fa2bdbe",
  "signatureValidator": "0x3E0c31C3D4067Ed5d7d294F08B79B6003B7bf9c8",
  "signatureVersion": "0x45",
  "signatureR": "0x589bb063fc85f49ad096ec9513c45b3e93f5a2da4efe0706db9a2b755121f4c2",
  "signatureS": "0x73075fbae37e5a4954a6e57e0c056d130b582ce390b56fd69f0bb2e103d07e70",
  "signatureV": "28"
}
```
