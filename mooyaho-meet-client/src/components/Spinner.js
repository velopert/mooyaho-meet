import styled, { keyframes } from 'styled-components'
import { LoadingIcon } from '../assets/icons'

function Spinner({ size }) {
  return <StyledLoadingIcon style={{ width: size, height: 'auto' }} />
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoadingIcon = styled(LoadingIcon)`
  animation: ${spin} 1.5s linear infinite;
`

export default Spinner
