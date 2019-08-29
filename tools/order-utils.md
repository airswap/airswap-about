# Order Utils

# Notes on Signatures

When producing [ECDSA](https://hackernoon.com/a-closer-look-at-ethereum-signatures-5784c14abecc) signatures, Ethereum wallets prefix signed data with byte `\x19` to stay out of range of valid RLP so that a signature cannot be executed as a transaction. [EIP-191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md) standardizes this prefixing to include existing `personalSign` behavior and [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) implements it for structured data, which makes the data more transparent for the signer. Signatures are comprised of parameters `v`, `r`, and `s`. Read more about [Ethereum Signatures](https://hackernoon.com/a-closer-look-at-ethereum-signatures-5784c14abecc).

The `Signature` struct includes a byte `version` to indicate `personalSign` (`0x45`) or `signTypedData` (`0x01`) so that hashes can be recreated correctly in contract code.

## Personal Sign

You can use `personalSign` with `swap` by using an EIP-712 hashing function.

```JavaScript
const ethUtil = require('ethereumjs-util')
const { hashes } = require('@airswap/order-utils')
const orderHashHex = hashes.getOrderHash(order); // See: @airswap/order-utils/src/hashes.js:60
const sig = await web3.eth.sign(orderHashHex, signer);
const { r, s, v } = ethUtil.fromRpcSig(sig);
return {
  version: '0x45', // Version 0x45: personalSign
  r, s, v
}
```

## Sign Typed Data

You can use `signTypedData` with `swap` by calling it directly. Read more about [EIP-712](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26).

```JavaScript
const ethUtil = require('ethereumjs-util')
const sigUtil = require('eth-sig-util')
const DOMAIN_NAME = 'SWAP'
const DOMAIN_VERSION = '2'
const verifyingContract = '0x0...' // Address of the Swap Contract
const sig = sigUtil.signTypedData(privateKey, {
  data: {
    types, // See: @airswap/order-utils/src/constants.js:4
    domain: {
      name: DOMAIN_NAME,
      version: DOMAIN_VERSION,
      verifyingContract,
    },
    primaryType: 'Order',
    message: order, // See: @airswap/order-utils/src/orders.js:28
  },
});
const { r, s, v } = ethUtil.fromRpcSig(sig)
return {
  version: '0x01', // Version 0x01: signTypedData
  r, s, v
}
```
