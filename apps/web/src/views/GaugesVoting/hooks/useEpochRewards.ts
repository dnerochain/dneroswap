import { useQuery } from '@tanstack/react-query'
import { WEEK } from 'config/constants/veWDnero'
import { useRevenueSharingVeWDneroContract } from 'hooks/useContract'
import { useCurrentBlockTimestamp } from 'views/WDneroStaking/hooks/useCurrentBlockTimestamp'

export const useEpochRewards = (): number => {
  const revenueSharingPoolContract = useRevenueSharingVeWDneroContract()
  const currentTimestamp = useCurrentBlockTimestamp()

  const { data } = useQuery(
    ['epochRewards', revenueSharingPoolContract.address],
    async () => {
      const week = Math.floor(currentTimestamp / WEEK) * WEEK
      const amount = (await revenueSharingPoolContract.read.tokensPerWeek([BigInt(week)])) ?? 0n
      return Number(amount)
    },
    {
      keepPreviousData: true,
    },
  )

  return data ?? 0
}
