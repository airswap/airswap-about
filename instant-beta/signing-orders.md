{% hint style="warning" %}
The following specification is in beta on Rinkeby.
{% endhint %}

Ethereum uses [ECDSA](https://hackernoon.com/a-closer-look-at-ethereum-signatures-5784c14abecc) signatures. When generating an AirSwap signature, the order must first be hashed according to [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md), which can be seen in the [Solidity](https://github.com/airswap/airswap-protocols/blob/master/source/types/contracts/Types.sol) and [JavaScript](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/hashes.js) implementations.

Once hashed, one of two signing methods may be used, either `personalSign` or `signTypedData`. AirSwap signatures include a byte `version` to indicate `personalSign` (`0x45`) or `signTypedData` (`0x01`). The primary distinction is that in the former, Ethereum wallets prefix the hash with byte `\x19` to stay out of range of valid RLP so that a signature cannot be executed as a transaction. [EIP-191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md) standardizes this prefixing to include existing `personalSign` behavior and [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) implements it for structured data, which makes the data more transparent for the signer.

# Signature

An AirSwap signature has the following properties.

| Param     | Type      | Description                                                                                                |
| :-------- | :-------- | :--------------------------------------------------------------------------------------------------------- |
| signatory | `address` | Wallet used to generate the signature                                                                      |
| validator | `address` | Swap contract intended for settlement                                                                      |
| version   | `bytes1`  | [EIP-191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md) signature version `0x01` or `0x45` |
| v         | `uint8`   | `v` value of the ECDSA signature                                                                           |
| r         | `bytes32` | `r` value of the ECDSA signature                                                                           |
| s         | `bytes32` | `s` value of the ECDSA signature                                                                           |

Each signature should be included on the order it signs, accessible as `order.signature`, to be settled by invoking `swap(order)` on the Swap contract.

# JavaScript

## Using `personalSign`

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

## Using `signTypedData`

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

# Python

## Using `ecdsa_raw_sign`

Pythong example coming soon.

# EIP712Domain

If you plan to do the EIP-712 hashing manually, use the following values for the EIP712Domain.

| Param             | Type      | Value                                                                             |
| :---------------- | :-------- | :-------------------------------------------------------------------------------- |
| Typehash          | `bytes32` | `keccak256("EIP712Domain(string name,string version,address verifyingContract)")` |
| Name              | `bytes32` | `keccak256("SWAP")`                                                               |
| Version           | `bytes32` | `keccak256("2")`                                                                  |
| verifyingContract | `address` | Swap contract intended for settlement                                             |
