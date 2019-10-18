Wrapper automatically wraps and unwraps ETH. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/swap).

# Functions

# `constructor`

Create a new `Wrapper` contract.

```java
constructor(
  address _swapContract,
  address _wethContract
) public
```

| Param           | Type      | Description                                          |
| :-------------- | :-------- | :--------------------------------------------------- |
| `_swapContract` | `address` | Address of the Swap contract to settle trades.       |
| `_wethContract` | `address` | Address of the wrapped ether (WETH) contract to use. |

## `swap`

Performs wrapping and unwrapping if necessary and calls `_swapContract.swap`.

```java
function swap(
  Types.Order calldata _order
) external payable
```

| Param    | Type    | Description                                     |
| :------- | :------ | :---------------------------------------------- |
| `_order` | `Order` | Order struct as specified in [Types](types.md). |

---

| Preconditions                                                              |
| :------------------------------------------------------------------------- |
| ✓ makerWallet must approve the Swap contract to transfer the makerToken.   |
| ✓ takerWallet must approve the Swap contract to transfer the takerToken.   |
| ✓ takerWallet must approve the Wrapper contract to transfer WETH.          |
| ✓ takerWallet must authorize the Wrapper contract to on the Swap contract. |

---

| Revert Reason          | Scenario                                                                     |
| :--------------------- | :--------------------------------------------------------------------------- |
| `SENDER_MUST_BE_TAKER` | Order has been signed by an account that has not been authorized to sign it. |
| `VALUE_MUST_BE_SENT`   | Signature provided does not match the Order provided.                        |
| `VALUE_MUST_BE_ZERO`   | Order has already been taken by its `nonce` value.                           |
