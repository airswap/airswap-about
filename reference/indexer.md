Indexers are used by makers to signal their interest in trading and by takers to query for makers with mutual trading interest. Locators are strings used by takers to connect to makers. In the case of Servers, locators are URLs, and in the case of Delegates, locators are contract addresses.

# Indexer Client

Add the `@airswap/protocols` package to your application.

```bash
$ yarn add @airswap/protocols
```

Import the Indexer client.

```javascript
import { Indexer } from '@airswap/protocols'
```

### `constructor`

Create a new `Indexer` client.

```javascript
public constructor(
  chainId = chainIds.RINKEBY,
  walletOrProvider?: ethers.Wallet | ethers.providers.Provider
)
```

| Param              | Type                                           | Optionality | Description                                                                                                                                                                      |
| :----------------- | :--------------------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chainId`          | `string`                                       | `optional`  | Ethereum chain ID of the network to connect to, either `1` or `4`.                                                                                                               |
| `walletOrProvider` | `ethers.Wallet` or `ethers.providers.Provider` | `optional`  | Ethers [wallet](https://docs.ethers.io/ethers.js/html/api-wallet.html) or [provider](https://docs.ethers.io/ethers.js/html/api-providers.html) to use for the contract instance. |

#### Basic Example

Create a client for the Rinkeby Indexer using the default provider.

```javascript
const indexer = new Indexer()
```

#### Custom Provider Example

Create a client for the Mainnet Indexer using an INFURA provider.

```javascript
import { chainIds } from '@airswap/constants'
const provider = new ethers.providers.InfuraProvider(...)
const indexer = new Indexer(chainIds.MAINNET, provider);
```

See a list of available providers on the [ethers.js documentation](https://docs.ethers.io/ethers.js/html/api-providers.html#connecting-to-ethereum).

### `getLocators`

Get a list of `string` locators by token pair.

```javascript
public async getLocators(
  signerToken: string,
  senderToken: string,
  protocol = protocols.SERVER,
  limit = 10,
  cursor = INDEX_HEAD
)
): Promise<LocatorResult>
```

| Param         | Type      | Optionality                           | Description                                                        |
| :------------ | :-------- | :------------------------------------ | :----------------------------------------------------------------- |
| `signerToken` | `string`  | `required`                            | Address of a token for the signer side of a trade.                 |
| `senderToken` | `string`  | `required`                            | Address of a token for the sender side of a trade.                 |
| `protocol`    | `bytes2`  | `optional` default `protocols.SERVER` | Protocol to query e.g. `protocols.SERVER` or `protocols.DELEGATE`. |
| `limit`       | `number`  | `optional` default `10`               | Maximum number of results to query.                                |
| `cursor`      | `address` | `optional` default `head`             | Cursor from which to start the query.                              |

**Example**
Query rinkeby Servers for those selling DAI for WETH. Locators are Server URLs.

```javascript
const indexer = new Indexer()
const { locators } = await indexer.getLocators(signerToken, senderToken)
```

**Example**
Query rinkeby Delegates for those selling DAI for WETH. Locators are Delegate contract addresses.

```javascript
import { rinkebyTokens, protocols } from `@airswap/constants`
const indexer = new Indexer();
const { locators } = await indexer.getLocators(signerToken, senderToken, protocols.DELEGATE);
```

# Solidity

See [Contract Deployments](../system/contract-deployments) for the latest mainnet and rinkeby Indexer deployments.

## Indexer Contract

An Indexer is a smart contract to discover trading parties by token pair. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/source/indexer).

### `constructor`

Create a new `Indexer` contract.

```java
constructor(
  address indexerStakingToken
) public
```

| Param                 | Type      | Description                                                                   |
| :-------------------- | :-------- | :---------------------------------------------------------------------------- |
| `indexerStakingToken` | `address` | Address of the token required for staking. Must be a standard ERC20 contract. |

### `createIndex`

If none exists, deploy a new `Index` contract for the given token pair and return its address. If the requested `Index` already exists, the function just returns its address.

```java
function createIndex(
  address signerToken,
  address senderToken,
  bytes2  protocol
) external returns (address)
```

| Param         | Type      | Description                                                          |
| :------------ | :-------- | :------------------------------------------------------------------- |
| `signerToken` | `address` | Address of the token transferred from a signer in a trade.           |
| `senderToken` | `address` | Address of the token transferred from a sender in a trade.           |
| `protocol`    | `bytes2`  | Identifier for different locator versions ie http makers, delegates. |

When a new `Index` is deployed, `createIndex` emits a `CreateIndex` event.

```java
event CreateIndex(
  address signerToken,
  address senderToken,
  bytes2 protocol
);
```

### `addTokenToBlacklist`

Add a token to the blacklist. Markets that include a blacklisted token cannot have intents to trade set on them and cannot have locators fetched for them.

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

### `removeTokenFromBlacklist`

Remove a token from the blacklist. Markets that include a blacklisted token cannot have intents to trade set on them and cannot have locators fetched for them.

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

### `setIntent`

Stake tokens to the Indexer and set an intent to trade. If the caller already has an intent on the specified Index, then the intent is updated to reflect the new `stakingAmount` and `locator`.

```java
function setIntent(
  address signerToken,
  address senderToken,
  bytes2 protocol,
  uint256 stakingAmount,
  bytes32 locator
) external
```

| Param           | Type      | Description                                             |
| :-------------- | :-------- | :------------------------------------------------------ |
| `signerToken`   | `address` | Signer token of the Index being staked.                 |
| `senderToken`   | `address` | Sender token of the Index being staked.                 |
| `protocol`      | `bytes2`  | Identifies protocol to communicate with locator.        |
| `stakingAmount` | `uint256` | Amount of stakingToken to stake.                        |
| `locator`       | `bytes32` | Arbitrary data. Often an address in the first 20 bytes. |

A successful `setIntent` emits a `Stake` event. The underlying `Index` emits an `SetLocator` event.

```java
event Stake(
  address indexed staker,
  address indexed signerToken,
  address indexed senderToken,
  bytes2 protocol,
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

### `unsetIntent`

Unset an intent to trade and return staked tokens to the sender.

```java
function unsetIntent(
  address signerToken,
  address senderToken,
  bytes2 protocol
) external
```

| Param         | Type      | Description                                      |
| :------------ | :-------- | :----------------------------------------------- |
| `signerToken` | `address` | Signer token of the Index being unstaked.        |
| `senderToken` | `address` | Sender token of the Index being unstaked.        |
| `protocol`    | `bytes2`  | Identifies protocol to communicate with locator. |

A successful `unsetIntent` emits an `Unstake` event. The underlying `Index` emits an `UnsetLocator` event.

```java
event Unstake(
  address indexed staker,
  address indexed signerToken,
  address indexed senderToken,
  bytes2 protocol,
  uint256 stakeAmount
);
```

---

| Revert Reason          | Scenario                                     |
| :--------------------- | :------------------------------------------- |
| `INDEX_DOES_NOT_EXIST` | There is no Index for the token pair.        |
| `ENTRY_DOES_NOT_EXIST` | Entry does not exist for the message sender. |

### `getLocators`

Get a list of locators that have an intent to trade a token pair. Along with the locators, their corresponding staking scores are returned, and the address of the next cursor for pagination.

```java
function getLocators(
  address signerToken,
  address senderToken,
  bytes2 protocol,
  address cursor,
  uint256 limit
) external view returns (
  bytes32[] memory locators,
  uint256[] memory scores,
  address nextCursor
) {
```

| Param         | Type      | Description                                      |
| :------------ | :-------- | :----------------------------------------------- |
| `signerToken` | `address` | Address of the token that the signer transfers.  |
| `senderToken` | `address` | Address of the token that the sender transfers.  |
| `protocol`    | `bytes2`  | Identifies protocol to communicate with locator. |
| `cursor`      | `address` | Address of the user to start from in the list.   |
| `limit`       | `uint256` | Maximum number of items to return.               |

### `getStakedAmount`

Get the amount staked for a specific user, token pair, and protocol.

```java
function getStakedAmount(
  address user,
  address signerToken,
  address senderToken,
  bytes2 protocol
) public view returns (uint256 stakedAmount) {
```

| Param         | Type      | Description                                      |
| :------------ | :-------- | :----------------------------------------------- |
| `user`        | `address` | The user whose stake amount is requested.        |
| `signerToken` | `address` | The signer token of the Index they've staked on. |
| `senderToken` | `address` | The sender token of the Index they've staked on. |
| `protocol`    | `bytes2`  | Identifies protocol to communicate with locator. |

## Index Contract

An Index is a list of locators sorted by score. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/source/index).

