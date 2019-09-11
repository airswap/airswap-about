Wrapper enables traders to use ETH for WETH trades. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/protocols/swap).

# Deployments

| Contract | Version    | Network | Address                                                                                                                         |
| :------- | :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------ |
| Wrapper  | `0.2.0`    | Mainnet | [`0x5abcFbD462e175993C6C350023f8634D71DaA61D`](https://etherscan.io/address/0x5abcFbD462e175993C6C350023f8634D71DaA61D)         |
| ↳ Swap   | `2.1.0`    | Mainnet | [`0x251F752B85a9F7e1B3C42D802715B5D7A8Da3165`](https://etherscan.io/address/0x251F752B85a9F7e1B3C42D802715B5D7A8Da3165)         |
| ↳ WETH   | `external` | Mainnet | [`0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)         |
|          |            |         |
| Wrapper  | `0.2.0`    | Rinkeby | [`0x15FC598E31B98D73a7d56e10f079b827cb97Af82`](https://rinkeby.etherscan.io/address/0x15FC598E31B98D73a7d56e10f079b827cb97Af82) |
| ↳ Swap   | `2.1.0`    | Rinkeby | [`0x6f337bA064b0a92538a4AfdCF0e60F50eEAe0D5B`](https://etherscan.io/address/0x6f337bA064b0a92538a4AfdCF0e60F50eEAe0D5B)         |
| ↳ WETH   | `external` | Rinkeby | [`0xc778417E063141139Fce010982780140Aa0cD5Ab`](https://etherscan.io/address/0xc778417E063141139Fce010982780140Aa0cD5Ab)         |

# Constructor

Create a new `Wrapper` contract.

```js
constructor(
  address _swapContract,
  address _wethContract
) public {
```

# `swap`

Performs wrapping and unwrapping if necessary and calls `_swapContract.swap`.

```text
function swap(
  Types.Order calldata _order
) external payable {
```

| Param    | Type    | Description                                     |
| :------- | :------ | :---------------------------------------------- |
| `_order` | `Order` | Order struct as specified in [Types](types.md). |

---

| Precondition                                                           |
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
