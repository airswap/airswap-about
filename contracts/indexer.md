Indexer and Index work together to manage onchain discovery.

# Indexer

Indexer is a smart contract for peer discovery. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/swap).

## `createTokenPairIndex`

If none exists, deploy a new `Index` contract for the given token pair and return the address of the new or existing INDEX. For example, an intent to trade WETH/DAI.

```java
function createTokenPairIndex(
  address _makerToken,
  address _takerToken
) public returns (address)
```

| Param         | Type      | Description                                |
| :------------ | :-------- | :----------------------------------------- |
| `_makerToken` | `address` | Address of the token that the Maker sends. |
| `_takerToken` | `address` | Address of the token that the Taker sends. |

## `addTokenToBlacklist`

Add a token to the blacklist.

```java
function addTokenToBlacklist(
  address _token
) external onlyOwner
```

| Param    | Type      | Description                        |
| :------- | :-------- | :--------------------------------- |
| `_token` | `address` | Address of the token to blacklist. |

A successul `addTokenToBlacklist` emits a `AddTokenToBlacklist` event.

```java
event AddTokenToBlacklist(
  address token
);
```

## `removeTokenFromBlacklist`

Remove a token from the blacklist.

```java
function removeTokenFromBlacklist(
  address _token
) external onlyOwner
```

| Param    | Type      | Description                         |
| :------- | :-------- | :---------------------------------- |
| `_token` | `address` | The address of the token to remove. |

A successul `removeTokenFromBlacklist` emits a `RemoveTokenFromBlacklist` event.

```java
event RemoveTokenFromBlacklist(
  address token
);
```

## `setIntent`

Stake tokens to the Indexer and set an intent to trade.

```java
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

A successful `setIntent` emits a `Stake` event.

```java
event Stake(
  address wallet,
  address makerToken,
  address takerToken,
  uint256 amount
);
```

---

| Revert Reason             | Scenario                                    |
| :------------------------ | :------------------------------------------ |
| `LOCATOR_NOT_WHITELISTED` | The locator was not found on the whitelist. |
| `PAIR_IS_BLACKLISTED`     | One or both of the tokens are blacklisted.  |
| `INDEX_DOES_NOT_EXIST`    | There is no index for the token pair.       |
| `UNABLE_TO_STAKE`         | The staking amount was not transferred.     |

## `unsetIntent`

Unset an intent to trade and return staked tokens to the sender.

```java
function unsetIntent(
  address _makerToken,
  address _takerToken
) public
```

| Param         | Type      | Description                                |
| :------------ | :-------- | :----------------------------------------- |
| `_makerToken` | `address` | Address of the token that the Maker sends. |
| `_takerToken` | `address` | Address of the token that the Taker sends. |

A successful `unsetIntent` emits a `Unstake` event.

```java
event Unstake(
  address wallet,
  address makerToken,
  address takerToken,
  uint256 amount
);
```

---

| Revert Reason            | Scenario                                       |
| :----------------------- | :--------------------------------------------- |
| `INDEX_DOES_NOT_EXIST`   | There is no INDEX for the token pair.          |
| `LOCATOR_DOES_NOT_EXIST` | Locator does not exist for the message sender. |

## `getIntents`

Get a list of addresses that have an intent to trade a token pair.

```java
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

## Constructor

Create a new `Indexer` contract.

```java
constructor(
  address _stakeToken
  address _locatorWhitelist
) public
```

| Param               | Type      | Description                                        |
| :------------------ | :-------- | :------------------------------------------------- |
| `_stakeToken`       | `address` | Address of the token required for staking.         |
| `_locatorWhitelist` | `address` | Address of an optional locator whitelist contract. |

# Index

Index is a list of locators sorted by score. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/index).

## `Locator`

```java
struct Locator {
  address user;
  uint256 score;
  bytes32 data;
}
```

## `setLocator`

Set an Locator on the Index.

```java
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

```java
event SetLocator(
  uint256 score,
  address indexed user,
  bytes32 indexed data
);
```

---

| Revert Reason         | Scenario                                   |
| :-------------------- | :----------------------------------------- |
| `LOCATOR_ALREADY_SET` | A Locator by the same user is already set. |

## `unsetLocator`

Unset a Locator from the Index.

```java
function unsetLocator(
  address _user
) external onlyOwner returns (bool) {
```

A successful `unsetLocator` emits an `UnsetLocator` event.

```java
event UnsetLocator(
  address indexed user
);
```

| Param   | Type      | Description                                    |
| :------ | :-------- | :--------------------------------------------- |
| `_user` | `address` | The account or contract unsetting the Locator. |

## `getLocator`

Gets the intent for a given staker address.

```java
function getLocator(
  address _user
) external view returns (Locator memory)
```

| Param   | Type      | Description                         |
| :------ | :-------- | :---------------------------------- |
| `_user` | `address` | The account or contract to look up. |

## `fetchLocators`

Fetch up to a number of locators from the list.

```java
function fetchLocators(
  uint256 _count
) external view returns (bytes32[] memory result) {
```

| Param    | Type      | Description                              |
| :------- | :-------- | :--------------------------------------- |
| `_count` | `uint256` | The maximum number of locators to fetch. |
