import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import MeetGridItem from './MeetGridItem'

function MeetGrid({ sessions }) {
  const [itemWidth, setItemWidth] = useState(0)
  const [count, setCount] = useState(1)
  const ref = useRef()

  const divisor = useMemo(() => {
    return Math.ceil(Math.sqrt(count))
  }, [count])

  useLayoutEffect(() => {
    const gridWidth = ref.current.clientWidth
    setItemWidth(gridWidth / divisor)
  }, [divisor])

  return (
    <Grid ref={ref}>
      {sessions.map((session, i) => {
        const remainder = count % divisor
        const isLastRow = i >= count - remainder
        return (
          <MeetGridItem
            width={itemWidth}
            key={session.sessionId}
            stream={session.stream}
            isMySelf={session.isMySelf}
            isLastRow={isLastRow}
          />
        )
      })}
      {/* {list.map((i) => {
        const remainder = count % divisor
        const isLastRow = i >= count - remainder
        return <MeetGridItem width={itemWidth} isLastRow={isLastRow} />
      })} */}
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
