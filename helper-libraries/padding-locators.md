When Ethereum addresses are used as the locator for an entry on the Indexer, the locator must be stored as a bytes32 not an address to be consistent with the other types of locators. `padding.js` provides a function to pad addresses into a bytes32 format.

You can find the `padding.js` library on NPM within [@airswap/test-utils](https://www.npmjs.com/package/@airswap/test-utils) or on the [Airswap GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/test-utils/src/padding.js)

# Functions

## `padAddressToLocator`

Pads a given Ethereum address into a bytes32 to be used as a locator on the Indexer. Ethereum addresses are 190 bits and a bytes32 is 256 bits.

| Param      | Type       | Description                                 |
| :--------- | :--------- | :------------------------------------------ |
| `address`  | `address`  | The address to be padded to a bytes32.      | 

**Returns** the address right padded with 66 0s.
