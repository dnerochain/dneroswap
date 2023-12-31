import { Text, TokenPairImage as UITokenPairImage, useMatchBreakpoints, Skeleton, Box } from '@dneroswap/uikit'
import { Pool, FarmWidget } from '@dneroswap/widgets-internal'
import BigNumber from 'bignumber.js'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { TokenPairImage } from 'components/TokenImage'
import { vaultPoolConfig } from 'config/constants/pools'
import { useTranslation } from '@dneroswap/localization'
import { memo, useMemo } from 'react'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { VaultKey, DeserializedLockedWDneroVault } from 'state/types'
import { styled } from 'styled-components'
import { BIG_ZERO } from '@dneroswap/utils/bigNumber'
import { getVaultPosition, VaultPosition, VaultPositionParams } from 'utils/wdneroPool'
import { Token } from '@dneroswap/sdk'
import { checkIsBoostedPool } from '@dneroswap/pools'

const { AlpBoostedTag } = FarmWidget.Tags

interface NameCellProps {
  pool: Pool.DeserializedPool<Token>
}

export const StyledCell = styled(Pool.BaseCell)`
  flex: 5;
  flex-direction: row;
  padding-left: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 0 0 210px;
    padding-left: 32px;
  }
`

const NameCell: React.FC<React.PropsWithChildren<NameCellProps>> = ({ pool }) => {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const { isMobile } = useMatchBreakpoints()
  const { sousId, stakingToken, earningToken, userData, isFinished, vaultKey, totalStaked } = pool
  const vaultData = useVaultPoolByKey(pool?.vaultKey || VaultKey.WDneroVault)
  const { totalWDneroInVault } = vaultData
  const userShares = vaultData?.userData?.userShares ?? BIG_ZERO
  const hasVaultShares = userShares.gt(0)

  const stakingTokenSymbol = stakingToken.symbol
  const earningTokenSymbol = earningToken.symbol

  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isStaked = stakedBalance.gt(0)

  const showStakedTag = vaultKey ? hasVaultShares : isStaked

  let title: React.ReactNode = `${t('Earn')} ${earningTokenSymbol}`
  let subtitle: React.ReactNode = `${t('Stake')} ${stakingTokenSymbol}`
  const showSubtitle = sousId !== 0 || (sousId === 0 && !isMobile)

  if (vaultKey) {
    title = vaultPoolConfig[vaultKey].name
    subtitle = vaultPoolConfig[vaultKey].description
  }

  const isLoaded = useMemo(() => {
    if (pool.vaultKey) {
      return totalWDneroInVault && totalWDneroInVault.gte(0)
    }
    return totalStaked && totalStaked.gte(0)
  }, [pool.vaultKey, totalWDneroInVault, totalStaked])

  const isBoostedPool = useMemo(
    () => Boolean(chainId && checkIsBoostedPool(pool.contractAddress, chainId)),
    [pool, chainId],
  )

  return (
    <StyledCell role="cell">
      {isLoaded ? (
        <>
          {vaultKey ? (
            <UITokenPairImage
              {...vaultPoolConfig[vaultKey].tokenImage}
              mr="8px"
              width={40}
              height={40}
              style={{ minWidth: 40 }}
            />
          ) : (
            <TokenPairImage
              primaryToken={earningToken}
              secondaryToken={stakingToken}
              mr="8px"
              width={40}
              height={40}
              style={{ minWidth: 40 }}
            />
          )}
          <Pool.CellContent>
            {showStakedTag &&
              (vaultKey === VaultKey.WDneroVault ? (
                <StakedWDneroStatus
                  userShares={userShares}
                  locked={(vaultData as DeserializedLockedWDneroVault)?.userData?.locked}
                  lockEndTime={(vaultData as DeserializedLockedWDneroVault)?.userData?.lockEndTime}
                />
              ) : (
                <Text fontSize="12px" bold color={isFinished ? 'failure' : 'secondary'} textTransform="uppercase">
                  {t('Staked')}
                </Text>
              ))}
            <Text bold={!isMobile} small={isMobile}>
              {title}
            </Text>
            {showSubtitle && (
              <Text fontSize="12px" color="textSubtle">
                {subtitle}
              </Text>
            )}
            {!isMobile && isBoostedPool && (
              <Box width="fit-content" mt="4px">
                <AlpBoostedTag scale="sm" />
              </Box>
            )}
          </Pool.CellContent>
        </>
      ) : (
        <>
          <Skeleton mr="8px" width={36} height={36} variant="circle" />
          <Pool.CellContent>
            <Skeleton width={30} height={12} mb="4px" />
            <Skeleton width={65} height={12} />
          </Pool.CellContent>
        </>
      )}
    </StyledCell>
  )
}

export default NameCell

const stakedStatus = {
  [VaultPosition.None]: { text: '', color: 'secondary' },
  [VaultPosition.Locked]: { text: 'Locked', color: 'secondary' },
  [VaultPosition.LockedEnd]: { text: 'Locked End', color: 'secondary' },
  [VaultPosition.AfterBurning]: { text: 'After Burning', color: 'failure' },
  [VaultPosition.Flexible]: { text: 'Flexible', color: 'success' },
}

export const StakedWDneroStatus: React.FC<React.PropsWithChildren<VaultPositionParams>> = memo(
  ({ userShares, locked, lockEndTime }) => {
    const vaultPosition = getVaultPosition({ userShares, locked, lockEndTime })
    const { t } = useTranslation()
    return (
      <Text fontSize="12px" bold color={stakedStatus[vaultPosition].color} textTransform="uppercase">
        {t(stakedStatus[vaultPosition].text)}
      </Text>
    )
  },
)
