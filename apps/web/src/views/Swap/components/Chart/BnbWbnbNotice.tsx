import { Flex, Text } from '@dneroswap/uikit'
import { useTranslation } from '@dneroswap/localization'

import { StyledPriceChart } from './styles'

interface DTokenWdtokenNoticeProps {
  isDark: boolean
  isChartExpanded: boolean
}

const DTokenWdtokenNotice: React.FC<React.PropsWithChildren<DTokenWdtokenNoticeProps>> = ({ isDark, isChartExpanded }) => {
  const { t } = useTranslation()
  return (
    <StyledPriceChart $isDark={isDark} $isExpanded={isChartExpanded} p="24px">
      <Flex justifyContent="center" alignItems="center" height="100%" flexDirection="column">
        <Text mb={['8px', '8px', '0px']} textAlign="center">
          {t('You can swap WDTOKEN for DTOKEN (and vice versa) with no trading fees.')}
        </Text>
        <Text mb={['8px', '8px', '0px']} textAlign="center">
          {t('Exchange rate is always 1 to 1.')}
        </Text>
      </Flex>
    </StyledPriceChart>
  )
}

export default DTokenWdtokenNotice
