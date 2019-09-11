Delegate and DelegateManager work together to manage onchain trading.

# Delegate

A smart contract that takes orders based on rules. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/delegate).

## `setRule`

Set a trading rule on the delegate.

```java
function setRule(
  address _takerToken,
  address _makerToken,
  uint256 _maxTakerAmount,
  uint256 _priceCoef,
  uint256 _priceExp
) external onlyOwner
```

| Param             | Type      | Description                                                    |
| :---------------- | :-------- | :------------------------------------------------------------- |
| `_takerToken`     | `address` | The token the delegate would send.                             |
| `_makerToken`     | `address` | The token the consumer would send.                             |
| `_maxTakerAmount` | `uint256` | The maximum amount of token the delegate would send.           |
| `_priceCoef`      | `uint256` | The coefficient of the price to indicate the whole number.     |
| `_priceExp`       | `uint256` | The exponent of the price to indicate location of the decimal. |

---

A successful `setRule` will emit a `SetRule` event.

```java
event SetRule(
  address takerToken,
  address makerToken,
  uint256 maxTakerAmount,
  uint256 priceCoef,
  uint256 priceExp
);
```

### Price Calculations

All amounts are in the smallest unit \(e.g. wei\), so all calculations based on price result in a whole number. For calculations that would result in a decimal, the amount is automatically floored by dropping the decimal. For example, a price of `5.25` and `takerParam` of `2` results in `makerParam` of `10` rather than `10.5`. Tokens have many decimal places so these differences are very small.

### Examples

Set a rule to send up to 100,000 DAI for WETH at 0.0032 WETH/DAI

```java
setRule(WETHAddress, DAIAddress, 100000, 32, 4)
```

Set a rule to send up to 100,000 DAI for WETH at 312.50 WETH/DAI

```java
setRule(WETHAddress, DAIAddress, 100000, 31250, 2)
```

Set a rule to send up to 100,000 DAI for WETH at 312 WETH/DAI

```java
setRule(WETHAddress, DAIAddress, 100000, 312, 0)
```

## `unsetRule`

Unset a trading rule for the delegate.

```java
function unsetRule(
  address _takerToken,
  address _makerToken
) external onlyOwner
```

| Param         | Type      | Description                        |
| :------------ | :-------- | :--------------------------------- |
| `_takerToken` | `address` | The token the delegate would send. |
| `_makerToken` | `address` | The token the consumer would send. |

A successful `unsetRule` will emit an `UnsetRule` event.

```java
event UnsetRule(
  address takerToken,
  address makerToken
);
```

## `getMakerSideQuote`

Get a quote for the maker side. Often used to get a buy price for \_takerToken.

```java
function getMakerSideQuote(
  uint256 _takerParam,
  address _takerToken,
  address _makerToken
) external view returns (
  uint256 makerParam
)
```

| Param         | Type      | Description                                             |
| :------------ | :-------- | :------------------------------------------------------ |
| `_takerParam` | `uint256` | The amount of ERC-20 token the delegate would send.     |
| `_takerToken` | `address` | The address of an ERC-20 token the delegate would send. |
| `_makerToken` | `address` | The address of an ERC-20 token the consumer would send. |

---

| Revert Reason         | Scenario                                         |
| :-------------------- | :----------------------------------------------- |
| `TOKEN_PAIR_INACTIVE` | There is no rule set for this token pair.        |
| `AMOUNT_EXCEEDS_MAX`  | The quote would exceed the maximum for the rule. |

## `getTakerSideQuote`

Get a quote for the taker side. Often used to get a sell price for \_makerToken.

```java
function getTakerSideQuote(
  uint256 _makerParam,
  address _makerToken,
  address _takerToken
) external view returns (
  uint256 takerParam
)
```

| Param         | Type      | Description                                             |
| :------------ | :-------- | :------------------------------------------------------ |
| `_makerParam` | `uint256` | The amount of ERC-20 token the consumer would send.     |
| `_makerToken` | `address` | The address of an ERC-20 token the consumer would send. |
| `_takerToken` | `address` | The address of an ERC-20 token the delegate would send. |

---

| Revert Reason         | Scenario                                         |
| :-------------------- | :----------------------------------------------- |
| `TOKEN_PAIR_INACTIVE` | There is no rule set for this token pair.        |
| `AMOUNT_EXCEEDS_MAX`  | The quote would exceed the maximum for the rule. |

## `getMaxQuote`

Get the maximum quote from the delegate.

```java
function getMaxQuote(
  address _takerToken,
  address _makerToken
) external view returns (
  uint256 takerParam,
  uint256 makerParam
)
```

| Param         | Type      | Description                                             |
| :------------ | :-------- | :------------------------------------------------------ |
| `_takerToken` | `address` | The address of an ERC-20 token the delegate would send. |
| `_makerToken` | `address` | The address of an ERC-20 token the consumer would send. |

---

| Revert Reason         | Scenario                                  |
| :-------------------- | :---------------------------------------- |
| `TOKEN_PAIR_INACTIVE` | There is no rule set for this token pair. |

## `provideOrder`

Provide an order to the delegate for taking.

{% hint style="warning" %}
The taker specified on the order must have authorized this contract to swap on its behalf beforehand. See [Swap Contract](swap-contract.md)
{% endhint %}

```java
function provideOrder(
  Types.Order memory _order
) public
```

| Param   | Type                      | Description                                                |
| :------ | :------------------------ | :--------------------------------------------------------- |
| `order` | [`Order`](types.md#order) | Order struct as specified in the `@airswap/types` package. |

---

| Revert Reason         | Scenario                                                       |
| :-------------------- | :------------------------------------------------------------- |
| `TOKEN_PAIR_INACTIVE` | There is no rule set for this token pair.                      |
| `AMOUNT_EXCEEDS_MAX`  | The amount of the trade would exceed the maximum for the rule. |
| `PRICE_INCORRECT`     | The order is priced incorrectly for the rule.                  |

# DelegateManager

Deploys Delegate contracts. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/delegate-factory).

## `createDelegate`

Create a new Delegate contract. Implements `IDelegateFactory.createDelegate`.

```java
function createDelegate(
  address _swapContract,
  address _delegateContractOwner
) external returns (address delegateContractAddress)
```

| Param                    | Type      | Description                              |
| :----------------------- | :-------- | :--------------------------------------- |
| `_swapContract`          | `address` | The swap contract the delegate will use. |
| `_delegateContractOwner` | `address` | The owner of the new delegate contract.  |

## `has`

Check to see whether the factory has deployed a delegate by locator. Implements `ILocatorWhitelist.has`.

```java
function has(
  bytes32 _locator
) external view returns (bool)
```

| Param      | Type      | Description                                                                |
| :--------- | :-------- | :------------------------------------------------------------------------- |
| `_locator` | `bytes32` | The locator in question. Expects a contract address in the first 20 bytes. |

## Constructor

Create a new `Delegate` contract.

```java
constructor(
  address _swapContract,
  address _delegateContractOwner
) public
```

| Param                    | Type      | Description                                               |
| :----------------------- | :-------- | :-------------------------------------------------------- |
| `_swapContract`          | `address` | Address of the swap contract used to settle trades.       |
| `_delegateContractOwner` | `address` | Address of the owner of the delegate for rule management. |
