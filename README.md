# Bienvenue

[![Discord](https://img.shields.io/discord/590643190281928738.svg)](https://chat.airswap.io) ![Twitter Follow](https://img.shields.io/twitter/follow/airswap?style=social) ![Subreddit subscribers](https://img.shields.io/reddit/subreddit-subscribers/AirSwap?style=social) ![GitHub stars](https://img.shields.io/github/stars/airswap/airswap-protocols?style=social)

[AirSwap](https://www.airswap.io) est une communauté de développeurs ouverte, qui se concentre sur les systèmes d'échanges décentralisés. La technologie AirSwap alimente les réseaux peer-to-peer en utilisant les protocoles [RFQ](technology/request-for-quote.md) et [Last Look](technology/last-look.md), ce qui en fait le premier choix des market makers de marchés traditionnels qui entrent dans le système financier décentralisé.

## Vision et Mission

Notre vision est un avenir où toutes les formes de valeur sont représentées sous forme d'actifs numériques circulant librement et de manière fiable entre les personnes et les communautés du monde entier. Notre mission est de devenir le système standard de protocole de trading peer-to-peer : une primitive fondamentale de l'économie décentralisée.

## Technologie

AirSwap a lancé un réseau peer-to-peer pour le trading d'actifs numériques : une conception novatrice qui protège les traders du risque de contrepartie, de slippage (glissement des prix) et de front running. Tous les participants au marché peuvent se découvrir mutuellement et échanger directement en peer-to-peer en utilisant une combinaison de protocoles web et de contrats intelligents. La technologie AirSwap est open source et peut être trouvée sur [GitHub](https://github.com/airswap/).

### Avantages

À la base, AirSwap permet à deux parties d'effectuer un échange "atomique", par lequel les deux parties “réussissent” ou la transaction entière est annulée. Ce type de transaction est "sans confiance", c'est-à-dire qu'aucune des parties n'a besoin de faire confiance à l'autre pour effectuer une transaction.

* **Pas vos clés, pas vos jetons**. AirSwap est “non custodial” et sans dépôt ou Escrow. Chaque transaction se fait de pair à pair, sans risque de contrepartie, sans participants intermédiaires et sans infrastructure autre que la machine virtuelle Ethereum.
* **Compétitif et efficace**. Les sociétés de trading fournissent des liquidités via AirSwap à des prix compétitifs car elles se couvrent sur des échanges centralisés. Puisqu'il s'agit d'un système de pair à pair, le prix que vous voyez est le prix que vous obtenez, sans slippage, front running ou manipulation.
* **Aucune limite**. Chaque échange se fait entre deux parties, deux jetons et un contrat intelligent. Cela signifie que tout actif numérique conforme aux normes ERC20, ERC721 ou ERC1155 peut être échangé à un prix personnalisé et à n'importe quelle taille. Quel que soit l’échange (swap), le règlement est bon marché et efficace.

### Protocoles

Au niveau du protocole, chaque échange se fait entre deux parties, un signataire et un expéditeur. Le signataire représente la partie qui crée et signe cryptographiquement un ordre, et l'expéditeur représente  la partie qui envoie l'ordre à la blockchain Ethereum pour règlement.

* [Request-for-quote](technology/request-for-quote.md) (RFQ) est un protocole de demande-réponse automatisé pour les market makers qui utilisent des serveurs Web à partir desquels les clients demandent des ordres via JSON-RPC sur HTTP.
* [Last Look](technology/last-look.md) (LL) est un protocole de streaming automatisé qui permet aux market makers de diffuser les prix aux clients via JSON-RPC sur WebSocket, qui à leur tour soumettent des ordres au serveur pour règlement.
* [Over-the-counter](https://trader.airswap.io) (OTC) est un échange entre des contreparties connues via des applications de chat ou des emails utilisant AirSwap pour le règlement. Certaines des plus [grandes transactions](https://etherscan.io/tx/0x346a9f45c70d4f323c67fd0f348b2a8aaa7477a719557c27a8130c8873279d3b) de DeFi ont été effectuées sur AirSwap OTC.

### Applications

Plusieurs applications sont disponibles pour les utilisateurs finaux.

* [AirSwap Web](https://airswap.io) — Nouvelle application web open source pour les swaps instantanés.
* [AirSwap OTC](https://trader.airswap.io) — Interface OTC standard de l'industrie pour des swaps conséquents sur mesure.
* [AirSwap CLI](https://github.com/airswap/airswap-cli) — Interface en ligne de commande pour interagir avec AirSwap.

Plusieurs agrégateurs DEX et market makers ont implémenté AirSwap.

* [Swaps MetaMask](https://metamask.io/swaps.html) — Swap directement à partir de l'extension de navigateur du portefeuille MetaMask.
* L'activité des market makers peut être suivie sur le [tableau de bord de Dune](https://dune.xyz/queries/28752/57978).

## Communauté

AirSwap est un actif communautaire appartenant à ses détenteurs de tokens, fonctionnant comme un projet ouvert avec un processus transparent de prise de décisions et de développement de produits. La technologie et l'organisation du réseau visent toutes deux à une décentralisation maximale. Les membres de la communauté “stakent” des jetons AirSwap (AST) pour participer à la gouvernance et aux autres activités et avantages de la communauté. L'idéation, la rédaction, le vote et l'acceptation des propositions sont un processus ouvert.

AirSwap is **accessible**, **équitable**, et **transparent**. Chaque participant et contributeur est traité équitablement et récompensé de manière cohérente. Toutes les opportunités sont inclusives et accessible. Les décisions sont prises ouvertement et les contributions sont open source. Les nouvelles informations sont continuellement et activement partagées tout au long du processus.

### Token

AirSwap a été lancé avec le token AirSwap (AST) le [10 octobre 2017](https://medium.com/fluidity/airswap-token-launch-report-fbd04b748eb1) fonctionnant sur le réseau original de swap peer-to-peer. Le token a initialement permis aux traders d'annoncer leur disponibilité et fonctionne également aujourd'hui comme un moyen pour les contributeurs de participer à la gouvernance et au développement. AST donne à ses détenteurs la possibilité de travailler à la mesure de leurs avoirs, et la possibilité de gagner à la mesure de leur contribution, ce qui nécessite fondamentalement une participation active. AST est la porte d'entrée pour rejoindre et contribuer à la communauté AirSwap.

Pour en savoir plus, consultez le [plan de trésorerie des tokens voté par la communauté](https://github.com/airswap/airswap-aips/issues/10) et le [guide des votants](guides/voters.md).

### Principes

La gouvernance décentralisée commence par des principes partagés pour aligner notre prise de décision.

1. **Concevoir pour la simplicité** — La perfection est atteinte lorsqu'il n'y a plus rien à enlever. Cela est particulièrement vrai pour les technologies et les applications basées sur la blockchain.
2. **Priorité à la sécurité** — Notre travail s'effectue dans un cadre contradictoire. Alors que la blockchain exige que les utilisateurs prennent leur sécurité en main, ils font confiance à AirSwap pour être conçu et fonctionner de manière sécurisée.
3. **Décidez avec des données** — Prenez des décisions avec des données qui comptent. Les indicateurs de performance d'AirSwap sont le volume d'échange, les détenteurs de tokens, l'engagement de la communauté et les tokens utilisés pour la gouvernance.
4. **Rechercher des opportunités** — La finance décentralisée regorge d'opportunités. Recherchez et priorisez les opportunités qui ont un impact positif à la fois sur AirSwap et sur l'écosystème au sens large.
5. **Gagner ensemble** — Notre communauté s'étend sur des plateformes à travers le cyberespace et des pays à travers le monde. Nous nous développons en partageant les responsabilités et en célébrant chaque succès.

### Gouvernance

Pour générer les nouvelles idées et directions du projet, tout en cultivant une prise de décision ouverte, nous utilisons un processus appelé "AirSwap Improvement Proposals" (AIP). Les AIPs donnent à la communauté un moyen de développer et soumettre des propositions aux contributeurs principaux, le tout, sur une base continue. Pour plus d'informations, voir [AIP 1](https://github.com/airswap/airswap-aips/issues/1) et consulter [toutes les propositions actives](https://github.com/airswap/aips). Ce processus est la façon dont la communauté attire, sélectionne et priorise les nouveaux projets.

Chaque AIP est ratifié en l'appelant au vote et en étant acceptée par la communauté des détenteurs de tokens. Le vote a lieu sur [Codefi Activate](https://activate.codefi.network/staking/airswap/governance).  Pour participer à la gouvernance, consultez le guide des [Votants](guides/voters.md). Une fois les votes terminés, les propositions sont considérées comme finalisées et placées dans un "backlog" pour être sélectionnées par les contributeurs. En fonction des exigences et de la faisabilité, les contributeurs peuvent accepter la proposition pour la prioriser et la mettre en œuvre.

## Histoire

AirSwap a été [lancé le 10 octobre 2017](https://medium.com/fluidity/airswap-token-launch-report-fbd04b748eb1). Au fil des ans, de nouveaux produits et des mises à jour ont été publiés en permanence dans le but de populariser davantage les avantages du commerce d'actifs numériques à l'aide de protocoles décentralisés. Vous pouvez consulter ici le résumé des années [2018](https://medium.com/fluidity/2018-a-year-in-review-d7f5cb0e5d76) et [2019](https://medium.com/fluidity/2019-a-year-in-review-6b40035e6edb).

* [Roadmap AirSwap](https://medium.com/fluidity/the-airswap-roadmap-1c1a3c3b20d3) (16 novembre 2017)
* [AirSwap est là](https://medium.com/fluidity/airswap-is-here-c83c001d5bbe) (25 avril 2018)
* [Spaces est là](https://medium.com/fluidity/spaces-is-here-a36fa6753474) (10 octobre 2018)
* [AirSwap Instant 2.0](https://medium.com/fluidity/airswap-instant-2-0-d10906447838) (26 avril 2019)
* [AirSwap Trader](https://medium.com/fluidity/introducing-airswap-trader-63a0ef9e67c0) (6 août 2019)
* [AirSwap Delegates](https://medium.com/fluidity/introducing-airswap-delegates-1c3db83be1db) (4 février 2020)
* [Lancement de la phase II](https://twitter.com/airswap/status/1346542008345747457) et [fin de la transition](https://twitter.com/airswap/status/1359190898110853122) (2021)

Ayant atteint ses objectifs initiaux et livré sa feuille de route (roadmap) technologique, AirSwap est maintenant un projet ouvert et une communauté de contributeurs qui poursuivent des initiatives pour continuer à développer et à faire croître le réseau.

* **AirSwap** est reconnu par…
  * **St. Louis Fed** comme le premier protocole d'échange de pair à pair [→](https://research.stlouisfed.org/publications/review/2021/02/05/decentralized-finance-on-blockchain-and-smart-contract-based-financial-markets)
  * **MIT Technology Review** comme un protocole construit pour survivre [→](https://www.technologyreview.com/2018/02/22/145100/when-the-cryptocurrency-bubble-pops-these-tokens-are-built-to-survive/)
  * **Stanford Journal** sur Blockchain Law and Policy [→](https://stanford-jblp.pubpub.org/pub/deconstructing-dex/release/1)
  * _**Trust Machine**_, un film de 2018 sur l'industrie de la blockchain [→](https://www.imdb.com/title/tt7407496/)
* Utilisé pour le **tout premier échange de pair à pair** d'un titre tokenisé [→](https://tokenist.com/airswap-facilitates-first-compliant-security-token-transfer-on-a-public-blockchain/)
* **Classé n°1 en matière de sécurité** parmi les échanges décentralisés (DEX) [→](https://icorating.com/pdf/65/1/pnN3XH96SRWtSs1YMNn2MSw805II3mD7UwKyMrPA.pdf)
* Membre fondateur de **"wrapped bitcoin" (WBTC)** pour représenter le bitcoin sur Ethereum [→](https://www.bitgo.com/newsroom/press-releases/wbtc-brings-bitcoin-to-ethereum)
* Actif dans la **communauté Ethereum** et champion de la technologie [→](https://medium.com/fluidity/airswap-devcon-5-43adcf758ba8)

## Explorez

* [Serveur Discord](https://chat.airswap.io) d'AirSwap
* [Portail de vote](https://activate.codefi.network/staking/airswap/governance) d'AirSwap
* [Twitter](https://twitter.com/airswap) d'AirSwap
