import { useEffect, useRef } from 'react'
import styled from 'styled-components'

function MyCameraViewer({ stream, visible }) {
  const ref = useRef()
  useEffect(() => {
    if (!visible || !ref.current || !stream) return
    ref.current.srcObject = stream
  }, [visible, stream])
  if (!visible) return null

  return (
    <Floating>
      <video ref={ref} muted autoPlay />
    </Floating>
  )
}

const Floating = styled.div`
  width: 360px;
  height: 240px;
  position: absolute;
  right: 24px;
  bottom: 24px;
  background: black;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.15);
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default MyCameraViewer
