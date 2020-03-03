Validator is a smart contract used to check for failures prior to attempting a swap.

# Validator Client

Add the `@airswap/protocols` package to your application.

```bash
$ yarn add @airswap/protocols
```

Import the Validator client.

```TypeScript
import { Validator } from '@airswap/protocols'
```

### `constructor`

Create a new `Validator` client.

```TypeScript
public constructor(
  chainId = chainIds.RINKEBY,
  walletOrProvider?: ethers.Wallet | ethers.providers.Provider
)
```

| Param              | Type                                        | Optionality | Description                                                                                                                                                                     |
| :----------------- | :------------------------------------------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `chainId`          | `string`                                    | `optional`  | Ethereum chain ID of the network to connect to, either `1` or `4`.                                                                                                              |
| `walletOrProvider` | `ethers.Wallet` or `ethers.providers.Provider` | `optional`  | Ethers [wallet](https://docs.ethers.io/ethers.js/html/api-wallet.html) or [provider](https://docs.ethers.io/ethers.js/html/api-providers.html) to use for the contract instance |

#### Basic Example
Create a client for the Rinkeby Validator using the default provider.

```TypeScript
const validator = new Validator();
```

#### Custom Provider Example
Create a client for the Mainnet Validator using an INFURA provider.

```TypeScript
import { chainIds } from '@airswap/constants'
const provider = new ethers.providers.InfuraProvider(...)
const validator = new Validator(chainIds.MAINNET, provider);
```

See a list of available providers on the [ethers.js documentation](https://docs.ethers.io/ethers.js/html/api-providers.html#connecting-to-ethereum).

### `getReason`

Get a plain language reason for a swap failure.

```TypeScript
public static getReason(reason: string): string
```

| Param    | Type     | Optionality | Description                                    |
| :------- | :------- | :---------- | :--------------------------------------------- |
| `reason` | `string` | `required`  | The error text emitted by a `check*` function. |

### `checkSwap`

Check [swap](./swap.md#swap) given an order.

```TypeScript
public async checkSwap(order: Order): Promise<Array<string>>
```

| Param   | Type    | Optionality | Description                      |
| :------ | :------ | :---------- | :------------------------------- |
| `order` | `Order` | `required`  | The order that would be swapped. |

### `checkWrappedSwap`

Check swap through a [Wrapper](./wrapper.md) given an order.

```TypeScript
public async checkWrappedSwap(
  order: Order,
  fromAddress: string,
  wrapperAddress: string
): Promise<Array<string>>
```

| Param            | Type      | Optionality | Description                                     |
| :--------------- | :-------- | :---------- | :---------------------------------------------- |
| `order`          | `Order`   | `required`  | Order that would be swapped.                    |
| `fromAddress`    | `address` | `required`  | Wallet address that would send the transaction. |
| `wrapperAddress` | `address` | `required`  | Address of the wrapper contract to use.         |

### `checkDelegate`

Check swap through a [Delegate](./delegate.md) given an order.

```TypeScript
public async checkDelegate(
  order: Order,
  delegateAddress: string
): Promise<Array<string>>
```

| Param             | Type      | Optionality | Description                              |
| :---------------- | :-------- | :---------- | :--------------------------------------- |
| `order`           | `Order`   | `required`  | Order that would be swapped.             |
| `delegateAddress` | `address` | `required`  | Address of the delegate contract to use. |

### `checkWrappedDelegate`

Check swap through a [Wrapper](./wrapper.md) and [Delegate](./delegate.md) given an order.

```TypeScript
public async checkWrappedDelegate(
  order: Order,
  delegateAddress: string,
  wrapperAddress: string
): Promise<Array<string>>
```

| Param             | Type      | Optionality | Description                              |
| :---------------- | :-------- | :---------- | :--------------------------------------- |
| `order`           | `Order`   | `required`  | Order that would be swapped.             |
| `delegateAddress` | `address` | `required`  | Address of the delegate contract to use. |
| `wrapperAddress`  | `address` | `required`  | Address of the wrapper contract to use.  |
