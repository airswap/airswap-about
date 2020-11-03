Ensure the AirSwap CLI is installed.

```
$ yarn global add airswap
```

Once your Server is up and running at a **public URL**, you're ready to add it to the Indexer. First, ensure an account is set with the `airswap account:import` command. You can but are not required to use the same Ethereum account that your Server is using.

Let's take a look at the available Indexer commands.

```
$ airswap indexer
AirSwap CLI 1.3.8 — https://support.airswap.io/
get, set, and unset intents on the indexer

USAGE
  $ airswap indexer:COMMAND

COMMANDS
  indexer:enable  enable staking on the indexer
  indexer:get     get intents from the indexer
  indexer:new     create an index for a new token pair
  indexer:set     set an intent
  indexer:unset   unset an intent
```

Now run the following command to enable staking for your account.

```
$ airswap indexer:enable
```

Run the following command to set your intent to trade.

```
$ airswap indexer:set
```

| Param         | Type            | Description                                     |
| :------------ | :-------------- | :---------------------------------------------- |
| `buy or sell` | `buy` or `sell` | Whether you intend to buy or sell a token.      |
| `token`       | `token`         | Token you intend to buy or sell.                |
| `for`         | `token`         | Base token to buy or sell for.                  |
| `locator`     | `locator`       | URL of your Server where `https://` is implied. |
| `stakeAmount` | `number`        | Number of AirSwap Tokens to stake.              |

To ensure your intent was correctly set, you can query the opposite side of your intent on the indexer. For example, if you set an intent to sell DAI for WETH, you would query to buy DAI for WETH with the `indexer:get` command.

```
$ airswap indexer:get
AirSwap CLI 1.3.8 — https://support.airswap.io/

get intents from the indexer RINKEBY

Indexer 0x10F6702447414cE1250Af5f7000D7c9A0f04E824

buy or sell:  buy
token:  dai
for:  weth

Top peers selling DAI for WETH (HTTPS)

Staked  Locator
------  ------------------------------
100     mymaker.vercel.app
```

Now that your Server is running and has been added to the Indexer, your quotes will be returned among results of the `airswap quote:best` command and aggregators like [MetaMask Swaps](https://medium.com/metamask/introducing-metamask-swaps-84318c643785).

```
$ airswap quote:best
AirSwap CLI 1.3.8 — https://support.airswap.io/

get the best available quote RINKEBY

buy or sell:  buy
amount:  0.1
of:  weth
for:  dai

Requesting from 3 peers... done

Quote from mymaker.vercel.app

✨ Buy 0.1 WETH for 40 DAI
Price 0.0025 WETH/DAI (400 DAI/WETH)
```
