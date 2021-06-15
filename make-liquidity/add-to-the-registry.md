Ensure the AirSwap CLI is installed.

```
$ yarn global add airswap
```

Once your [Server](./run-a-server.md) is up and running at a **public URL**, you're ready to add it to the Registry. First, ensure an account is set with the `airswap account:import` command. You can but are not required to use the same Ethereum account that your Server is using.

Let's take a look at the available Registry commands.

```
$ airswap registry
AirSwap CLI 1.6.0 — https://airswap.io/
add and remove supported tokens

USAGE
  $ airswap registry:COMMAND

COMMANDS
  registry:add     add supported tokens to the registry
  registry:enable  enable staking on the registry
  registry:get     get urls from the registry
  registry:list    list supported tokens from registry
  registry:remove  remove supported tokens from the registry
  registry:url     set server url on the registry
```

First run the following command to enable staking for your account.

```
$ airswap registry:enable
```

Now run the following command to set your server url on the registry.

```
$ airswap registry:url
```

Now run the following command to add tokens you support.

```
$ airswap registry:add
```

To ensure your configuration is correct, you can query tokens that you support on the registry.

```
$ airswap indexer:get
AirSwap CLI 1.6.0 — https://airswap.io/

get urls from the registry RINKEBY

Registry 0xa77fbeD39D5128e1cA9795d68D73010851393BCc

Token pair (e.g. WETH/USDT):  DAI/WETH

Server
----------------------------------------
https://maker.example.com/
```

Now that your Server is running and has been added to the Registry, your quotes will be returned among results of the `airswap order:best` command and aggregators like [MetaMask Swaps](https://medium.com/metamask/introducing-metamask-swaps-84318c643785).

```
$ airswap order:best
AirSwap CLI 1.6.0 — https://airswap.io/

get the best available order MAINNET

full or light:  light
buy or sell:  buy
amount:  0.1
of:  weth
for:  dai

Quote from https://maker.example.com/

✨ Buy 0.1 WETH for 250 DAI
Price 0.0004 WETH/DAI (2500 DAI/WETH)
```
