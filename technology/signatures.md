# Signatures

**TypeScript**. Light signatures in TypeScript can be created using the `@airswap/utils` package.

```typescript
import { UnsignedLightOrder } from '@airswap/types'
import { createLightOrder, createLightSignature } from '@airswap/utils'

const order = createLightOrder({
  nonce: string,
  expiry: string,
  signerWallet: string,
  signerToken: string,
  signerAmount: string,
  signerFee: string,
  senderWallet: string,
  senderToken: string,
  senderAmount: string,
})

const { v, r, s } = createLightSignature(
  order: UnsignedLightOrder,
  privateKey: string,
  swapContract: string,
  chainId: string,
)
```

**Python**. Light signatures in Python can be created using the [`py_eth_sig_utils`](https://pypi.org/project/py-eth-sig-utils/) package.

```python
from py_eth_sig_utils.signing import *

SIGNER_KEY = "0000000000000000000000000000000000000000000000000000000000000000"
SWAP_CONTRACT = "0x0000000000000000000000000000000000000000"

DOMAIN = "SWAP_LIGHT"
VERSION = "3"
CHAIN_ID = 1

order = {
  "nonce": 0,
  "expiry": 0,
  "signerWallet": "0x0000000000000000000000000000000000000000",
  "signerToken": "0x0000000000000000000000000000000000000000",
  "signerAmount": 0,
  "signerFee": 0,
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
    "LightOrder": [
      { "name": "nonce", "type": "uint256" },
      { "name": "expiry", "type": "uint256" },
      { "name": "signerWallet", "type": "address" },
      { "name": "signerToken", "type": "address" },
      { "name": "signerAmount", "type": "uint256" },
      { "name": "signerFee", "type": "uint256" },
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
  "primaryType": "LightOrder",
  "message": order,
}

v, r, s = sign_typed_data(data, bytes.fromhex(SIGNER_KEY))
```

## Authorized Signers

**Optional.** One account may authorize another account to sign orders on its behalf. For example, a server might sign using an account that has been authorized by a contract wallet. To manage signer authorizations, use the following functions on the [Light](https://github.com/airswap/airswap-docs/tree/2515c986727706105a3e5ebabb8cfa6df455cbb0/contract-deployments.md) contract.

```text
function authorize(address signer) external
function revoke() external
```

## EIP712

The following values are used for the EIP712Domain.

| Param | Type | Value |
| :--- | :--- | :--- |
| `name` | `bytes32` | `SWAP_LIGHT` |
| `version` | `bytes32` | `3` |
| `chainId` | `uint256` | Ethereum Mainnet: `1`, Rinkeby: `4` |
| `verifyingContract` | `address` | [Light](https://github.com/airswap/airswap-docs/tree/2515c986727706105a3e5ebabb8cfa6df455cbb0/contract-deployments.md) contract address |

