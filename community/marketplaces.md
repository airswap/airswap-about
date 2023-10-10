# Marketplace Admin Guide

Welcome to the NFT marketplace admin guide. Setup is a breeze.

# Get the code

From https://github.com/airswap/airswap-marketplace...
- Option 1: Clone the repository
- Option 2: Download a zip file

# Set up environment
Environment variables are required to be set.

- `REACT_APP_CHAIN_ID` — the chain ID the app will run on
- `REACT_APP_COLLECTION_NAME` — a collection name to include on the app
- `REACT_APP_COLLECTION_IMAGE` — a collection cover image to include on the app
- `REACT_APP_COLLECTION_TOKEN` — the ERC721 token address for the collection
- `REACT_APP_CURRENCY_TOKEN` — the ERC20 token address to use as currency
- `REACT_APP_STORAGE_SERVER_URL` — [optional] a server URL to use for listing storage
- `REACT_APP_RPC_URL_X` — [optional] a server URL to fetch on-chain data where X is chain ID
- `REACT_APP_WALLET_CONNECT_PROJECT_ID` — [optional] project ID to support wallet connect

# Deploy your app

- GitHub Pages — Free static site hosting on GitHub. If you fork or otherwise copy the Marketplace codebase into your own repository you can set up deploys to Pages with the following guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Other — The build generates static assets that can be easily published to any hosting service.

# Contributions

AirSwap is an open-source development community. If you would like to bugfix, improve, or otherwise contribute to the Marketplace codebase, please see the [repository on GitHub](https://github.com/airswap/airswap-marketplace).