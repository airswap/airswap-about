Swap is a trustless peer-to-peer trade settlement contract. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/source/swap).

# Features

**Authorizations** are for peers that trade on behalf of others. These peers are authorized by an individual to send or sign orders for them. Peers can be wallets (people or programs) or smart contracts.

**Affiliates** are third-parties compensated for their part in bringing together the two parties of a trade, and can be other traders or software applications that connect traders on the network.

# Functions

## `constructor`

Create a new `Swap` contract.

```java
constructor() public
```

## `swap`

An atomic token swap between a signer and a sender.

```java
function swap(
  Types.Order calldata order
) external
```

| Param   | Type    | Required | Description                                     |
| :------ | :------ | :------- | :---------------------------------------------- |
| `order` | `Order` | required | Order struct as specified in [Types](types.md). |

---

| Preconditions                                                              |
| :------------------------------------------------------------------------- |
| ✓ signerWallet must approve the Swap contract to transfer its signerToken. |
| ✓ senderWallet must approve the Swap contract to transfer its senderToken. |

---

A successful `swap` emits a `Swap` event.

```java
event Swap(
  uint256 indexed nonce,
  uint256 timestamp,
  address indexed signerWallet,
  uint256 signerAmount,
  uint256 signerId,
  address signerToken,
  address indexed senderWallet,
  uint256 senderAmount,
  uint256 senderId,
  address senderToken,
  address affiliateWallet,
  uint256 affiliateAmount,
  uint256 affiliateId,
  address affiliateToken
);
```

| Revert Reason              | Scenario                                                                     |
| :------------------------- | :--------------------------------------------------------------------------- |
| `SIGNER_UNAUTHORIZED`      | Order has been signed by an account that has not been authorized to sign it. |
| `SIGNATURE_INVALID`        | Signature provided does not match the Order provided.                        |
| `ORDER_TAKEN_OR_CANCELLED` | Order has already been taken or cancelled by its `nonce` value.              |
| `ORDER_EXPIRED`            | Order has an `expiry` before the current block time.                         |
| `NONCE_TOO_LOW`            | Nonce provided is below the minimum value set.                               |
| `SENDER_UNAUTHORIZED`      | Order has been sent by an account that has not been authorized to send it.   |
| `INVALID_SELF_TRANSFER`    | Order has the same signer and sender for the swap.                           |
| `TRANSFER_FAILED`          | One of the token transfers in the swap failed.                               |

## `cancel`

Provide an array of `nonces`, unique by signer address, to mark one or more orders as cancelled.
{% hint style="warning" %}
Out of gas may occur in arrays of length > 400
{% endhint %}

```java
function cancel(
  uint256[] memory nonces
) external
```

| Param    | Type        | Required | Description                      |
| :------- | :---------- | :------- | :------------------------------- |
| `nonces` | `uint256[]` | required | Array of order nonces to cancel. |

A successful `cancel` emits one `Cancel` event per nonce.

```java
event Cancel(
  uint256 indexed nonce,
  address indexed signerWallet
);
```

## `cancelUpTo`

Provide a minimum value to cancel all nonces below the value. This is not inclusive - the `minimumNonce` value is still considered valid.

```java
function cancelUpTo(
  uint256 minimumNonce
) external
```

| Param          | Type      | Required | Description                                 |
| :------------- | :-------- | :------- | :------------------------------------------ |
| `minimumNonce` | `uint256` | required | Lowest acceptable nonce value for a signer. |

A successful `cancelUpTo` emits an `CancelUpTo` event.

```java
event CancelUpTo(
  uint256 indexed nonce,
  address indexed signerWallet
);
```

## `authorizeSender`

Authorize another account or contract send orders on behalf of the caller.

```java
function authorizeSender(
  address authorizedSender
) external
```

| Param              | Type      | Required | Description                       |
| :----------------- | :-------- | :------- | :-------------------------------- |
| `authorizedSender` | `address` | required | Address to authorize for sending. |

A successful `authorizeSender` emits an `AuthorizeSender` event.

```java
event AuthorizeSender(
  address indexed authorizerAddress,
  address indexed authorizedSender
);
```

| Revert Reason         | Scenario                                                     |
| :-------------------- | :----------------------------------------------------------- |
| `INVALID_AUTH_SENDER` | The `authorizedSender` and the function caller are the same. |

## `authorizeSigner`

Authorize another account or contract to:

- Sign an order OR
- Submit an order without a signature
  on behalf of the function caller. This means the function caller is no longer required to sign such orders.

```java
function authorizeSigner(
  address authorizedSigner
) external
```

| Param              | Type      | Required | Description                       |
| :----------------- | :-------- | :------- | :-------------------------------- |
| `authorizedSigner` | `address` | required | Address to authorize for signing. |

A successful `authorizeSigner` emits an `AuthorizeSigner` event.

```java
event AuthorizeSigner(
  address indexed authorizerAddress,
  address indexed authorizedSigner
);
```

| Revert Reason         | Scenario                                                     |
| :-------------------- | :----------------------------------------------------------- |
| `INVALID_AUTH_SIGNER` | The `authorizedSigner` and the function caller are the same. |

## `revokeSender`

Revoke the sending authorization of a delegate account or contract.

```java
function revokeSender(
  address authorizedSender
) external
```

| Param              | Type      | Required | Description                                         |
| :----------------- | :-------- | :------- | :-------------------------------------------------- |
| `authorizedSender` | `address` | required | Address from which to revoke sending authorization. |

A successful `revokeSender` emits a `RevokeSender` event.

```java
event RevokeSender(
  address indexed authorizerAddress,
  address indexed revokedSender,
);
```

## `revokeSigner`

Revoke the signing authorization of a delegate account or contract.

```java
function revokeSigner(
  address authorizedSigner
) external
```

| Param              | Type      | Required | Description                                         |
| :----------------- | :-------- | :------- | :-------------------------------------------------- |
| `authorizedSigner` | `address` | required | Address from which to revoke signing authorization. |

A successful `revokeSigner` emits a `RevokeSigner` event.

```java
event RevokeSigner(
  address indexed authorizerAddress,
  address indexed revokedSigner,
);
```
