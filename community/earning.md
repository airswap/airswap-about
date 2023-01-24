---
description: Learn how community members get rewarded by contributing to AirSwap
---

## Circle Funding

Contributor circles are rewarded by a percentage of protocol fees (14% at time of writing). In case of a shortfall against the monthly base amount (below), AST is withdrawn from `treasury.airswap.eth` to ensure the monthly base amount is met.

| Number of Unique Contributors | Monthly Base Amount (USD) |
| ----------------------------- | ------------------------- |
| 15 - 20                       | $30,000                   |
| 21 - 25                       | $35,000                   |
| 26 - 30                       | $40,000                   |

The funds are allocated to two Coordinape circles. The Tech circle funds development and design activities for building our protocols and products. The Growth circle funds direction and marketing activities for growing the protocol.

The distribution of funds between the two circles depends on the number of Contributors in each circle. A larger weight is placed on the Tech circle to prioritize our activities on building the protocol and product.

| Circle | Allocation (%)                                          |
| ------ | ------------------------------------------------------- |
| Tech   | $$ 1.4 _ N\_{tech} \over 1.4 _ N*{tech} + N*{growth} $$ |
| Growth | $$ N*{growth} \over 1.4 \* N*{tech} + N\_{growth} $$    |

{% hint style="info" %}
The base funding amount does not guarantee a minimum to be earned by each contributor. Instead, base funds are split among contributors based on their allocations within Coordinape.

_Funding levels are subject to review and can change._
{% endhint %}

## Circle Allocation

### Describing your Contributions

Each month, a Contributions thread will be opened on [Discord](https://chat.airswap.io). Anyone who has contributed to AirSwap in that month should summarize their contributions for the month in that thread.

{% hint style="info" %}
Communicating your contributions to AirSwap is part of your responsibility as a Contributor. Help your fellow contributors by clearly stating what you have achieved for the month.
{% endhint %}

{% hint style="warning" %}
If you have not contributed for the month, remember to **Opt-out** of receiving GIVE for that epoch. Anyone who did not describe their contributions or opt out will be removed from the circle and will have to be re-nominated for future rounds.
{% endhint %}

### Nomination and Vouching

New Contributors who have recently contributed to AirSwap will need to be nominated and vouched in by 3 Contributors before they can enter the Coordinape circle. If you have not yet been added to the circle, please ping someone you have worked with who can vouch for your work.

{% hint style="info" %}
Once you have been vouched into the circle, check that it is visible on [Coordinape](https://coordinape.com) and ping @Ops to receive your **Contributor** role in Discord!
{% endhint %}

### Allocating GIVE

[Coordinape](https://coordinape.com) circles will open 1st - 6th of each month for all contributors to reward their co-workers with GIVE tokens. Contributors will start with 100 GIVE tokens. These GIVE tokens are used to reward team members with according to their impact in the circle during the current cycle.

After the allocation period is complete, any GIVE tokens not distributed will be burnt (there is no use holding GIVE tokens for yourself!). Individual contributors will be rewarded from the circle funds proportionally to their GIVE allocations received.

{% hint style="info" %}
The GIVE allocation system is open and transparent, so GIVE fairly and honestly!
{% endhint %}

## KPI incentives

To priotize development and growth of the protocol, bonus funding was enabled upon hitting certain KPI metrics for DeFi and NFT Marketplace integrations. Contributors who help to achieve the objectives can qualify to receive part of the KPI incentive rewards.

| Objective                                                                                               | Deadline  | Budget (AST) |
| ------------------------------------------------------------------------------------------------------- | --------- | ------------ |
| [Increase protocol volumes through new aggregators](https://github.com/airswap/airswap-aips/issues/82)  | June 2023 | Up to 850K   |
| [Establish NFT marketplaces using AirSwap protocols](https://github.com/airswap/airswap-aips/issues/83) | June 2023 | Up to 275K   |

## Voting Rewards

At the end of each voting period, a number of points is awarded based on the number of AST used to vote. Points enable you to claim a certain percentage of the rewards pool based on the formula

$$
R = B * (P / (10^S +P )) * M/100
$$

where R is the rewards you can obtain, P is the number of points used to claim (multiplied by 10^4), B is the token balance in the rewards pool, S and M are community adjustable parameters (currently set to S = 10 and M = 100).

The formula results in rewards being distributed on a smooth curve based on the number of points used to claim.

![Current rewards are distributed on a curve based on the number of points](../.gitbook/assets/rewards.svg)

⚠ Note that fees are continuously streaming into the community pool and participants are continuously claiming tokens. Due to the dynamic nature of this process, slippage on claims is possible.

{% hint style="info" %}
You can [see the tokens in the pool](https://app.zerion.io/0x7296333e1615721f4Bd9Df1a3070537484A50CF8/overview) and [calculate potential rewards using this dashboard](https://dune.xyz/agrimony/airswap_3).
{% endhint %}
