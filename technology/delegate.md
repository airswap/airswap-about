# Delegate

Delegate is a contract that allows users to set on-chain trading rules that accept and execute AirSwap orders that meet price criteria. In terms of the underlying SwapERC20 protocol, a trader setting rules is authorizing the Delegate to act as `sender` on its behalf. The trader interfacing with the delegate is the `signer` of each order. Delegate acts as an on-chain intermediary for cases where a Trader does not have an immediate counterparty or wishes to make an order publicly available.

See the [deployments](./deployments.md) page for latest deployed Delegate contract addresses.

## Rules

To enable Delegate call the `setRule` function. Token approvals must be set up by `senderWallet` on the `senderToken` to allow Delegate to act as a spender.

```typescript
  function setRule(
    address senderWallet,
    address senderToken,
    uint256 senderAmount,
    address signerToken,
    uint256 signerAmount,
    uint256 expiry
  ) external;
```

Rules can be be updated using `setRule` again or canceled using `unsetRule`.

```typescript
  function unsetRule(
    address senderWallet,
    address senderToken,
    address signerToken
  ) external;
```

## Swaps

As a counterparty, query logs or subscribe to `SetRule` and `UnsetRule` events for pricing information. With price in hand, create and sign an order at any time and then call `swap` on the Delegate contract. Upon success, Delegate emits a `DelegateSwap` event.

```typescript
  function swap(
    address senderWallet,
    uint256 nonce,
    uint256 expiry,
    address signerWallet,
    address signerToken,
    uint256 signerAmount,
    address senderToken,
    uint256 senderAmount,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external
```

Delegate uses SwapERC20 `swapLight` behind the scenes to complete the swap.