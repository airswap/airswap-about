Each swap is between at least two parties, a `signer` and a `sender`. The `signer` is the party that creates and cryptographically signs an order, and `sender` is the party that sends the order to Ethereum for settlement.

**Authorizations** are for parties that trade on behalf of others. These parties are authorized by an individual to send or sign orders for them. Parties can be wallets (people or programs) or smart contracts.

**Affiliates** are third-parties compensated for their part in bringing together the two parties of a trade, and can be other traders or software applications that connect traders on the network.

# Creating Orders

An AirSwap `Order` has the following properties.

| Param     | Type        | Description                                   |
| :-------- | :---------- | :-------------------------------------------- |
| nonce     | `uint256`   | Unique per signer and should be sequential    |
| expiry    | `uint256`   | Expiry in seconds since 1 January 1970        |
| signer    | `Party`     | Party to the trade that sets terms            |
| sender    | `Party`     | Party to the trade that accepts terms         |
| affiliate | `Party`     | Party compensated for facilitating (optional) |
| signature | `Signature` | Signature of the order, described below       |

Each `Party` has the following properties.

| Param  | Type      | Description                                     |
| :----- | :-------- | :---------------------------------------------- |
| kind   | `bytes4`  | `0x277f8169` (ERC-20) or `0x80ac58cd` (ERC-721) |
| wallet | `address` | Wallet address of the party                     |
| token  | `address` | Contract address of the token                   |
| param  | `uint256` | Amount (ERC-20) or ID (ERC-721)                 |

These values correlate to the structs in [Types](../contracts/types.md).

## Example

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

The `@airswap/order-utils` package includes an `orders.getOrder` function that can be used to create new orders with correct default values.

# Generating Signatures

Ethereum uses [ECDSA](https://hackernoon.com/a-closer-look-at-ethereum-signatures-5784c14abecc) signatures. To generate a signature for an AirSwap order, the order must first be hashed according to [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md), which can be seen in the [Solidity](https://github.com/airswap/airswap-protocols/blob/master/source/types/contracts/Types.sol) and [JavaScript](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/hashes.js) implementations.

Once hashed, one of two signing methods may be used, either `personalSign` or `signTypedData`. AirSwap signatures include a byte `version` to indicate `personalSign` (`0x45`) or `signTypedData` (`0x01`). The primary distinction is that in the former, Ethereum wallets prefix the hash with byte `\x19` to stay out of range of valid RLP so that a signature cannot be executed as a transaction.

An AirSwap signature has the following properties.

| Param     | Type      | Description                                                                                                |
| :-------- | :-------- | :--------------------------------------------------------------------------------------------------------- |
| signatory | `address` | Wallet used to generate the signature                                                                      |
| validator | `address` | Swap contract address to be used for settlement                                                            |
| version   | `bytes1`  | [EIP-191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md) signature version `0x01` or `0x45` |
| v         | `uint8`   | `v` value of the ECDSA signature                                                                           |
| r         | `bytes32` | `r` value of the ECDSA signature                                                                           |
| s         | `bytes32` | `s` value of the ECDSA signature                                                                           |

Each signature should be included on its order, accessible as `order.signature`, to be settled by invoking `swap(order)` on the Swap contract.

## JavaScript

### Using `personalSign`

You can use `personalSign` with the hashing function in the `@airswap/order-utils` package.

```javascript
const ethUtil = require('ethereumjs-util')
const { hashes } = require('@airswap/order-utils')
const orderHashHex = hashes.getOrderHash(order)
const sig = await web3.eth.sign(orderHashHex, signer)
const { v, r, s } = ethUtil.fromRpcSig(sig)
return {
  version: '0x45',
  v,
  r,
  s,
}
```

### Using `signTypedData`

You can use `signTypedData` by calling it directly.

```javascript
const ethUtil = require('ethereumjs-util')
const sigUtil = require('eth-sig-util')
const DOMAIN_NAME = 'SWAP'
const DOMAIN_VERSION = '2'
const verifyingContract = '0x0...' // Address of the Swap Contract
const sig = sigUtil.signTypedData(privateKey, {
  data: {
    types, // See: @airswap/order-utils/src/constants.js
    domain: {
      name: DOMAIN_NAME,
      version: DOMAIN_VERSION,
      verifyingContract,
    },
    primaryType: 'Order',
    message: order, // See: @airswap/order-utils/src/orders.js
  },
})
const { r, s, v } = ethUtil.fromRpcSig(sig)
return {
  version: '0x01', // Version 0x01: signTypedData
  r,
  s,
  v,
}
```

## Python

### Using `ecdsa_raw_sign`

Python example coming soon.

## EIP712Domain

If you plan to use `signTypedData` or do the EIP-712 hashing manually, use the following values for the EIP712Domain. The typehash, name, and version must be hashed to bytes32 using keccak256.

| Param             | Type      | Value                                                              |
| :---------------- | :-------- | :----------------------------------------------------------------- |
| Typehash          | `bytes32` | EIP712Domain(string name,string version,address verifyingContract) |
| Name              | `bytes32` | SWAP                                                               |
| Version           | `bytes32` | 2                                                                  |
| verifyingContract | `address` | Swap contract address to be used for settlement                    |

# Quotes versus Orders

Quotes are simple structures that only include the `token`, `param`, and `kind` fields for `signer` and `sender`. The `kind` is the token interface identifier `0x277f8169` (ERC-20) or `0x80ac58cd` (ERC-721). The `param` is the number of ERC-20 tokens being transferred, or the ID of the ERC-721 being transferred.

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

# Representation Formats

Throughout the network, messages passed between peers and smart contracts, including request parameters, order and quote responses, and contract events, are interchangeable between nested and flat formats.

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
