Testing contracts where time is a critical component can be difficult. We use a suite of functions that work with ganache to:
- query block time
- increase blockchain time
- increase block numbers
- revert blockchain state to a previous snapshot

The majority of the functions we use for this are from the npm package `ganache-time-traveler`, which was developed by one of AirSwap's developers. We combined this with a couple of web3 time-based functions to create a helper library.

You can find the `time.js` library on NPM within [@airswap/test-utils](https://www.npmjs.com/package/@airswap/test-utils) or on the [AirSwap GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/test-utils/src/time.js)

# Functions

For documentation of the following 6 functions, view `ganache-time-traveller` on [NPM](https://www.npmjs.com/package/ganache-time-traveler) or [GitHub](https://github.com/ejwessel/GanacheTimeTraveler/).
### `advanceTime`
### `advanceBlock`
### `advanceBlockAndSetTime`
### `advanceTimeAndBlock`
### `takeSnapshot`
### `revertToSnapshot`

These 6 functions are all available within AirSwap's `time.js` library along with the following 2 functions:

## `getLatestTimestamp`

**Returns** the latest block timestamp.

## `getTimestampPlusDays`

| Param   | Type         | Description                                     |
| :------ | :----------- | :---------------------------------------------- |
| `days`  | `number`     | The number of days to add to the current time.  | 

**Returns** the timestamp that is `days` number of days in the future. **Note** this does not increase the blockchain to this time, it merely returns the timestamp of that time.
