import { Gauge } from '@dneroswap/gauges'
import { useTranslation } from '@dneroswap/localization'
import { useToast } from '@dneroswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import useCatchTxError from 'hooks/useCatchTxError'
import { useGaugesVotingContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { Address } from 'viem'

export const useWriteGaugesVoteCallback = () => {
  const { t } = useTranslation()
  const contract = useGaugesVotingContract()
  const { account } = useAccountActiveChain()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: isPending } = useCatchTxError()

  const vote = useCallback(
    async (gauges: Gauge[]) => {
      if (!account) return

      const receipt = await fetchWithCatchTxError(() => {
        const data = gauges.reduce(
          (acc, curr) => {
            acc[0].push(curr.pairAddress)
            acc[1].push(BigInt(curr.weight))
            acc[2].push(BigInt(curr.chainId))
            return acc
          },
          [[], [], [], false, false] as [Address[], bigint[], bigint[], boolean, boolean],
        )
        return contract.write.voteForGaugeWeightsBulk(data, {
          account,
          chain: contract.chain,
        })
      })

      if (receipt?.status) {
        toastSuccess(
          t('Success!'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('Your vote has been submitted successfully.')}
          </ToastDescriptionWithTx>,
        )
      }
    },
    [account, fetchWithCatchTxError, contract.write, contract.chain, toastSuccess, t],
  )

  return { writeVote: vote, isPending }
}
