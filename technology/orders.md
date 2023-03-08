AirSwap orders are mutually signed instructions to perform an atomic swap. Prior to execution, both the signer (party that creates and signs the order) and sender (party that sends the order to the EVM) must have approved the swap contract to transfer the specified tokens on their behalf.

## Properties

An `OrderERC20` has the following properties:

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

Orders are passed to the [Swap](https://docs.airswap.io/contract-deployments) contract for execution, which emits a `Swap` event on success. The `swapLight` function is more efficient, whereas the `swap` function provides protocol fee rebates to staked AST holders. Either function can execute a properly signed order.

```typescript
  function swapLight(
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
  ) external;
```

# Signatures

AirSwap signatures are [EIP712](https://eips.ethereum.org/EIPS/eip-712), which includes a domain separator to avoid replays across chains.

**TypeScript**. Swap signatures in TypeScript can be created using the `@airswap/utils` package.

```typescript
import { UnsignedOrder } from '@airswap/types'
import { createOrderERC20, createOrderERC20Signature } from '@airswap/utils'

const order = createOrderERC20({
  nonce: string,
  expiry: string,
  signerWallet: string,
  signerToken: string,
  signerAmount: string,
  protocolFee: string,
  senderWallet: string,
  senderToken: string,
  senderAmount: string,
})

const { v, r, s } = createOrderERC20Signature(
  order: UnsignedOrder,
  privateKey: string,
  swapContract: string,
  chainId: string,
)
```

**Python**. Swap signatures in Python can be created using the [`py_eth_sig_utils`](https://pypi.org/project/py-eth-sig-utils/) package.

```python
from py_eth_sig_utils.signing import *

SIGNER_KEY = "0000000000000000000000000000000000000000000000000000000000000000"
SWAP_CONTRACT = "0x0000000000000000000000000000000000000000"

DOMAIN = "SWAP"
VERSION = "4"
CHAIN_ID = 1

order = {
  "nonce": 0,
  "expiry": 0,
  "signerWallet": "0x0000000000000000000000000000000000000000",
  "signerToken": "0x0000000000000000000000000000000000000000",
  "signerAmount": 0,
  "protocolFee": 0,
  "senderWallet": "0x0000000000000000000000000000000000000000",
  "senderToken": "0x0000000000000000000000000000000000000000",
  "senderAmount": 0
}

data = {
  "types": {
    "EIP712Domain": [
      { "name": "name", "type": "string" },
      { "name": "version", "type": "string" },
      { "name": "chainId", "type": "uint256" },
      { "name": "verifyingContract", "type": "address" },
    ],
    "OrderERC20": [
      { "name": "nonce", "type": "uint256" },
      { "name": "expiry", "type": "uint256" },
      { "name": "signerWallet", "type": "address" },
      { "name": "signerToken", "type": "address" },
      { "name": "signerAmount", "type": "uint256" },
      { "name": "protocolFee", "type": "uint256" },
      { "name": "senderWallet", "type": "address" },
      { "name": "senderToken", "type": "address" },
      { "name": "senderAmount", "type": "uint256" },
    ]
  },
  "domain": {
    "name": DOMAIN,
    "version": VERSION,
    "chainId": CHAIN_ID,
    "verifyingContract": SWAP_CONTRACT,
  },
  "primaryType": "OrderERC20",
  "message": order,
}

v, r, s = sign_typed_data(data, bytes.fromhex(SIGNER_KEY))
```

## Authorized Signers

**Optional.** One account may authorize another account to sign orders on its behalf. For example, a server might sign using an account that has been authorized by a contract wallet. To manage signer authorizations, use the following functions on the [SwapERC20](deployments.md) contract.

```text
function authorize(address signer) external
function revoke() external
```

## EIP712

The following values are used for the EIP712Domain.

| Param               | Type      | Value                               |
| :------------------ | :-------- | :---------------------------------- |
| `name`              | `bytes32` | `SWAP_ERC20`                        |
| `version`           | `bytes32` | `4`                                 |
| `chainId`           | `uint256` | Ethereum Mainnet: `1`, Goerli: `5`  |
| `verifyingContract` | `address` | [SwapERC20](deployments.md) address |
