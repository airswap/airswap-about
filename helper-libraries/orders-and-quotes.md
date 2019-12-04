The Airswap Protocol uses Order structs to communicate, verify and ultimately perform atomic swaps between parties. All Orders passed to the contracts must be correctly structured, with the right datatypes, otherwise the smart contracts will not accept them. We created a library to help:
- Create Orders
- Generate Order expiries
- Check an Order is structured correctly
- Check a Quote is structured correctly
- Check if the swap contract would accept an Order (e.g. checking balances, approvals etc)

You can find the library, `orders.js`:
- [NPM package @airswap/order-utils](https://www.npmjs.com/package/@airswap/order-utils)
- [GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/orders.js)

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
| `verifyingContract` | `string` | The swap contract address. | `'0x5fc1d62123558feAbad1B806FDEfeC1dE61162dE'` |

## `generateNonce`

Starting from 100, this function merely increments the nonce by 1 and outputs the new number each time it's called. The Swap contract only accepts each nonce from each Ethereum address once, so this function is used to ensure each Order has a unique nonce. If you create orders using the function `getOrder` you do not need to use this function - `getOrder` executes `generateNonce` itself to fetch a new unique nonce for each new order.

```javascript
  generateNonce() {
    nonce = nonce + 1
    return nonce.toString()
  }
```

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

Where a Party is a json struct defined in [Types](https://docs.airswap.io/contracts/types).
