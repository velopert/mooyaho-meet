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
      <Wrapper>
        <Video ref={videoRef} autoPlay />
      </Wrapper>

      {/* <div>
        
      </div> */}
    </GridItem>
  )
}

const GridItem = styled.div`
  border: 8px solid #212121;
`

const Video = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export default MeetGridItem
