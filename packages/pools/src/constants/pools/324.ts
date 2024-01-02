import { zksyncTokens } from '@dneroswap/tokens'
import { getAddress } from 'viem'

import { PoolCategory, SerializedPool } from '../../types'

export const livePools: SerializedPool[] = []
// .map((p) => ({
//   ...p,
//   contractAddress: getAddress(p.contractAddress),
//   stakingToken: p.stakingToken.serialize,
//   earningToken: p.earningToken.serialize,
// }))

// known finished pools
export const finishedPools: SerializedPool[] = [
  {
    sousId: 1,
    stakingToken: zksyncTokens.wdnero,
    earningToken: zksyncTokens.tes,
    contractAddress: '0xedB2E9eB4fc47d57c08B387775e09E5fC9e21EBE',
    poolCategory: PoolCategory.CORE,
    tokenPerSecond: '0.02546',
    version: 3,
  },
].map((p) => ({
  ...p,
  isFinished: true,
  contractAddress: getAddress(p.contractAddress),
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

export const pools: SerializedPool[] = [...livePools, ...finishedPools]