A DelegateManager deploys Delegate contracts. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/sender-factory).

# Functions

## `constructor`

Create a new `DelegateManager` contract.

```java
constructor(ISwap _swapContract) public
```

| Param           | Type    | Description                                          |
| :-------------- | :------ | :--------------------------------------------------- |
| `_swapContract` | `ISwap` | Instance of the swap contract used to settle trades. |

## `createDelegate`

Create a new Delegate contract. Implements `IDelegateFactory.createDelegate`.

```java
function createDelegate(
  address _delegateContractOwner,
  address _delegateTradeWallet
) external returns (address delegateContractAddress)
```

| Param                    | Type      | Description                                             |
| :----------------------- | :-------- | :------------------------------------------------------ |
| `_delegateContractOwner` | `address` | Address of the owner of the sender for rule management. |
| `_delegateTradeWallet`   | `address` | Address of the wallet that holds funds to be traded.    |

## `has`

Check to see whether the factory has deployed a sender by locator. Implements `ILocatorWhitelist.has`.

```java
function has(
  bytes32 _locator
) external view returns (bool)
```

| Param      | Type      | Description                                                                |
| :--------- | :-------- | :------------------------------------------------------------------------- |
| `_locator` | `bytes32` | The locator in question. Expects a contract address in the first 20 bytes. |
