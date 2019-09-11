Swap is a non-custodial trade settlement contract. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/swap).

# Deployments

| Version | Network | Address                                                                                                                         |
| :------ | :------ | :------------------------------------------------------------------------------------------------------------------------------ |
| `2.1.0` | Mainnet | [`0x251F752B85a9F7e1B3C42D802715B5D7A8Da3165`](https://etherscan.io/address/0x251F752B85a9F7e1B3C42D802715B5D7A8Da3165)         |
| `2.1.0` | Rinkeby | [`0x6f337bA064b0a92538a4AfdCF0e60F50eEAe0D5B`](https://rinkeby.etherscan.io/address/0x6f337bA064b0a92538a4AfdCF0e60F50eEAe0D5B) |

# Constructor

Create a new `Swap` contract.

```js
constructor() public
```

# `swap`

An atomic token swap between a maker and a taker.

```text
function swap(
  Types.Order calldata _order
) external
```

| Param    | Type    | Description                               |
| :------- | :------ | :---------------------------------------- |
| `_order` | `Order` | Order struct as specified in Types below. |

## Preconditions

- The makerWallet must approve the Swap contract to transfer the makerToken.
- The takerWallet must approve the Swap contract to transfer the takerToken.

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

# `invalidate`

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

# `authorize`

Authorize a delegate account or contract to make \(sign\) or take \(send\) Orders on the sender's behalf.

```text
function authorize(address _delegate, uint256 _expiry) external returns (bool)
```

A successful `authorize` emits an `Authorize` event.

```text
event Authorize(
  address indexed approverAddress,
  address indexed delegateAddress,
  uint256 expiry
);
```

# `revoke`

Revoke the authorization of a delegate account or contract.

```text
function revoke(address _delegate) external returns (bool)
```

A successful `revoke` emits a `Revoke` event.

```text
event Revoke(
  address indexed approverAddress,
  address indexed delegateAddress
);
```
