Wrapper automatically wraps and unwraps ETH. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/swap).

# `swap`

Performs wrapping and unwrapping if necessary and calls `_swapContract.swap`.

```java
function swap(
  Types.Order calldata _order
) external payable {
```

| Param    | Type    | Description                                     |
| :------- | :------ | :---------------------------------------------- |
| `_order` | `Order` | Order struct as specified in [Types](types.md). |

---

| Preconditions                                                          |
| :--------------------------------------------------------------------- |
| ✓ makerWallet approves the Swap contract to transfer the makerToken.   |
| ✓ takerWallet approves the Swap contract to transfer the takerToken.   |
| ✓ takerWallet approves the Wrapper contract to transfer WETH.          |
| ✓ takerWallet authorizes the Wrapper contract to on the Swap contract. |

---

| Revert Reason          | Scenario                                                                     |
| :--------------------- | :--------------------------------------------------------------------------- |
| `SENDER_MUST_BE_TAKER` | Order has been signed by an account that has not been authorized to sign it. |
| `VALUE_MUST_BE_SENT`   | Signature provided does not match the Order provided.                        |
| `VALUE_MUST_BE_ZERO`   | Order has already been taken by its `nonce` value.                           |

# Constructor

Create a new `Wrapper` contract.

```java
constructor(
  address _swapContract,
  address _wethContract
) public {
```
