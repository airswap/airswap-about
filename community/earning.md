---
description: Learn how community members get rewarded by contributing to AirSwap
---

## Circle Funding

The contributor circle is funded from two sources - a base level of funding distributed from the treasury, and a bonus funding pool derived from trade fees collected. The base fundings are distributed in AST while the bonus fundings are distributed in the currency of the consolidated token pool (currently WETH).

Circle funds will be then distributed based on individual contributions during each cycle.

| Circle       | Base (AST)        | Bonus (in development)      |
| ------------ | ----------------- | --------------------------- |
| Contributors | 30,000 USD in AST | 14% of trade fees collected |

{% hint style="info" %}
The base funding amount does not guarantee a minimum to be earned by each contributor. Instead, base funds are summed up and split among contributors based on their allocations within Coordinape.

_Base funding level is subject to monthly review and can change._
{% endhint %}

## Circle Allocation

After each monthly cycle, the [Coordinape ](https://coordinape.com)circle will open for all contributors to reward their co-workers with GIVE tokens. Contributors will start with 100 GIVE tokens. These GIVE tokens are used to reward team members with according to their impact in the circle during the current cycle.

After the allocation period is complete, any GIVE tokens not distributed will be burnt (there is no use holding GIVE tokens for yourself!). Individual contributors will be rewarded from the base/bonus circle funds proportionally to their GIVE allocations received.

{% hint style="info" %}
The GIVE allocation system is open and transparent, so GIVE fairly and honestly!
{% endhint %}

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
