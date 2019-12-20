A DelegateFactory deploys Delegate contracts. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/source/delegate-factory).

# Functions

## `constructor`

Create a new `DelegateFactory` contract.

```java
constructor(
  ISwap factorySwapContract,
  IIndexer factoryIndexerContract,
  bytes2 factoryProtocol
) public
```

| Param                    | Type     | Description                                                     |
| :----------------------- | :------- | :-------------------------------------------------------------- |
| `factorySwapContract`    | `ISwap`  | Instance of the swap contract used to settle trades.            |
| `factoryIndexerContract` | `ISwap`  | Instance of the indexer contract the delegate will deploy with. |
| `factoryProtocol`        | `bytes2` | Protocol type of the delegates the factory deploys.             |

## `createDelegate`

Create a new Delegate contract. Implements `IDelegateFactory.createDelegate`.

```java
function createDelegate(
  address delegateTradeWallet
) external returns (address delegateContractAddress)
```

| Param                 | Type      | Description                                          |
| :-------------------- | :-------- | :--------------------------------------------------- |
| `delegateTradeWallet` | `address` | Address of the wallet that holds funds to be traded. |

## `has`

Check to see whether the factory has deployed a delegate by locator. Implements `ILocatorWhitelist.has`.

```java
function has(
  bytes32 locator
) external view returns (bool)
```

| Param     | Type      | Description                                                                |
| :-------- | :-------- | :------------------------------------------------------------------------- |
| `locator` | `bytes32` | The locator in question. Expects a contract address in the first 20 bytes. |
