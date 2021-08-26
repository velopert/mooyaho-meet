import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MicOffIcon, VideocamOffIcon } from '../assets/icons'

function MeetGridItem({
  width,
  isLastRow,
  stream,
  sessionId,
  displayName,
  isMySelf,
  muted,
  videoOff,
}) {
  const videoRef = useRef(null)
  useEffect(() => {
    if (!videoRef.current) return
    if (isMySelf) {
      videoRef.current.muted = true
    }

    videoRef.current.srcObject = stream
  }, [stream, isMySelf])

  return (
    <GridItem style={{ width, flex: isLastRow ? 1 : undefined }}>
      <Video ref={videoRef} autoPlay />
      {videoOff && (
        <VideoOff>
          <VideocamOffIcon />
        </VideoOff>
      )}
      <Name>
        {displayName}
        {muted && (
          <MuteIndicator>
            <MicOffIcon />
          </MuteIndicator>
        )}
      </Name>
    </GridItem>
  )
}

const GridItem = styled.div`
  border: 8px solid #212121;
  position: relative;
`

const Video = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const VideoOff = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 10%;
    height: 10%;
    color: white;
  }
`

const Name = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 4px black;
  z-index: 5;
  display: flex;
  align-items: center;
  line-height: 24px;
`

const MuteIndicator = styled.div`
  margin-left: 8px;
  background: red;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  svg {
    width: 16px;
    height: 16px;
  }
`

export default MeetGridItem
