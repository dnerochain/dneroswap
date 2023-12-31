import { ChainId } from '@dneroswap/chains'
import { arbitrumTokens, opDneroTokens } from '@dneroswap/tokens'
import { getBalanceAmount } from '@dneroswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { getViemClients } from 'utils/viem'

// Contract will return price with 10^8, although ALP token decimals is 18.
const TOKEN_DECIMALS = 8
const CONTRACT_ADDRESS = '0xB3879E95a4B8e3eE570c232B19d520821F540E48'

export const isAlpToken = ({ chainId, tokenAddress }: { chainId: ChainId; tokenAddress: string }) => {
  return (
    (chainId === ChainId.ARBITRUM_ONE && tokenAddress === arbitrumTokens.alp.address) ||
    (chainId === ChainId.OPDNERO && tokenAddress === opDneroTokens.alp.address)
  )
}

export const fetchTokenAplPrice = async () => {
  const client = getViemClients({ chainId: ChainId.ARBITRUM_ONE })
  const [alpPrice] = await client.multicall({
    contracts: [
      {
        abi: [
          {
            inputs: [],
            name: 'alpPrice',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
        ] as const,
        address: CONTRACT_ADDRESS,
        functionName: 'alpPrice',
      },
    ],
    allowFailure: false,
  })

  const alpUsdPrice = getBalanceAmount(new BigNumber(alpPrice.toString()), TOKEN_DECIMALS).toNumber()
  return alpUsdPrice ?? 0
}
