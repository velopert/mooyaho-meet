import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import MeetGridItem from './MeetGridItem'

function MeetGrid({ sessions, sidebarOpen }) {
  const [itemWidth, setItemWidth] = useState(0)
  const ref = useRef()

  const divisor = useMemo(() => {
    return Math.ceil(Math.sqrt(sessions.length)) || 1
  }, [sessions.length])

  useLayoutEffect(() => {
    const gridWidth = sidebarOpen
      ? document.body.offsetWidth - 320
      : document.body.offsetWidth
    setItemWidth(gridWidth / divisor)
  }, [divisor, sidebarOpen])

  return (
    <Grid ref={ref}>
      {sessions.map((session, i) => {
        const remainder = sessions.length % divisor
        const isLastRow = i >= sessions.length - remainder
        return (
          <MeetGridItem
            width={itemWidth}
            key={session.id}
            stream={session.stream}
            isMySelf={session.isMySelf}
            isLastRow={isLastRow}
            displayName={session.user.displayName}
            muted={session.state.muted}
            videoOff={session.state.videoOff}
          />
        )
      })}
    </Grid>
  )
}

const Grid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: black;
  flex-wrap: wrap;
  justify-content: center;
`

const GridItem = styled.div`
  background: white;
  border: 4px solid blue;
`

export default MeetGrid
