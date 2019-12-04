Orders submitted to the swap contract contain a signature field that usually must be filled with a signature of the order, signed by the `order.signer.wallet`. To prevent replay attacks across different contracts, we include a hashed `domain` in our signatures, that specifies the details of the swap contract it is intended to be used on. Due to this added complexity, we have created a library of helper signature functions to do all this for you.

The Swap contract accepts 2 types of signatures: those prefixed with the Ethereum signature header and those without. The signature type is specified usign an `order.signature.version` of `0x01` (no header) or `0x45` (header). Our library provides signature functions for both of these options.

You can find the `signatures.js` library on NPM within [@airswap/order-utils](https://www.npmjs.com/package/@airswap/order-utils) or on the [Airswap GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/signatures.js)

# Functions

The functions below sign all of the fields of an order except the signature field. The functions then return a signature object that is formatted correctly for the swap contract. This signature needs to be combined into the order object before it can then be passed into the swap contract to be executed.

```javascript
// Get an order object using the `orders.js` library
const order = await orders.getOrder({
  signer: {
    wallet: ganacheWallet,
    token: ASTAddress,
    param: '400',
  },
  sender: {
    wallet: senderWallet,
    token: WETHAddress,
    param: '2',
  },
})

// Now sign the order.
// Notice that the function response is assigned as the order's signature
order.signature = await signatures.getWeb3Signature(
  order,
  ganacheWallet,
  swapContractAddress,
  'http://127.0.0.1:8545'
)
```

## `getWeb3Signature`

Uses a web3 provider to sign an order. This means no private key or seed phrase is required to be passed into the function (just the address), as the provider deals with that for you.

This creates a signature with version 0x45.

| Param               | Type     | Description                   |
| :------------------ | :------- | :---------------------------- |
| `order`             | `Order`  | The order to be signed.       | 
| `signatory`         | `address`| The wallet to sign the order. |
| `verifyingContract` | `address`| The swap contract address.    |
| `provider`          | `string` | The web3 provider to use.     |

**Returns** an order signature.

## `getPrivateKeySignature`

Uses a private key to sign the order.

This creates a signature with version 0x01.

| Param               | Type     | Description                   |
| :------------------ | :------- | :---------------------------- |
| `order`             | `Order`  | The order to be signed.       | 
| `privateKey`        | `Buffer` | The private key to sign with. |
| `verifyingContract` | `address`| The swap contract address.    |

**Returns** an order signature.

Note: To get your string private key into the correct form use:
```javascript
const privateKeyBuffer = Buffer.from(
  privateKeyString,
  'hex'
)
```

## `getPersonalSignature`

Uses a private key to sign the order.

This creates a signature with version 0x45.

| Param               | Type     | Description                   |
| :------------------ | :------- | :---------------------------- |
| `order`             | `Order`  | The order to be signed.       | 
| `privateKey`        | `Buffer` | The private key to sign with. |
| `verifyingContract` | `address`| The swap contract address.    |

**Returns** an order signature.

Note: To get your string private key into the correct form use:
```javascript
const privateKeyBuffer = Buffer.from(
  privateKeyString,
  'hex'
)
```

## `getTypedDataSignature`

Uses a private key to sign the order.

This creates a signature with version 0x01.

| Param               | Type     | Description                   |
| :------------------ | :------- | :---------------------------- |
| `order`             | `Order`  | The order to be signed.       | 
| `privateKey`        | `Buffer` | The private key to sign with. |
| `verifyingContract` | `address`| The swap contract address.    |

**Returns** an order signature.

Note: To get your string private key into the correct form use:
```javascript
const privateKeyBuffer = Buffer.from(
  privateKeyString,
  'hex'
)
```

## `getEmptySignature`

Returns a signature struct with all values as empty values, except the signature validator which still takes the value of the swap contract address. The Swap contract allows `signerAuthorizations`, whereby the order signer no longer has to have signed the order. Instead users can authorize another address to send in orders on their behalf without a signature. This function can be used to create that empty signature field.

| Param               | Type     | Description                   |
| :------------------ | :------- | :---------------------------- |
| `verifyingContract` | `address`| The swap contract address.    |


## `isSignatureValid`

Checks whether a signature is a valid signature of a given order. This includes verifying that the key that signed the order is the same as the one named in the order.

| Param               | Type     | Description                       |
| :------------------ | :------- | :-------------------------------- |
| `order`             | `Order`  | The order including a signature.  | 

**Returns** `true` if the signature is valid