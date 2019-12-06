Wrapper is a shim over the Swap contract. The Swap contract only supports tokens, so for ether (ETH) to be used it must first be wrapped into WETH. Orders can be submitted to the Wrapper, which deals with the wrapping and unwrapping of ETH, as well as passing the Order onwards to the Swap contract. Swaps through the wrapper cannot be performed with authorized senders or blank signatures (See [Swap](swap.md) for more detail on these cases). [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/source/wrapper).

# Functions

# `constructor`

Create a new `Wrapper` contract.

```java
constructor(
  address wrapperSwapContract,
  address wrapperWethContract
) public
```

| Param                 | Type      | Description                                          |
| :-------------------- | :-------- | :--------------------------------------------------- |
| `wrapperSwapContract` | `address` | Address of the Swap contract to settle trades.       |
| `wrapperWethContract` | `address` | Address of the wrapped ether (WETH) contract to use. |

## `swap`

Performs wrapping and unwrapping if necessary and passes the Order onwards to the Swap contract using `wrapperSwapContract.swap().

```java
function swap(
  Types.Order calldata order
) external payable
```

| Param   | Type    | Description                                     |
| :------ | :------ | :---------------------------------------------- |
| `order` | `Order` | Order struct as specified in [Types](types.md). |

---

| Preconditions                                                              |
| :------------------------------------------------------------------------- |
| ✓ signerWallet must approve the Swap contract to transfer the signerToken. |
| ✓ senderWallet must approve the Swap contract to transfer the senderToken. |
| ✓ senderWallet must approve the Wrapper contract to transfer WETH.         |
| ✓ senderWallet must authorize the Wrapper contract on the Swap contract.   |

---

| Revert Reason                     | Scenario                                                                   |
| :-------------------------------- | :------------------------------------------------------------------------- |
| `MSG_SENDER_MUST_BE_ORDER_SENDER` | Order has been sent by an account that is not the order's `sender.wallet`. |
| `SIGNATURE_MUST_BE_SENT`          | The signature field is blank. This is not allowed on the Wrapper.          |
| `VALUE_MUST_BE_SENT`              | No ETH was provided for an order that was expecting ETH to wrap.           |
| `VALUE_MUST_BE_ZERO`              | ETH was provided for an order that was not expecting ETH to wrap.          |
| `ETH_RETURN_FAILED`               | Transferring ETH to recipient wallet failed.                             |
| `DO_NOT_SEND_ETHER`               | ETH was sent to the contract directly. This contract can only receive ETH from the WETH contract |
