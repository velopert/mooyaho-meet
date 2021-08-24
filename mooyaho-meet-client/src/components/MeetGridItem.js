import { useEffect, useRef } from 'react'
import styled from 'styled-components'

function MeetGridItem({
  width,
  isLastRow,
  stream,
  sessionId,
  displayName,
  isMySelf,
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
      <Name>{displayName}</Name>
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

const Name = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 4px black;
  z-index: 5;
`

export default MeetGridItem
