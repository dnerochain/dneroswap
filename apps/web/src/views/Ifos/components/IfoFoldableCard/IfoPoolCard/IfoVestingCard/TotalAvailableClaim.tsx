import { useMemo } from 'react'
import { Flex, Box, Text } from '@dneroswap/uikit'
import { TokenImage } from 'components/TokenImage'
import { LightGreyCard } from 'components/Card'
import { useTranslation } from '@dneroswap/localization'
import { Ifo } from '@dneroswap/ifos'
import { getFullDisplayBalance } from '@dneroswap/utils/formatBalance'
import BigNumber from 'bignumber.js'

interface TotalAvailableClaimProps {
  ifo: Ifo
  amountAvailableToClaim: BigNumber
}

const TotalAvailableClaim: React.FC<React.PropsWithChildren<TotalAvailableClaimProps>> = ({
  ifo,
  amountAvailableToClaim,
}) => {
  const { t } = useTranslation()
  const { token } = ifo

  const amountAvailable = useMemo(
    () => (amountAvailableToClaim.gt(0) ? getFullDisplayBalance(amountAvailableToClaim, token.decimals, 4) : '0'),
    [token, amountAvailableToClaim],
  )

  return (
    <LightGreyCard mt="24px" mb="8px">
      <Flex>
        <TokenImage mr="16px" width={32} height={32} token={token} style={{ alignSelf: 'flex-start' }} />
        <Box>
          <Text bold color="secondary" fontSize="12px" textTransform="uppercase">
            {t('%symbol% available to claim', { symbol: token.symbol })}
          </Text>
          <Text as="span" bold fontSize="20px">
            {amountAvailable}
          </Text>
        </Box>
      </Flex>
    </LightGreyCard>
  )
}

export default TotalAvailableClaim
