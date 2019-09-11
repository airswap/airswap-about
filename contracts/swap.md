Swap is a trustless peer-to-peer trade settlement contract. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/swap).

# `swap`

An atomic token swap between a maker and a taker.

```java
function swap(
  Types.Order calldata _order
) external
```

| Param   | Type    | Required | Description                               |
| :------ | :------ | :------- | :---------------------------------------- |
| `order` | `Order` | required | Order struct as specified in Types below. |

---

| Preconditions                                                          |
| :--------------------------------------------------------------------- |
| ✓ makerWallet approves the Swap contract to transfer the makerToken.   |
| ✓ takerWallet approves the Swap contract to transfer the takerToken.   |
| ✓ takerWallet approves the Wrapper contract to transfer WETH.          |
| ✓ takerWallet authorizes the Wrapper contract to on the Swap contract. |

---

A successul `swap` emits a `Swap` event.

```java
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

| Revert Reason            | Scenario                                                                     |
| :----------------------- | :--------------------------------------------------------------------------- |
| `SIGNER_UNAUTHORIZED`    | Order has been signed by an account that has not been authorized to sign it. |
| `SIGNATURE_INVALID`      | Signature provided does not match the Order provided.                        |
| `ORDER_ALREADY_TAKEN`    | Order has already been taken by its `nonce` value.                           |
| `ORDER_ALREADY_CANCELED` | Order has already been canceled by its `nonce` value.                        |
| `ORDER_EXPIRED`          | Order has an `expiry` lower than the current block time.                     |
| `NONCE_TOO_LOW`          | Nonce provided is below the minimum value set.                               |
| `SENDER_UNAUTHORIZED`    | Order has been sent by an account that has not been authorized to send it.   |
| `VALUE_MUST_BE_SENT`     | Order indicates an ether Swap but insufficient ether was sent.               |
| `VALUE_MUST_BE_ZERO`     | Order indicates a token Swap but ether was sent.                             |
| `INVALID_AUTH_DELEGATE`  | Delegate address is the same as the sender address.                          |
| `INVALID_AUTH_EXPIRY`    | Authorization expiry time is in the past.                                    |

# `cancel`

Provide an array of `nonces`, unique by maker address, to mark one or more orders as canceled.

```java
function cancel(
  uint256[] memory _nonces
) external
```

| Param    | Type        | Required | Description                               |
| :------- | :---------- | :------- | :---------------------------------------- |
| `nonces` | `uint256[]` | required | Order struct as specified in Types below. |

A successful `cancel` emits a `Cancel` event.

```java
event Cancel(
  uint256 indexed nonce,
  address indexed makerAddress
);
```

# `invalidate`

Provide a minimum value to invalidate all nonces below the value.

```java
function invalidate(
  uint256 _minimumNonce
) external
```

| Param          | Type      | Required | Description                               |
| :------------- | :-------- | :------- | :---------------------------------------- |
| `minimumNonce` | `uint256` | required | Order struct as specified in Types below. |

A successful `invalidate` emits an `Invalidate` event.

```java
event Invalidate(
  uint256 indexed nonce,
  address indexed makerAddress
);
```

# `authorize`

Authorize a delegate account or contract to make \(sign\) or take \(send\) Orders on the sender's behalf.

```java
function authorize(
  address _delegate,
  uint256 _expiry
) external returns (bool)
```

| Param             | Type      | Required | Description                               |
| :---------------- | :-------- | :------- | :---------------------------------------- |
| `approverAddress` | `address` | required | Order struct as specified in Types below. |
| `delegateAddress` | `address` | required | Order struct as specified in Types below. |
| `expiry`          | `uint256` | required | Order struct as specified in Types below. |

A successful `authorize` emits an `Authorize` event.

```java
event Authorize(
  address indexed approverAddress,
  address indexed delegateAddress,
  uint256 expiry
);
```

# `revoke`

Revoke the authorization of a delegate account or contract.

```java
function revoke(
  address _delegate
) external returns (bool)
```

| Param             | Type      | Required | Description                               |
| :---------------- | :-------- | :------- | :---------------------------------------- |
| `approverAddress` | `address` | required | Order struct as specified in Types below. |
| `delegateAddress` | `address` | required | Order struct as specified in Types below. |

A successful `revoke` emits a `Revoke` event.

```java
event Revoke(
  address indexed approverAddress,
  address indexed delegateAddress
);
```

# Constructor

Create a new `Swap` contract.

```java
constructor() public
```
