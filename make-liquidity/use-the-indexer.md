Indexers are smart contracts used to signal your intent to trade and publish the URL at which your server is running. You can interact with Indexer contracts either programmatically or through tools like [AirSwap CLI](https://github.com/airswap/airswap-cli) and [MEW](https://www.myetherwallet.com/). See the [Indexer Contract](../reference/indexer.md) for complete method details.

# Using the CLI

Install the CLI globally.

```
$ yarn global add airswap
```

Check out the available Indexer commands.

```
$ airswap indexer
AirSwap CLI 1.2.13 — https://support.airswap.io/
get, set, and unset intents on the indexer

USAGE
  $ airswap indexer:COMMAND

COMMANDS
  indexer:enable  enable staking on the indexer
  indexer:get     get intents from the indexer
  indexer:new     create an index for a new token pair
  indexer:set     set an intent
  indexer:unset   unset an intent
```

These commands map to the contract functions below.

## Set an Intent to Trade

Once you have set an account with `airswap account:import`, run the following command to enable staking on the Indexer.

```
$ airswap indexer:enable
```

Once you have your [Server](./run-a-server.md) up and running, run the following command to set your intent to trade.

```
$ airswap indexer:set
```

| Param         | Type            | Description                                     |
| :------------ | :-------------- | :---------------------------------------------- |
| `buy or sell` | `buy` or `sell` | Whether you intend to buy or sell a token.      |
| `token`       | `token`         | Token you intend to buy or sell.                |
| `for`         | `token`         | Base token to buy or sell for.                  |
| `locator`     | `locator`       | URL of your Server where `https://` is implied. |
| `stakeAmount` | `number`        | Number of AirSwap Tokens to stake.              |

To ensure your intent was correctly set, you can query the opposite side of your intent on the indexer. For example, if you set an intent to sell DAI for WETH, you would query to buy DAI for WETH with the `indexer:get` command.

```
$ airswap indexer:get
AirSwap CLI 1.2.13 — https://support.airswap.io/

get intents from the indexer RINKEBY

Indexer 0x10F6702447414cE1250Af5f7000D7c9A0f04E824

buy or sell:  buy
token:  dai
for:  weth

Top peers selling DAI for WETH (HTTPS)

Staked  Locator
------  ------------------------------
1000    https://utilis.kapson.now.sh
500     m.dmosites.now.sh
10      https://d.secret-aardvark.life
0       http://10.0.0.189:3000/
```

# Indexer Contract

See [Contract Deployments](../system/contract-deployments) for the latest mainnet and rinkeby Indexers.

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

## `getLocators`

Get a list of locators that have an intent to trade a token pair. Along with the locators, their corresponding staking scores are returned, and the address of the next cursor for pagination.

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

## `createIndex`

Each token pair must have an `Index` before calling `setIntent`. If the requested `Index` already exists, the function returns its address.

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
