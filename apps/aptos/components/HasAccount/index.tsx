import { useAccount } from '@dneroswap/awgmi'
import { useIsMounted } from '@dneroswap/hooks'

export default function HasAccount({ fallbackComp, children }) {
  const { account } = useAccount()
  const isMounted = useIsMounted()

  return isMounted && account ? <>{children}</> : fallbackComp
}
