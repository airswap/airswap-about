An Indexer is a smart contract to discover trading parties by token pair. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/source/indexer).

{% hint style="warning" %}
\*The indexer contract deployed to the AirSwap network may have some administrative privileges. Specifically, AirSwap does maintain a token blacklist which disallows certain tokens from being added and queried through the Indexer. In addition, setLocatorWhitelist which dictates what interface if any locators must follow is also maintained by AirSwap.
{% endhint %}

# Functions

## `constructor`

Create a new `Indexer` contract.

```java
constructor(
  address indexerStakingToken
) public
```

| Param                 | Type      | Description                                |
| :-------------------- | :-------- | :----------------------------------------- |
| `indexerStakingToken` | `address` | Address of the token required for staking. |

## `createIndex`

If none exists, deploy a new `Index` contract for the given token pair and return its address. If the requested `Index` already exists, the function just returns its address.

```java
function createIndex(
  address signerToken,
  address senderToken
) external returns (address)
```

| Param         | Type      | Description                                                |
| :------------ | :-------- | :--------------------------------------------------------- |
| `signerToken` | `address` | Address of the token transferred from a signer in a trade. |
| `senderToken` | `address` | Address of the token transferred from a sender in a trade. |

When a new `Index` is deployed, `createIndex` emits a `CreateIndex` event.

```java
event CreateIndex(
  address signerToken,
  address senderToken
);
```

## `addTokenToBlacklist`

Add a token to the blacklist. Markets that include a blacklisted token cannot have intents to trade set on them, and cannot have locators fetched for them.

```java
function addTokenToBlacklist(
  address token
) external onlyOwner
```

| Param   | Type      | Description                        |
| :------ | :-------- | :--------------------------------- |
| `token` | `address` | Address of the token to blacklist. |

A successful `addTokenToBlacklist` emits a `AddTokenToBlacklist` event.

```java
event AddTokenToBlacklist(
  address token
);
```

## `removeTokenFromBlacklist`

Remove a token from the blacklist. Markets that include a blacklisted token cannot have intents to trade set on them, and cannot have locators fetched for them.

```java
function removeTokenFromBlacklist(
  address token
) external onlyOwner
```

| Param   | Type      | Description                         |
| :------ | :-------- | :---------------------------------- |
| `token` | `address` | The address of the token to remove. |

A successful `removeTokenFromBlacklist` emits a `RemoveTokenFromBlacklist` event.

```java
event RemoveTokenFromBlacklist(
  address token
);
```

## `setIntent`

Stake tokens to the Indexer and set an intent to trade. If the caller already has an intent on the specified Index, then the intent is updated to reflect the new `stakingAmount` and `locator`.

```java
function setIntent(
  address signerToken,
  address senderToken,
  uint256 stakingAmount,
  bytes32 locator
) external
```

| Param           | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `signerToken`   | `address` | Signer token of the Index being staked.                 |
| `senderToken`   | `address` | Sender token of the Index being staked.                 |
| `stakingAmount` | `uint256` | Amount of stakingToken to stake.                        |
| `locator`       | `bytes32` | Arbitrary data. Often an address in the first 20 bytes. |

A successful `setIntent` emits a `Stake` event. The underlying `Index` emits an `SetLocator` event.

```java
event Stake(
  address indexed staker,
  address indexed signerToken,
  address indexed senderToken,
  uint256 stakeAmount
);
```

---

| Revert Reason             | Scenario                                     |
| :------------------------ | :------------------------------------------- |
| `INDEX_DOES_NOT_EXIST`    | There is no index for the token pair.        |
| `LOCATOR_NOT_WHITELISTED` | The locator was not found on the whitelist.  |
| `PAIR_IS_BLACKLISTED`     | One or both of the tokens are blacklisted.   |
| `UNABLE_TO_STAKE`         | The staking amount was not transferred.      |
| `ENTRY_ALREADY_EXISTS`    | Entry does not exist for the message sender. |

## `unsetIntent`

Unset an intent to trade and return staked tokens to the sender.

```java
function unsetIntent(
  address signerToken,
  address senderToken
) external
```

| Param         | Type      | Description                               |
| :------------ | :-------- | :---------------------------------------- |
| `signerToken` | `address` | Signer token of the Index being unstaked. |
| `senderToken` | `address` | Sender token of the Index being unstaked. |

A successful `unsetIntent` emits an `Unstake` event. The underlying `Index` emits an `UnsetLocator` event.

```java
event Unstake(
  address indexed staker,
  address indexed signerToken,
  address indexed senderToken,
  uint256 stakeAmount
);
```

---

| Revert Reason          | Scenario                                     |
| :--------------------- | :------------------------------------------- |
| `INDEX_DOES_NOT_EXIST` | There is no Index for the token pair.        |
| `ENTRY_DOES_NOT_EXIST` | Entry does not exist for the message sender. |

## `getLocators`

Get a list of locators that have an intent to trade a token pair. Along with the locators, their corresponding staking scores are returned, and the address of the next cursor to pass back into the function to achieve pagination.

```java
function getLocators(
  address signerToken,
  address senderToken,
  address cursor,
  uint256 limit
) external view returns (
  bytes32[] memory locators,
  uint256[] memory scores,
  address nextCursor
) {
```

| Param         | Type      | Description                                     |
| :------------ | :-------- | :---------------------------------------------- |
| `signerToken` | `address` | Address of the token that the signer transfers. |
| `senderToken` | `address` | Address of the token that the sender transfers. |
| `cursor`      | `address` | Address of the user to start from in the list.  |
| `limit`       | `uint256` | Maximum number of items to return.              |

## `getStakedAmount`

Get a list of locators that have an intent to trade a token pair. Along with the locators, their corresponding staking scores are returned, and the address of the next cursor to pass back into the function to achieve pagination.

```java
function getStakedAmount(
  address user,
  address signerToken,
  address senderToken
) public view returns (uint256 stakedAmount) {
```

| Param         | Type      | Description                                      |
| :------------ | :-------- | :----------------------------------------------- |
| `user`        | `address` | The user whose stake amount is requested.        |
| `signerToken` | `address` | The signer token of the Index they've staked on. |
| `senderToken` | `address` | The sender token of the Index they've staked on. |
