Ensure the AirSwap CLI is installed.

```
$ yarn global add airswap
```

In development, ensure the current chain is set to `4` with the `airswap chain` command. The following examples assume you're runnning a local development server at `http://localhost:3000`.

Request a maximum quote to see what's available.

```
$ airswap quote:max
AirSwap CLI 1.3.8 — https://support.airswap.io/

get a max quote from a peer RINKEBY

locator:  http://localhost:3000
buy or sell:  buy
token:  weth
for:  dai

Response: http://localhost:3000

Selling up to 0.25 WETH for 100 DAI
```

Request a quote for 0.1 WETH.

```
$ airswap quote:get
AirSwap CLI 1.3.8 — https://support.airswap.io/

get a quote from a peer RINKEBY

locator:  http://localhost:3000
buy or sell:  buy
amount:  0.1
of:  weth
for:  dai

Quote from http://localhost:3000

✨ Buy 0.1 WETH for 40 DAI
Price 0.0025 WETH/DAI (400 DAI/WETH)
```

You can debug all [Quote and Order API](../system/apis.md) methods using [AirSwap CLI commands](https://github.com/airswap/airswap-cli).
