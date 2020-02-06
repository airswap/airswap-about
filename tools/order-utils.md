Order Utils is a JavaScript package used for generating, hashing, and signing AirSwap orders. Check out the [source code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/utils/order-utils).

# Orders and Quotes

The AirSwap Protocol uses Order structs to communicate, verify and ultimately perform atomic swaps between parties. All Orders passed to the contracts must be correctly structured, with the right datatypes, otherwise the smart contracts will not accept them. We created a library to help:

- Create Orders
- Generate Order expiries
- Check an Order is structured correctly
- Check a Quote is structured correctly
- Check if the swap contract would accept an Order (e.g. checking balances, approvals etc)

You can find the `orders.js` library on NPM within [@airswap/order-utils](https://www.npmjs.com/package/@airswap/order-utils) or on the [AirSwap GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/orders.js)

Types `Order`, `Quote`, and `Party` refer to the structs defined in the [Types](../reference/types) contract.

## `setVerifyingContract`

Every Order struct has a `.signature.validator` field that specifies the address of the Swap contract that the order is intended for. By executing this function, passing the address of the Swap contract you want to work with, all orders you create using `getOrder` in the library will have the correct validator field. You can check the current value using `_verifyingContract`

```javascript
  setVerifyingContract(verifyingContract) {
    this._verifyingContract = verifyingContract
  }
```

| Param               | Type      | Description                | Example                                        |
| :------------------ | :-------- | :------------------------- | :--------------------------------------------- |
| `verifyingContract` | `address` | The swap contract address. | `'0x3E0c31C3D4067Ed5d7d294F08B79B6003B7bf9c8'` |

## `generateNonce`

Starting from 100, this function merely increments the nonce by 1 and outputs the new number each time it's called. The Swap contract only accepts each nonce from each Ethereum address once, so this function is used to ensure each Order has a unique nonce. If you create orders using the function `getOrder` you do not need to use this function - `getOrder` executes `generateNonce` itself to fetch a new unique nonce for each new order.

```javascript
  generateNonce() {
    nonce = nonce + 1
    return nonce.toString()
  }
```

**Returns** a nonce.

## `generateExpiry`

Generates a timestamp expiry for exactly n days in the future.

```javascript
  async generateExpiry(days) {
    return (await getLatestTimestamp()) + SECONDS_IN_DAY * days
  }
```

| Param  | Type     | Description                       | Example |
| :----- | :------- | :-------------------------------- | :------ |
| `days` | `number` | The number of days in the future. | `2.2`   |

**Returns** an expiry timestamp.

## `getOrder`

Generates a new order

```javascript
  async getOrder({
    expiry = '0',
    nonce = this.generateNonce(),
    signer = defaults.Party,
    sender = defaults.Party,
    affiliate = defaults.Party,
  }) {
    if (expiry === '0') {
      expiry = await this.generateExpiry(1)
    }
    return lowerCaseAddresses({
      expiry: String(expiry),
      nonce: String(nonce),
      signer: { ...defaults.Party, ...signer },
      sender: { ...defaults.Party, ...sender },
      affiliate: { ...defaults.Party, ...affiliate },
      signature: signatures.getEmptySignature(this._verifyingContract),
    })
  }
```

All parameters are _optional_, and unprovided parameters default to the values specified in the function defintion above.

| Param       | Type      | Description                             |
| :---------- | :-------- | :-------------------------------------- |
| `expiry`    | `integer` | The timestamp of the order expiry.      |
| `nonce`     | `integer` | Unique identifying number of the order. |
| `signer`    | `Party`   | Details of the signer of the order.     |
| `sender`    | `Party`   | Details of the sender of the order.     |
| `affiliate` | `Party`   | Details of the affiliate of the order.  |

**Returns** an order struct.

To pass in your own Party values, instead of using a default value, the parameters must be laid out correctly as a json object. E.g.

```javascript
const order = await orders.getOrder({
  signer: {
    wallet: ganacheWallet,
    token: ASTAddress,
    amount: '400',
  },
  sender: {
    wallet: senderWallet,
    token: WETHAddress,
    amount: '2',
  },
})
```

## `isValidQuote`

Checks that the json Quote provided is structured correctly, and is therefore a valid quote.

```javascript
  isValidQuote(quote) {
    return (
      'signer' in quote &&
      'sender' in quote &&
      'token' in quote['signer'] &&
      'token' in quote['sender'] &&
      'amount' in quote['signer'] &&
      'amount' in quote['sender'] &&
      'id' in quote['signer'] &&
      'id' in quote['sender'] &&
      !('signature' in quote)
    )
  }
```

| Param   | Type    | Description                     |
| :------ | :------ | :------------------------------ |
| `quote` | `Quote` | The quote struct to be checked. |

**Returns** `true` if the quote is valid.

## `isValidOrder`

Checks that the json Order provided is structured correctly, and is therefore a valid order.

| Param   | Type    | Description                     |
| :------ | :------ | :------------------------------ |
| `order` | `Order` | The order struct to be checked. |

**Returns** `true` if the order is valid.

```javascript
const isValidOrder = order => {
  return (
    'nonce' in order &&
    'expiry' in order &&
    'signer' in order &&
    'sender' in order &&
    'affiliate' in order &&
    'signature' in order &&
    'wallet' in order['signer'] &&
    'wallet' in order['sender'] &&
    'wallet' in order['affiliate'] &&
    'token' in order['signer'] &&
    'token' in order['sender'] &&
    'token' in order['affiliate'] &&
    'amount' in order['signer'] &&
    'amount' in order['sender'] &&
    'amount' in order['affiliate'] &&
    'id' in order['signer'] &&
    'id' in order['sender'] &&
    'id' in order['affiliate'] &&
    'signatory' in order['signature'] &&
    'validator' in order['signature'] &&
    'r' in order['signature'] &&
    's' in order['signature'] &&
    'v' in order['signature']
  )
}
```

## `checkOrder`

Checks whether the swap contract would accept or reject a specified order. This includes checking wallet balances, approvals, authorizations, signatures, expiry and nonces,

| Param     | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `order`   | `Order`  | The order struct to be checked.                 |
| `network` | `string` | The Ethereum network. e.g. `mainnet`, `rinkeby` |

**Returns** an array. Each element is a string specifying an error with the order. A valid order returns an empty array.
e.g. `['Signatory not authorised', 'Signer balance is too low']`

# Signatures

Orders submitted to the swap contract contain a signature field that usually must be filled with a signature of the order, signed by the `order.signer.wallet`. To prevent replay attacks across different contracts, we include a hashed `domain` in our signatures, that specifies the details of the swap contract it is intended to be used on. Due to this added complexity, we have created a library of helper signature functions to do all this for you.

The Swap contract accepts 2 types of signatures: those prefixed with the Ethereum signature header and those without. The signature type is specified usign an `order.signature.version` of `0x01` (no header) or `0x45` (header). Our library provides signature functions for both of these options.

You can find the `signatures.js` library on NPM within [@airswap/order-utils](https://www.npmjs.com/package/@airswap/order-utils) or on the [AirSwap GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/signatures.js)

Types `Order` and `Party` refer to the structs defined in the [Types](../reference/types) contract.

The functions below sign all of the fields of an order except the signature field. The functions then return a signature object that is formatted correctly for the swap contract. This signature needs to be combined into the order object before it can then be passed into the swap contract to be executed.

```javascript
// Get an order object using the `orders.js` library
const order = await orders.getOrder({
  signer: {
    wallet: ganacheWallet,
    token: ASTAddress,
    amount: '400',
  },
  sender: {
    wallet: senderWallet,
    token: WETHAddress,
    amount: '2',
  },
})

// Now sign the order.
// Notice that the function response is assigned as the order's signature
order.signature = await signatures.getWeb3Signature(order, ganacheWallet, swapContractAddress, 'http://127.0.0.1:8545')
```

## `getWeb3Signature`

Uses a web3 provider to sign an order. This means no private key or seed phrase is required to be passed into the function (just the address), as the provider deals with that for you.

This creates a signature with version 0x45.

| Param               | Type      | Description                   |
| :------------------ | :-------- | :---------------------------- |
| `order`             | `Order`   | The order to be signed.       |
| `signatory`         | `address` | The wallet to sign the order. |
| `verifyingContract` | `address` | The swap contract address.    |
| `provider`          | `string`  | The web3 provider to use.     |

**Returns** an order signature.

## `getPrivateKeySignature`

Uses a private key to sign the order.

This creates a signature with version 0x01.

| Param               | Type      | Description                   |
| :------------------ | :-------- | :---------------------------- |
| `order`             | `Order`   | The order to be signed.       |
| `privateKey`        | `Buffer`  | The private key to sign with. |
| `verifyingContract` | `address` | The swap contract address.    |

**Returns** an order signature.

Note: To get your string private key into the correct form use:

```javascript
const privateKeyBuffer = Buffer.from(privateKeyString, 'hex')
```

## `getPersonalSignature`

Uses a private key to sign the order.

This creates a signature with version 0x45.

| Param               | Type      | Description                   |
| :------------------ | :-------- | :---------------------------- |
| `order`             | `Order`   | The order to be signed.       |
| `privateKey`        | `Buffer`  | The private key to sign with. |
| `verifyingContract` | `address` | The swap contract address.    |

**Returns** an order signature.

Note: To get your string private key into the correct form use:

```javascript
const privateKeyBuffer = Buffer.from(privateKeyString, 'hex')
```

## `getTypedDataSignature`

Uses a private key to sign the order.

This creates a signature with version 0x01.

| Param               | Type      | Description                   |
| :------------------ | :-------- | :---------------------------- |
| `order`             | `Order`   | The order to be signed.       |
| `privateKey`        | `Buffer`  | The private key to sign with. |
| `verifyingContract` | `address` | The swap contract address.    |

**Returns** an order signature.

Note: To get your string private key into the correct form use:

```javascript
const privateKeyBuffer = Buffer.from(privateKeyString, 'hex')
```

## `getEmptySignature`

Returns a signature struct with all values as empty values, except the signature validator which still takes the value of the swap contract address. The Swap contract allows `signerAuthorizations`, whereby the order signer no longer has to have signed the order. Instead users can authorize another address to send in orders on their behalf without a signature. This function can be used to create that empty signature field.

| Param               | Type      | Description                |
| :------------------ | :-------- | :------------------------- |
| `verifyingContract` | `address` | The swap contract address. |

## `isSignatureValid`

Checks whether a signature is a valid signature of a given order. This includes verifying that the key that signed the order is the same as the one named in the order.

| Param   | Type    | Description                      |
| :------ | :------ | :------------------------------- |
| `order` | `Order` | The order including a signature. |

**Returns** `true` if the signature is valid

# Hashing Orders

When an order is submitted to the Swap contract, a signature of the order is provided with it, which gives security to the signer that the sender of the order cannot modify the order's contents. This signature is constructed by calculating the hash of the order, before signing this hash. Due to the use of sub-objects in an order, there are many different ways of hashing an order - however the smart contract only accepts one. This helper library provides functions to calculate hashes used throughout the protocol.

You can find the `hashes.js` library on NPM within [@airswap/order-utils](https://www.npmjs.com/package/@airswap/order-utils) or on the [AirSwap GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/hashes.js)

Types `Order` and `Party` refer to the structs defined in the [Types](../reference/types) contract.

## `getOrderHash`

Calculates the hash of an order, ignoring any signature fields that are passed to it. This order hash includes the hashing of the `domain` of the order (the smart contract it is to be submitted to), to prevent double spend attacks. This function is executed within the signature functions described in [Signing Orders](signing-orders.md), and therefore if you use those signature functions you do not need to calculate the order hash beforehand.

| Param               | Type      | Description                |
| :------------------ | :-------- | :------------------------- |
| `order`             | `Order`   | The order to be hashed.    |
| `verifyingContract` | `address` | The swap contract address. |

**Returns** the complete hash of an order, including relevant domain information.

## `hashParty`

Calculates the hash of a Party struct. This function is executed within `hashOrder` to hash each Party before hashing the entire order.

| Param   | Type    | Description             |
| :------ | :------ | :---------------------- |
| `party` | `Party` | The party to be hashed. |

**Returns** the party hash.

## `hashDomain`

Calculates the hash of a contract's `domain`. The domain is defined by the domain name (`SWAP`), the domain version (currently `2`), and the specific swap contract's address. This is used to prevent double spend attacks.`hashDomain` is executed within `getOrderHash`.

| Param               | Type      | Description                |
| :------------------ | :-------- | :------------------------- |
| `verifyingContract` | `address` | The swap contract address. |

**Returns** the domain hash.

## `hashOrder`

Calculates the hash of an order, ignoring any signature fields that are passed to it. Unlike `getOrderHash`, this function does not include the `domain` of the order, and is merely used to hash the fields of an order. `hashOrder` is executed within `getOrderHash`.

| Param   | Type    | Description             |
| :------ | :------ | :---------------------- |
| `order` | `Order` | The order to be hashed. |

**Returns** the order hash.
