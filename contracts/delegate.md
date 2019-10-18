A smart contract that sends orders based on rules. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/delegate).

# Functions

## `constructor`

Create a new `Delegate` contract.

```java
constructor(
  ISwap _swapContract,
  address _delegateContractOwner,
  address _delegateTradeWallet
) public
```

| Param                    | Type      | Description                                             |
| :----------------------- | :-------- | :------------------------------------------------------ |
| `_swapContract`          | `ISwap`   | Instance of the swap contract used to settle trades.    |
| `_delegateContractOwner` | `address` | Address of the owner of the sender for rule management. |
| `_delegateTradeWallet`   | `address` | Address of the wallet that holds funds to be traded.    |

## `setRule`

Set a trading rule on the delegate. Delegate assumes the role of sender.

```java
function setRule(
  address _signerToken,
  address _senderToken,
  uint256 _maxSenderAmount,
  uint256 _priceCoef,
  uint256 _priceExp
) external onlyOwner
```

| Param              | Type      | Description                                                    |
| :----------------- | :-------- | :------------------------------------------------------------- |
| `_senderToken`     | `address` | The token the sender would send.                               |
| `_signerToken`     | `address` | The token the signer would send.                               |
| `_maxSenderAmount` | `uint256` | The maximum amount of token the sender would send.             |
| `_priceCoef`       | `uint256` | The coefficient of the price to indicate the whole number.     |
| `_priceExp`        | `uint256` | The exponent of the price to indicate location of the decimal. |

---

A successful `setRule` will emit a `SetRule` event.

```java
event SetRule(
  address senderToken,
  address signerToken,
  uint256 maxSenderAmount,
  uint256 priceCoef,
  uint256 priceExp
);
```

### Price Calculations

All amounts are in the smallest unit \(e.g. wei\), so all calculations based on price result in a whole number. For calculations that would result in a decimal, the amount is automatically floored by dropping the decimal. For example, a price of `5.25` and `senderParam` of `2` results in `signerParam` of `10` rather than `10.5`. Tokens have many decimal places so these differences are very small.

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
  address _senderToken,
  address _signerToken
) external onlyOwner
```

| Param          | Type      | Description                      |
| :------------- | :-------- | :------------------------------- |
| `_senderToken` | `address` | The token the sender would send. |
| `_signerToken` | `address` | The token the signer would send. |

A successful `unsetRule` will emit an `UnsetRule` event.

```java
event UnsetRule(
  address senderToken,
  address signerToken
);
```

## `getSignerSideQuote`

Get a quote for the signer side. Often used to get a buy price for \_senderToken.

```java
function getSignerSideQuote(
  uint256 _senderParam,
  address _senderToken,
  address _signerToken
) external view returns (
  uint256 signerParam
)
```

| Param          | Type      | Description                                           |
| :------------- | :-------- | :---------------------------------------------------- |
| `_senderParam` | `uint256` | The amount of ERC-20 token the sender would send.     |
| `_senderToken` | `address` | The address of an ERC-20 token the sender would send. |
| `_signerToken` | `address` | The address of an ERC-20 token the signer would send. |

---

| Revert Reason         | Scenario                                         |
| :-------------------- | :----------------------------------------------- |
| `TOKEN_PAIR_INACTIVE` | There is no rule set for this token pair.        |
| `AMOUNT_EXCEEDS_MAX`  | The quote would exceed the maximum for the rule. |

## `getSenderSideQuote`

Get a quote for the sender side. Often used to get a sell price for \_signerToken.

```java
function getSenderSideQuote(
  uint256 _signerParam,
  address _signerToken,
  address _senderToken
) external view returns (
  uint256 senderParam
)
```

| Param          | Type      | Description                                           |
| :------------- | :-------- | :---------------------------------------------------- |
| `_signerParam` | `uint256` | The amount of ERC-20 token the signer would send.     |
| `_signerToken` | `address` | The address of an ERC-20 token the signer would send. |
| `_senderToken` | `address` | The address of an ERC-20 token the sender would send. |

---

| Revert Reason         | Scenario                                         |
| :-------------------- | :----------------------------------------------- |
| `TOKEN_PAIR_INACTIVE` | There is no rule set for this token pair.        |
| `AMOUNT_EXCEEDS_MAX`  | The quote would exceed the maximum for the rule. |

## `getMaxQuote`

Get the maximum quote from the sender.

```java
function getMaxQuote(
  address _senderToken,
  address _signerToken
) external view returns (
  uint256 senderParam,
  uint256 signerParam
)
```

| Param          | Type      | Description                                           |
| :------------- | :-------- | :---------------------------------------------------- |
| `_senderToken` | `address` | The address of an ERC-20 token the sender would send. |
| `_signerToken` | `address` | The address of an ERC-20 token the signer would send. |

---

| Revert Reason         | Scenario                                  |
| :-------------------- | :---------------------------------------- |
| `TOKEN_PAIR_INACTIVE` | There is no rule set for this token pair. |

## `provideOrder`

Provide an order to the sender for taking.

{% hint style="warning" %}
The sender specified on the order must have authorized this contract to swap on its behalf beforehand. See [Swap Contract](swap-contract.md)
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
