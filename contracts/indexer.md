An Indexer is a smart contract to discover trading parties by token pair. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/source/indexer).

# Functions

## `constructor`

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

## `createIndex`

If none exists, deploy a new `Index` contract for the given token pair and return its address.

```java
function createIndex(
  address _signerToken,
  address _senderToken
) public returns (address)
```

| Param          | Type      | Description                                                |
| :------------- | :-------- | :--------------------------------------------------------- |
| `_signerToken` | `address` | Address of the token transferred from a signer in a trade. |
| `_senderToken` | `address` | Address of the token transferred from a sender in a trade. |

A successful `createIndex` emits a `CreateIndex` event.

```java
event CreateIndex(
  address signerToken,
  address senderToken
);
```

## `addToBlacklist`

Add a token to the blacklist.

```java
function addToBlacklist(
  address _token
) external onlyOwner
```

| Param    | Type      | Description                        |
| :------- | :-------- | :--------------------------------- |
| `_token` | `address` | Address of the token to blacklist. |

A successul `addToBlacklist` emits a `AddToBlacklist` event.

```java
event AddToBlacklist(
  address token
);
```

## `removeFromBlacklist`

Remove a token from the blacklist.

```java
function removeFromBlacklist(
  address _token
) external onlyOwner
```

| Param    | Type      | Description                         |
| :------- | :-------- | :---------------------------------- |
| `_token` | `address` | The address of the token to remove. |

A successul `removeFromBlacklist` emits a `RemoveFromBlacklist` event.

```java
event RemoveFromBlacklist(
  address token
);
```

## `setIntent`

Stake tokens to the Indexer and set an intent to trade.

```java
function setIntent(
  address _signerToken,
  address _senderToken,
  uint256 _amount,
  uint256 _expiry,
  bytes32 _locator
) public
```

| Param          | Type      | Description                                                         |
| :------------- | :-------- | :------------------------------------------------------------------ |
| `_signerToken` | `address` | Address of the token a signer is interested in sending.             |
| `_senderToken` | `address` | Address of the token a signer is interested in receiving.           |
| `_amount`      | `uint256` | Amount of token to stake.                                           |
| `_expiry`      | `uint256` | Timestamp after which the intent is invalid.                        |
| `_locator`     | `bytes32` | Arbitrary data. Often an address in the first 20 bytes.             |
| `_role`        | `bytes1`  | The role of the party. 0x01 (signer), 0x02 (sender), or 0x03 (both) |

A successful `setIntent` emits a `Stake` event. The underlying `Index` emits an `SetLocator` event.

```java
event Stake(
  address staker,
  address signerToken,
  address senderToken,
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
  address _signerToken,
  address _senderToken
) public
```

| Param          | Type      | Description                                     |
| :------------- | :-------- | :---------------------------------------------- |
| `_signerToken` | `address` | Address of the token that the signer transfers. |
| `_senderToken` | `address` | Address of the token that the sender transfers. |

A successful `unsetIntent` emits a `Unstake` event. The underlying `Index` emits an `UnsetLocator` event.

```java
event Unstake(
  address staker,
  address signerToken,
  address senderToken,
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
  address _signerToken,
  address _senderToken,
  uint256 count
) external view returns (address[] memory)
```

| Param          | Type      | Description                                     |
| :------------- | :-------- | :---------------------------------------------- |
| `_signerToken` | `address` | Address of the token that the signer transfers. |
| `_senderToken` | `address` | Address of the token that the sender transfers. |
| `_count`       | `uint256` | Maximum number of items to return.              |
