import { useAccount } from 'wagmi'
import qs from 'qs'
import useUserExist from 'views/AffiliatesProgram/hooks/useUserExist'
import { FAST_INTERVAL } from 'config/constants'
import { useQuery } from '@tanstack/react-query'

export type ClaimStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface ClaimDetail {
  nonce: number
  amountUSD: string
  amountWDneroSmallUnit: string
  totalWDneroSmallUnit: string
  expiryTime: null
  signature: null
  process: boolean
  approveStatus: ClaimStatus
  createdAt: string
}

export interface UserClaimListResponse {
  total: number
  claimRequests: ClaimDetail[]
}

export const MAX_PER_PAGE = 10

const useUserClaimList = ({ currentPage }) => {
  const { address } = useAccount()
  const { isUserExist } = useUserExist()

  const { data, isLoading, refetch } = useQuery(
    ['affiliates-program', 'user-claim-list', isUserExist, address, currentPage],
    async () => {
      try {
        const skip = currentPage === 1 ? 0 : (currentPage - 1) * MAX_PER_PAGE
        const urlParamsObject = { address, skip, take: MAX_PER_PAGE }
        const queryString = qs.stringify(urlParamsObject)
        const response = await fetch(`/api/affiliates-program/user-claim-list?${queryString}`)
        const result: UserClaimListResponse = await response.json()
        return {
          total: result.total,
          claimRequests: result.claimRequests,
        }
      } catch (error) {
        console.error(`Fetch User Claim List Error: ${error}`)
        return {
          total: 0,
          claimRequests: [],
        }
      }
    },
    {
      enabled: Boolean(address && isUserExist),
      refetchInterval: FAST_INTERVAL * 3,
      keepPreviousData: true,
    },
  )

  return {
    data,
    isFetching: isLoading,
    mutate: refetch,
  }
}

export default useUserClaimList
