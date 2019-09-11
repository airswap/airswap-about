Indexers are for peer discovery. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/swap).

# Deployments

| Version | Application         | Network | Address                                                                                                                         |
| :------ | :------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------ |
| `2.1.0` | Instant (HTTP)      | Mainnet | [`0x251F752B85a9F7e1B3C42D802715B5D7A8Da3165`](https://etherscan.io/address/0x251F752B85a9F7e1B3C42D802715B5D7A8Da3165)         |
| `2.1.0` | Instant (Delegates) | Mainnet | [`0x251F752B85a9F7e1B3C42D802715B5D7A8Da3165`](https://etherscan.io/address/0x251F752B85a9F7e1B3C42D802715B5D7A8Da3165)         |
| `2.1.0` | Instant (HTTP)      | Rinkeby | [`0x6f337bA064b0a92538a4AfdCF0e60F50eEAe0D5B`](https://rinkeby.etherscan.io/address/0x6f337bA064b0a92538a4AfdCF0e60F50eEAe0D5B) |

# Constructor

Create a new `Indexer` contract.

```js
constructor(
  address _stakeToken
  address _locatorWhitelist
) public
```

| Param               | Type      | Description                                        |
| :------------------ | :-------- | :------------------------------------------------- |
| `_stakeToken`       | `address` | Address of the token required for staking.         |
| `_locatorWhitelist` | `address` | Address of an optional locator whitelist contract. |

# Create an Index

If none exists, deploy a new `Index` contract for the given token pair and return the address of the new or existing INDEX. For example, an intent to trade WETH/DAI.

```text
function createIndex(
  address _makerToken,
  address _takerToken
) public returns (address)
```

| Param         | Type      | Description                                |
| :------------ | :-------- | :----------------------------------------- |
| `_makerToken` | `address` | Address of the token that the Maker sends. |
| `_takerToken` | `address` | Address of the token that the Taker sends. |

# Add to Blacklist

Add a token to the blacklist. Indexes that include the blacklisted token will be ignored. Emits an `AddToBlacklist` event.

```text
function addToBlacklist(
  address _token
) external onlyOwner
```

| Param    | Type      | Description                        |
| :------- | :-------- | :--------------------------------- |
| `_token` | `address` | Address of the token to blacklist. |

# Remove from Blacklist

Remove a token from the blacklist. Emits a `RemoveFromBlacklist` event.

```text
function removeFromBlacklist(
  address _token
) external onlyOwner
```

| Param    | Type      | Description                         |
| :------- | :-------- | :---------------------------------- |
| `_token` | `address` | The address of the token to remove. |

# Set an Intent

Stake tokens to the Indexer and set an intent to trade.

```text
function setIntent(
  address _makerToken,
  address _takerToken,
  uint256 _amount,
  uint256 _expiry,
  bytes32 _locator
) public
```

| Param         | Type      | Description                                             |
| :------------ | :-------- | :------------------------------------------------------ |
| `_makerToken` | `address` | Address of the token that the Maker sends.              |
| `_takerToken` | `address` | Address of the token that the Taker sends.              |
| `_amount`     | `uint256` | Amount of token to stake.                               |
| `_expiry`     | `uint256` | Timestamp after which the intent is invalid.            |
| `_locator`    | `bytes32` | Arbitrary data. Often an address in the first 20 bytes. |

| Revert Reason          | Scenario                                   |
| :--------------------- | :----------------------------------------- |
| `INDEX_IS_BLACKLISTED` | One or both of the tokens are blacklisted. |
| `INDEX_DOES_NOT_EXIST` | There is no index for the token pair.      |
| `MINIMUM_NOT_MET`      | The staking amount is insufficient.        |
| `UNABLE_TO_STAKE`      | The staking amount was not transferred.    |

# Unset an Intent

Unset an intent to trade and return staked tokens to the sender.

```text
function unsetIntent(
  address _makerToken,
  address _takerToken
) public
```

| Param         | Type      | Description                                |
| :------------ | :-------- | :----------------------------------------- |
| `_makerToken` | `address` | Address of the token that the Maker sends. |
| `_takerToken` | `address` | Address of the token that the Taker sends. |

| Revert Reason          | Scenario                                   |
| :--------------------- | :----------------------------------------- |
| `TOKEN_IS_BLACKLISTED` | One or both of the tokens are blacklisted. |
| `INDEX_DOES_NOT_EXIST` | There is no INDEX for the token pair.      |

# Get Intents

Get a list of addresses that have an intent to trade a token pair.

```text
function getIntents(
  address _makerToken,
  address _takerToken,
  uint256 count
) external view returns (address[] memory)
```

| Param         | Type      | Description                                |
| :------------ | :-------- | :----------------------------------------- |
| `_makerToken` | `address` | Address of the token that the Maker sends. |
| `_takerToken` | `address` | Address of the token that the Taker sends. |
| `_count`      | `uint256` | Maximum number of items to return.         |

| Revert Reason          | Scenario                                   |
| :--------------------- | :----------------------------------------- |
| `TOKEN_IS_BLACKLISTED` | One or both of the tokens are blacklisted. |
| `INDEX_DOES_NOT_EXIST` | There is no INDEX for the token pair.      |

# Index

A list of peer locators sorted by score. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/index).

# Locator Struct

```text
struct Locator {
  address user;
  uint256 score;
  bytes32 data;
}
```

# Set a Locator

Set an Locator on the Index.

```text
function setLocator(
  uint256 _score,
  address _user,
  bytes32 _data
) external onlyOwner
```

| Param    | Type      | Description                                  |
| :------- | :-------- | :------------------------------------------- |
| `_score` | `uint256` | Score for placement in the list.             |
| `_user`  | `address` | The account or contract setting the Locator. |
| `_data`  | `bytes32` | Arbitrary data.                              |

A successful `setLocator` emits a `SetLocator` event.

```text
event SetLocator(
  uint256 score,
  address indexed user,
  bytes32 indexed data
);
```

| Revert Reason        | Scenario                                   |
| :------------------- | :----------------------------------------- |
| `SIGNAL_ALREADY_SET` | A Locator by the same user is already set. |

# Unset a Locator

Unset a Locator from the Index.

```text
function unsetLocator(
  address _user
) external onlyOwner returns (bool) {
```

A successful `unsetLocator` emits an `UnsetLocator` event.

```text
event UnsetLocator(
  address indexed user
);
```

| Param   | Type      | Description                                    |
| :------ | :-------- | :--------------------------------------------- |
| `_user` | `address` | The account or contract unsetting the Locator. |

# Get a Locator

Gets the intent for a given staker address.

```text
function getLocator(
  address _user
) external view returns (Locator memory)
```

| Param   | Type      | Description                         |
| :------ | :-------- | :---------------------------------- |
| `_user` | `address` | The account or contract to look up. |

# Fetch Locators

Fetch up to a number of locators from the list.

```text
function fetchLocators(
  uint256 _count
) external view returns (bytes32[] memory result) {
```

| Param    | Type      | Description                              |
| :------- | :-------- | :--------------------------------------- |
| `_count` | `uint256` | The maximum number of locators to fetch. |
