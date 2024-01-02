import { styled } from 'styled-components'
import { Text } from '@dneroswap/uikit'

export const StyledTextLineClamp = styled(Text)<{ lineClamp: number }>`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ lineClamp }) => lineClamp};
`
