When testing smart contracts that work with tokens, you frequently want to gather current token balances and allowances and verify their values. We created a helper library to abstract away some of the complexity of doing this, so that you can check the balances and allowances of addresses with just 1 line of code.

You can find the `balances.js` library on NPM within [@airswap/test-utils](https://www.npmjs.com/package/@airswap/test-utils) or on the [Airswap GitHub](https://github.com/airswap/airswap-protocols/blob/master/utils/test-utils/src/balances.js)

# Functions

## `balances`

Verifies the balances are correct for a list of different tokens, for a single provided user address.

| Param      | Type                  | Description                                   |
| :--------- | :-------------------- | :-------------------------------------------- |
| `account`  | `address`             | The address of the token owner.               | 
| `balances` | `[[address, integer]]`| Pairs of token address with expected balance. |

e.g. to verify that Alice has 500 AST and 20 WETH at a given moment in time:

`await balances(aliceAddress, [[ASTaddress, 500], [WETHaddress, 20]])`

**Returns** `true` if all balances are correct. i.e. `true` if Alice has 500 AST and 20 WETH.

## `allowances`

Verifies the allowances are correct for a list of different tokens, for a single provided owner and spender pair.

| Param        | Type                  | Description                                     |
| :----------- | :-------------------- | :---------------------------------------------- |
| `account`    | `address`             | The address of the token owner.                 | 
| `withdrawer` | `address`             | The address of the token spender.               | 
| `balances`   | `[[address, integer]]`| Pairs of token address with expected allowance. |

e.g. to verify that the Swap contract has allowance to transfer 500 AST and 20 WETH owned by Alice:

`await allowances(aliceAddress, swapAddress, [[ASTaddress, 500], [WETHaddress, 20]])`

**Returns** `true` if all allowances are satisfied.
