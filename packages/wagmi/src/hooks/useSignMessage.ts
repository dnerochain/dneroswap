import { useCallback } from 'react'
import { useAccount, useSignMessage as useSignMessageWagmi } from 'wagmi'
import { SignMessageArgs } from 'wagmi/actions'

export function useSignMessage() {
  const { address, connector } = useAccount()
  const { signMessageAsync: sign } = useSignMessageWagmi()

  return {
    signMessageAsync: useCallback(
      async (args: SignMessageArgs) => {
        // @ts-ignore
        if (connector?.id === 'dnero' && window.DneroChain && address) {
          // @ts-ignore
          const res = await window.DneroChain.dtokenSign?.(address, args.message as string)
          if (res) {
            return res.signature
          }
          return null
        }
        return sign(args)
      },
      [address, connector?.id, sign],
    ),
  }
}
