const fs = require('fs')
const {getEtherscanWalletURL} = require('@airswap/utils')

const contracts = [{
  name: 'Swap',
  deploys: require('@airswap/swap/deploys')
}, {
  name: 'Registry',
  deploys: require('@airswap/maker-registry/deploys')
}, {
  name: 'Wrapper',
  deploys: require('@airswap/wrapper/deploys')
}, {
  name: 'Pool',
  deploys: require('@airswap/pool/deploys')
}, {
  name: 'Staking',
  deploys: require('@airswap/staking/deploys')
}, {
  name: 'AST',
  deploys: require('@airswap/constants').stakingTokenAddresses
}]

const mainnets = [{
  name: 'Ethereum',
  id: 1
}, {
  name: 'BSC',
  id: 56
}, {
  name: 'Polygon',
  id: 137
}, {
  name: 'Arbitrum',
  id: 42161
}, {
  name: 'Avalanche',
  id: 43114
}]

const testnets = [{
  name: 'Ethereum: Goerli',
  id: 5
}, {
  name: 'BSC: Testnet',
  id: 97
}, {
  name: 'Polygon: Mumbai',
  id: 80001
}, {
  name: 'Arbitrum: Goerli',
  id: 421613
}, {
  name: 'Avalanche: Fuji',
  id: 43113
}]

function printContracts(contracts, chainid) {
  let md = ''
  for (let contract in contracts) {
    let address = contracts[contract].deploys[chainid]
    md += `- ${contracts[contract].name} — [\`${address}]\`](${getEtherscanWalletURL(chainid, address)}#code)\n`
  }
  return md
}

let markdown = "# Deployments\n\n## Mainnets\n\n"
for (let net in mainnets) {
  markdown += `### ${mainnets[net].name} (${mainnets[net].id})\n\n${printContracts(contracts, mainnets[net].id)}\n`
}

markdown += "## Testnets\n\n"
for (let net in testnets) {
  markdown += `### ${testnets[net].name} (${testnets[net].id})\n\n${printContracts(contracts, testnets[net].id)}\n`
}

markdown += '## Legacy\n\n\
- Swap (V2) — [`0x4572f2554421Bd64Bef1c22c8a81840E8D496BeA`](https://etherscan.io/address/0x4572f2554421Bd64Bef1c22c8a81840E8D496BeA#code)\n\
- Staking (V2) [`0x579120871266ccd8de6c85ef59e2ff6743e7cd15`](https://etherscan.io/address/0x579120871266ccd8de6c85ef59e2ff6743e7cd15#code)\n\
- Staking (Legacy) [`0xa4C5107184a88D4B324Dd10D98a11dd8037823Fe`](https://etherscan.io/address/0xa4C5107184a88D4B324Dd10D98a11dd8037823Fe#code)\n\
- Staking (Deprecated) [`0x704c5818b574358dfb5225563852639151a943ec`](https://etherscan.io/address/0x704c5818b574358dfb5225563852639151a943ec#code)\n'

fs.writeFileSync(
  './technology/deployments.md',
  markdown
)
console.log(markdown)