### Structs

#### `Entry`

```java
struct Entry {
  bytes32 locator;
  uint256 score;
  address prev;
  address next;
}
```

### Functions

#### `constructor`

Create a new `Index` contract.

```java
constructor() public
```

#### `setLocator`

Set an Locator on the Index.

```java
function setLocator(
  address identifier,
  uint256 score,
  bytes32 locator
) external onlyOwner
```

| Param        | Type      | Description                                         |
| :----------- | :-------- | :-------------------------------------------------- |
| `identifier` | `address` | Onchain address identifying the owner of a locator. |
| `score`      | `uint256` | Score for the locator being set.                    |
| `locator`    | `bytes32` | Locator.                                            |

A successful `setLocator` emits a `SetLocator` event.

```java
event SetLocator(
  address indexed identifier,
  uint256 score,
  bytes32 indexed locator
);
```

---

| Revert Reason          | Scenario                                            |
| :--------------------- | :-------------------------------------------------- |
| `ENTRY_ALREADY_EXISTS` | This address already has an Entry on the Index.     |
| `LOCATOR_MUST_BE_SENT` | Locator must not be empty to ensure list integrity. |

#### `updateLocator`

Updates an existing Locator on the Index.

```java
function updateLocator(
  address identifier,
  uint256 score,
  bytes32 locator
) external onlyOwner
```

