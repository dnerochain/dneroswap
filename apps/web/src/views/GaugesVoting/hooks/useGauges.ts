import { ChainId } from '@dneroswap/chains'
import { Gauge } from '@dneroswap/gauges'
import { useQuery } from '@tanstack/react-query'
import { useActiveChainId } from 'hooks/useActiveChainId'

type Response = {
  data: Gauge[]
  lastUpdated: number
}

export const useGauges = () => {
  const { chainId } = useActiveChainId()

  const { data, isLoading } = useQuery(
    ['gaugesVoting', chainId],
    async (): Promise<Gauge[]> => {
      const response = await fetch(`/api/gauges/getAllGauges?testnet=${chainId === ChainId.DNERO_TESTNET ? 1 : ''}`)
      if (response.ok) {
        const result = (await response.json()) as Response

        const gauges = result.data.map((gauge) => ({
          ...gauge,
          weight: BigInt(gauge.weight),
        }))

        return gauges
      }
      return [] as Gauge[]
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  )

  return {
    data,
    isLoading: isLoading || data?.length === 0,
  }
}
