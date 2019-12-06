When an order is submitted to the Swap contract, a signature of the order is provided with it, which gives security to the signer that the sender of the order cannot modify the order's contents.. This signature is constructed by calculating the hash of the order, before signing this hash. Due to the use of sub-objects in an order, there are many different ways of hashing an order - however the smart contract only accepts one. This helper library provides functions to calculate hashes used in various parts of the Airswap Protocol.

You can find the `hashes.js` library on NPM within [@airswap/order-utils](https://www.npmjs.com/package/@airswap/order-utils) or on the [Airswap GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/order-utils/src/hashes.js)

Types `Order` and `Party` refer to the structs defined in the [Types](https://docs.airswap.io/contracts/types) contract.

# Functions

## `getOrderHash`

Calculates the hash of an order, ignoring any signature fields that are passed to it. This order hash includes the hashing of the `domain` of the order (the smart contract it is to be submitted to), to prevent double spend attacks. This function is executed within the signature functions described in `Signing Orders`, and therefore if you use those signature functions you do not need to calculate the order hash beforehand.

| Param               | Type     | Description                   |
| :------------------ | :------- | :---------------------------- |
| `order`             | `Order`  | The order to be hashed.       | 
| `verifyingContract` | `address`| The swap contract address.    |

**Returns** the complete hash of an order, including relevant domain information.

## `hashParty`

Calculates the hash of a Party struct. This function is executed within `hashOrder` to hash each Party before hashing the entire order.

| Param               | Type     | Description                   |
| :------------------ | :------- | :---------------------------- |
| `party`             | `Party`  | The party to be hashed.       | 

**Returns** the party hash.

## `hashDomain`

Calculates the hash of a contract's `domain`. The domain is defined by the domain name (`SWAP`), the domain version (currently `2`), and the specific swap contract's address. This is used to prevent double spend attacks.`hashDomain` is executed within `getOrderHash`.

| Param               | Type     | Description                   |
| :------------------ | :------- | :---------------------------- |
| `verifyingContract` | `address`| The swap contract address.    |

**Returns** the domain hash.

## `hashOrder`

Calculates the hash of an order, ignoring any signature fields that are passed to it. Unlike `getOrderHash`, this function does not include the `domain` of the order, and is merely used to hash the fields of an order. `hashOrder` is executed within `getOrderHash`.

| Param               | Type     | Description                   |
| :------------------ | :------- | :---------------------------- |
| `order`             | `Order`  | The order to be hashed.       | 

**Returns** the order hash.
