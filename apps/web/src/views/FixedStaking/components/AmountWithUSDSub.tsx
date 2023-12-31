import { Currency, CurrencyAmount } from '@dneroswap/swap-sdk-core'
import { Balance, Text } from '@dneroswap/uikit'

import { useStablecoinPriceAmount } from 'hooks/useBUSDPrice'
import toNumber from 'lodash/toNumber'
import React from 'react'

export function AmountWithUSDSub({
  amount,
  shouldStrike,
  fontSize,
  mb = '-4px',
}: {
  fontSize?: string
  shouldStrike?: boolean
  amount: CurrencyAmount<Currency>
  mb?: string
}) {
  const formattedUsdAmount = useStablecoinPriceAmount(amount.currency.wrapped, toNumber(amount.toSignificant(6)))

  return React.createElement(
    shouldStrike ? 's' : React.Fragment,
    undefined,
    <>
      <Text fontSize={fontSize} bold mb={mb}>
        <Balance
          fontSize="16px"
          value={toNumber(amount.toSignificant(6))}
          decimals={0}
          unit={` ${amount.currency.wrapped.symbol}`}
        />
      </Text>
      <Balance
        unit=" USD"
        color="textSubtle"
        prefix="~$"
        fontSize="12px"
        decimals={2}
        value={formattedUsdAmount || 0}
      />
    </>,
  )
}
