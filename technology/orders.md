# Orders

AirSwap orders are mutually signed instructions to perform an atomic swap. Prior to execution, both the signer (party that creates and signs the order) and sender (party that sends the order to the EVM) must have approved the swap contract to transfer the specified tokens on their behalf.

## Properties

An `Order` has the following properties:

| Property     | Type      | Description                               |
| :----------- | :-------- | :---------------------------------------- |
| nonce        | `uint256` | Unique per signer and usually sequential. |
| expiry       | `uint256` | Expiry in seconds since 1 January 1970.   |
| signerWallet | `address` | Wallet that sets and signs terms.         |
| signerToken  | `address` | Token that the signer transfers.          |
| signerAmount | `uint256` | Amount that the signer transfers.         |
| senderToken  | `address` | Token that the sender transfers.          |
| senderAmount | `uint256` | Amount that the sender transfers.         |
| v            | `uint8`   | `v` value of the ECDSA signature.         |
| r            | `bytes32` | `r` value of the ECDSA signature.         |
| s            | `bytes32` | `s` value of the ECDSA signature.         |

## Execution

Orders are passed to the [Swap](https://docs.airswap.io/contract-deployments) contract for execution, which emits a `Swap` event on success. The `light` function is gas more efficient, whereas the `swap` function provides protocol fee rebates to staked AST holders. Either function can execute a properly signed order.

```typescript
  function light(
    uint256 nonce,
    uint256 expiry,
    address signerWallet,
    IERC20 signerToken,
    uint256 signerAmount,
    IERC20 senderToken,
    uint256 senderAmount,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external;
```
