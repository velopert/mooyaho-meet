import styled from 'styled-components'
import {
  CallEndIcon,
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
  onHangOff,
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
      <CallEndButton onClick={onHangOff}>
        <CallEndIcon />
      </CallEndButton>
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

const CallEndButton = styled(RedButton)`
  width: 64px;
`

export default FooterButtonGroup
