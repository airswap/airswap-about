# Swap Contract

Swap is a non-custodial trade settlement contract. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/swap).

## Features

* **Atomic Swap** to transact directly peer-to-peer on Ethereum.
* **Fungible and Non-Fungible** to swap between any two ERC-20 or ERC-721 assets.
* **Typed Data Signatures** to sign informative messages for improved transparency.
* **Delegate Authorization** to authorize peers to act on behalf of others.
* **Affiliate Fees** to compensate those who facilitate trades.
* **Trade with Anyone or Someone** to let anyone take an order or set a specific taker.
* **Batch Cancels** to cancel multiple orders in a single transaction.
* **Minimum Nonce** to invalidate all order nonces below a value.

## Swap

An atomic token swap between a maker and taker.

```text
function swap(
  Types.Order calldata _order
) external
```

| Param | Type | Description |
| :--- | :--- | :--- |
| `_order` | `Order` | Order struct as specified in Types below. |

A successul `swap` emits a `Swap` event.

```text
event Swap(
  uint256 indexed nonce,
  uint256 timestamp,
  address indexed makerWallet,
  uint256 makerParam,
  address makerToken,
  address indexed takerWallet,
  uint256 takerParam,
  address takerToken,
  address affiliateWallet,
  uint256 affiliateParam,
  address affiliateToken
);
```

| Revert Reason | Scenario |
| :--- | :--- |
| `SIGNER_UNAUTHORIZED` | Order has been signed by an account that has not been authorized to sign it. |
| `SIGNATURE_INVALID` | Signature provided does not match the Order provided. |
| `ORDER_ALREADY_TAKEN` | Order has already been taken by its `nonce` value. |
| `ORDER_ALREADY_CANCELED` | Order has already been canceled by its `nonce` value. |
| `ORDER_EXPIRED` | Order has an `expiry` lower than the current block time. |
| `NONCE_TOO_LOW` | Nonce provided is below the minimum value set. |
| `SENDER_UNAUTHORIZED` | Order has been sent by an account that has not been authorized to send it. |
| `VALUE_MUST_BE_SENT` | Order indicates an ether Swap but insufficient ether was sent. |
| `VALUE_MUST_BE_ZERO` | Order indicates a token Swap but ether was sent. |
| `INVALID_AUTH_DELEGATE` | Delegate address is the same as the sender address. |
| `INVALID_AUTH_EXPIRY` | Authorization expiry time is in the past. |

## Cancel

Provide an array of `nonces`, unique by Maker address, to mark one or more Orders as canceled.

```text
function cancel(uint256[] memory _nonces) external
```

A successful `cancel` emits a `Cancel` event.

```text
event Cancel(
  uint256 indexed nonce,
  address indexed makerAddress
);
```

## Invalidate

Provide a minimum value to invalidate all nonces below the value.

```text
invalidate(uint256 _minimumNonce) external
```

A successful `invalidate` emits an `Invalidate` event.

```text
event Invalidate(
  uint256 indexed nonce,
  address indexed makerAddress
);
```

## Authorize

Authorize a delegate account or contract to make \(sign\) or take \(send\) Orders on the sender's behalf.

```text
function authorize(address _delegate, uint256 _expiry) external returns (bool)
```

A successful `authorize` emits an `Authorize` event.

```text
event Invalidate(
  uint256 indexed nonce,
  address indexed makerAddress
);
```

## Revoke

Revoke the authorization of a delegate account or contract.

```text
function revoke(address _delegate) external returns (bool)
```

A successful `revoke` emits a `Revoke` event.

```text
event Invalidate(
  uint256 indexed nonce,
  address indexed makerAddress
);
```

## Structs

### Order

| Param | Type | Description |
| :--- | :--- | :--- |
| nonce | `uint256` | Unique per maker and should be sequential |
| expiry | `uint256` | Expiry in seconds since 1 January 1970 |
| maker | `Party` | Party to the trade that sets terms |
| taker | `Party` | Party to the trade that accepts terms |
| affiliate | `Party` | Party compensated for facilitating \(optional\) |

### Party

| Param | Type | Description |
| :--- | :--- | :--- |
| wallet | `address` | Wallet address of the party |
| token | `address` | Contract address of the token |
| param | `uint256` | Value \(ERC-20\) or ID \(ERC-721\) |
| kind | `bytes4` | Interface ID of the token |

### Signature

| Param | Type | Description |
| :--- | :--- | :--- |
| signer | `address` | Address of the wallet used to sign |
| v | `uint8` | `v` value of an ECDSA signature |
| r | `bytes32` | `r` value of an ECDSA signature |
| s | `bytes32` | `s` value of an ECDSA signature |
| version | `bytes1` | [EIP-191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md) signature version |

