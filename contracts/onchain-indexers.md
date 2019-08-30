Indexers are for peer discovery. Makers stake tokens to announce their "intent to trade" and become discoverable. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/swap).

# Features

- **Peer Discovery** to find peers based on an intent to trade a specific token pair.
- **Token Staking** of variable amounts to position an intent among others.
- **Token Blacklisting** to protect the network from duplicate or malicious tokens.
- **Locator Whitelisting** to limit locators to those white listed by another contract.

# Constructor

Create a new `Indexer` contract.

```Solidity
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

```Solidity
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

```Solidity
function addToBlacklist(
  address _token
) external onlyOwner
```

| Param    | Type      | Description                        |
| :------- | :-------- | :--------------------------------- |
| `_token` | `address` | Address of the token to blacklist. |

# Remove from Blacklist

Remove a token from the blacklist. Emits a `RemoveFromBlacklist` event.

```Solidity
function removeFromBlacklist(
  address _token
) external onlyOwner
```

| Param    | Type      | Description                         |
| :------- | :-------- | :---------------------------------- |
| `_token` | `address` | The address of the token to remove. |

# Set an Intent

Stake tokens to the Indexer and set an intent to trade.

```Solidity
function setIntent(
  address _makerToken,
  address _takerToken,
  uint256 _amount,
  uint256 _expiry,
  bytes32 _locator
) public
```

| Param         | Type      | Description                                  |
| :------------ | :-------- | :------------------------------------------- |
| `_makerToken` | `address` | Address of the token that the Maker sends.   |
| `_takerToken` | `address` | Address of the token that the Taker sends.   |
| `_amount`     | `uint256` | Amount of token to stake.                    |
| `_expiry`     | `uint256` | Timestamp after which the intent is invalid. |
| `_locator`    | `bytes32` | Usually an address in the first 20 bytes.    |

| Revert Reason          | Scenario                                   |
| :--------------------- | :----------------------------------------- |
| `INDEX_IS_BLACKLISTED` | One or both of the tokens are blacklisted. |
| `INDEX_DOES_NOT_EXIST` | There is no index for the token pair.      |
| `MINIMUM_NOT_MET`      | The staking amount is insufficient.        |
| `UNABLE_TO_STAKE`      | The staking amount was not transferred.    |

# Unset an Intent

Unset an intent to trade and return staked tokens to the sender.

```Solidity
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

```Solidity
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

A list of signals: peer locators provided by users sorted by score. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/index).

# Signal Struct

```
struct Signal {
  address user;
  uint256 score;
  bytes32 locator;
}
```

# Set a Signal

Set an Signal on the Index.

```Solidity
function setSignal(
  address _user,
  uint256 _score,
  bytes32 _locator
) external onlyOwner
```

| Param    | Type      | Description                                 |
| :------- | :-------- | :------------------------------------------ |
| `_user`  | `address` | The account or contract setting the Signal. |
| `_score` | `uint256` | Score for placement in the list.            |
| `_value` | `bytes32` | Arbitrary data.                             |

A successful `setSignal` emits a `SetSignal` event.

```
event SetSignal(
  uint256 score,
  address indexed user,
  bytes32 indexed locator
);
```

| Revert Reason        | Scenario                                  |
| :------------------- | :---------------------------------------- |
| `SIGNAL_ALREADY_SET` | A Signal by the same user is already set. |

# Unset a Signal

Unset a Signal from the Index.

```Solidity
function unsetSignal(
  address _user
) external onlyOwner returns (bool) {
```

A successful `unsetSignal` emits an `UnsetSignal` event.

```
event UnsetSignal(
  address indexed user
);
```

| Param   | Type      | Description                                   |
| :------ | :-------- | :-------------------------------------------- |
| `_user` | `address` | The account or contract unsetting the Signal. |

# Get a Signal

Gets the intent for a given staker address.

```Solidity
function getSignal(
  address _user
) external view returns (Signal memory)
```

| Param   | Type      | Description                         |
| :------ | :-------- | :---------------------------------- |
| `_user` | `address` | The account or contract to look up. |

# Fetch Signals

Fetch up to a number of locators from the list.

```Solidity
function fetchSignals(
  uint256 _count
) external view returns (bytes32[] memory result) {
```

| Param   | Type      | Description                         |
| :------ | :-------- | :---------------------------------- |
| `_user` | `address` | The account or contract to look up. |