| Param        | Type      | Description                                         |
| :----------- | :-------- | :-------------------------------------------------- |
| `identifier` | `address` | Onchain address identifying the owner of a locator. |
| `score`      | `uint256` | Score for the locator being set.                    |
| `locator`    | `bytes32` | Locator.                                            |

A successful `updateLocator` emits a `SetLocator` event.

```java
event SetLocator(
  address indexed identifier,
  uint256 score,
  bytes32 indexed locator
);
```

---

| Revert Reason          | Scenario                                                                    |
| :--------------------- | :-------------------------------------------------------------------------- |
| `ENTRY_DOES_NOT_EXIST` | This address does not has an Entry on the Index and thus cannot be updated. |
| `LOCATOR_MUST_BE_SENT` | Locator must not be empty to ensure list integrity.                         |

#### `unsetLocator`

Unset a Locator from the Index.

```java
function unsetLocator(
  address identifier
) external onlyOwner returns (bool) {
```

A successful `unsetLocator` emits an `UnsetLocator` event.

```java
event UnsetLocator(
  address event identifier
);
```

| Param        | Type      | Description                                         |
| :----------- | :-------- | :-------------------------------------------------- |
| `identifier` | `address` | Onchain address identifying the owner of a locator. |

---

| Revert Reason          | Scenario                                          |
| :--------------------- | :------------------------------------------------ |
| `ENTRY_DOES_NOT_EXIST` | This address does not have an Entry on the Index. |

#### `getScore`

Gets the score for a given identifier.

```java
function getScore(
  address identifier
) external view returns (uint256)
```

| Param        | Type      | Description                                         |
| :----------- | :-------- | :-------------------------------------------------- |
| `identifier` | `address` | Onchain address identifying the owner of a locator. |

#### `getLocator`

Gets the locator as bytes32 for a given identifier.

```java
function getLocator(
  address identifier
) external view returns (bytes32)
```

| Param        | Type      | Description                                         |
| :----------- | :-------- | :-------------------------------------------------- |
| `identifier` | `address` | Onchain address identifying the owner of a locator. |

#### `getLocators`

Get a Range of Locators.

```java
function getLocators(
   address cursor,
   uint256 limit
) external view returns (bytes32[] memory locators, uint256[] memory scores, address nextCursor) {
```

| Param    | Type      | Description                           |
| :------- | :-------- | :------------------------------------ |
| `cursor` | `address` | Cursor to start with.                 |
| `limit`  | `uint256` | Maximum number of locators to return. |
