The AirSwap Protocol uses Order structs to communicate, verify and ultimately perform atomic swaps between parties. All Orders passed to the contracts must be correctly structured, with the right datatypes, otherwise the smart contracts will not accept them. We created a library to help:
- Create Orders
- Generate Order expiries
- Check an Order is structured correctly
- Check a Quote is structured correctly
- Check if the swap contract would accept an Order (e.g. checking balances, approvals etc)

You can find the `orders.js` library on NPM within [@airswap/order-utils](https://www.npmjs.com/package/@airswap/order-utils) or on the [AirSwap GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/orders.js)

Types `Order` and `Party` refer to the structs defined in the [Types](https://docs.airswap.io/contracts/types) contract.

# Functions

## `setVerifyingContract`

Every Order struct has a `.signature.validator` field that specifies the address of the Swap contract that the order is intended for. By executing this function, passing the address of the Swap contract you want to work with, all orders you create using `getOrder` in the library will have the correct validator field. You can check the current value using `_verifyingContract`



```javascript
  setVerifyingContract(verifyingContract) {
    this._verifyingContract = verifyingContract
  }
```

| Param               | Type     | Description                | Example                                        |
| :------------------ | :------- | :------------------------- | :--------------------------------------------- |
| `verifyingContract` | `address`| The swap contract address. | `'0x5fc1d62123558feAbad1B806FDEfeC1dE61162dE'` |

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

| Param     | Type     | Description                       | Example     |
| :-------- | :------- | :-------------------------------- | :---------- |
| `days`    | `number` | The number of days in the future. | `2.2`       |

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

| Param       | Type     | Description                            |
| :---------- | :------- | :------------------------------------- |
| `expiry`    | `integer`| The timestamp of the order expiry.     |
| `nonce`     | `integer`| Unique identifying number of the order.|
| `signer`    | `Party`  | Details of the signer of the order.    |
| `sender`    | `Party`  | Details of the sender of the order.    |
| `affiliate` | `Party`  | Details of the affiliate of the order. |

**Returns** an order struct.

To pass in your own Party values, instead of using a default value, the parameters must be laid out correctly as a json object. E.g.
```javascript
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
      'param' in quote['signer'] &&
      'param' in quote['sender'] &&
      !('signature' in quote)
    )
  }
```

| Param    | Type    | Description                         |
| :------- | :------ | :---------------------------------- |
| `quote`  | `Quote` | The quote struct to be checked.     |

**Returns** `true` if the quote is valid.


## `isValidOrder`

Checks that the json Order provided is structured correctly, and is therefore a valid order.

| Param    | Type    | Description                         |
| :------- | :------ | :---------------------------------- |
| `order`  | `Order` | The order struct to be checked.     |

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
    'param' in order['signer'] &&
    'param' in order['sender'] &&
    'param' in order['affiliate'] &&
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

| Param     | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `order`   | `Order`  | The order struct to be checked.                  |
| `network` | `string` | The Ethereum network. e.g. `mainnet`, `rinkeby`  |

**Returns** an array. Each element is a string specifying an error with the order. A valid order returns an empty array.
e.g. `['Signatory not authorised', 'Signer balance is too low']`
