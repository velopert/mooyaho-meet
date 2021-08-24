import styled from 'styled-components'
import {
  MicIcon,
  MicOffIcon,
  VideocamIcon,
  VideocamOffIcon,
} from '../assets/icons'
import IconCircleButton from './IconCircleButton'

function FooterButtonGroup({
  muted,
  videoDisabled,
  onToggleMuted,
  onToggleVideoDisabled,
}) {
  return (
    <Group>
      {muted ? (
        <RedButton onClick={onToggleMuted}>
          <MicOffIcon />
        </RedButton>
      ) : (
        <IconCircleButton onClick={onToggleMuted}>
          <MicIcon />
        </IconCircleButton>
      )}
      {videoDisabled ? (
        <RedButton onClick={onToggleVideoDisabled}>
          <VideocamOffIcon />
        </RedButton>
      ) : (
        <IconCircleButton onClick={onToggleVideoDisabled}>
          <VideocamIcon />
        </IconCircleButton>
      )}
    </Group>
  )
}

const Group = styled.div`
  display: flex;
`

const RedButton = styled(IconCircleButton)`
  background: #d32f2f;
  &:hover {
    background: #f44336;
  }
`

export default FooterButtonGroup
