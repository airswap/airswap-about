Types is a library contract of protocol structs. [View the code on GitHub](https://github.com/airswap/airswap-protocols/tree/master/source/types).

# Structs

## `Order`

| Param     | Type        | Description                                     |
| :-------- | :---------- | :---------------------------------------------- |
| nonce     | `uint256`   | Unique per signer and should be sequential      |
| expiry    | `uint256`   | Expiry in seconds since 1 January 1970          |
| signer    | `Party`     | Party to the trade that sets terms              |
| sender    | `Party`     | Party to the trade that accepts terms           |
| affiliate | `Party`     | Party compensated for facilitating \(optional\) |
| signature | `Signature` | Signature of the order, described below         |

## `Party`

| Param  | Type      | Description                        |
| :----- | :-------- | :--------------------------------- |
| kind   | `bytes4`  | Interface ID of the token          |
| wallet | `address` | Wallet address of the party        |
| token  | `address` | Contract address of the token      |
| param  | `uint256` | Value \(ERC-20\) or ID \(ERC-721\) |


## `Signature`

| Param      | Type      | Description                                                                               |
| :------    | :-------- | :---------------------------------------------------------------------------------------- |
| signatory  | `address` | Address of the wallet used to sign                                                        |
| version    | `bytes1`  | [EIP-191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md) signature version |
| v          | `uint8`   | `v` value of an ECDSA signature                                                           |
| r          | `bytes32` | `r` value of an ECDSA signature                                                           |
| s          | `bytes32` | `s` value of an ECDSA signature                                                           |

