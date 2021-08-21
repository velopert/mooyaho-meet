import { Redirect, useParams } from 'react-router'
import styled from 'styled-components'
import MeetGrid from '../components/MeetGrid'
import Mooyaho from 'mooyaho-client-sdk'
import { useEffect, useMemo, useRef, useState } from 'react'
import { integrateGuest } from '../api/auth'
import { useMeetState } from '../contexts/MeetContext'
import MeetReady from '../components/MeetReady'
import { getMeet } from '../api/meet'

function Meet() {
  const params = useParams()
  const client = useRef(null)
  const processed = useRef(false)
  const [{ name, meet }, setMeet] = useMeetState()
  const [myStream, setMyStream] = useState(null)
  const [sessions, setSessions] = useState([])
  const [mySessionId, setMySessionId] = useState(null)

  useEffect(() => {
    const process = async () => {
      const mooyaho = new Mooyaho({
        url: 'ws://localhost:8080',
      })
      const stream = await mooyaho.createUserMedia({
        video: true,
        audio: true,
      })
      setMyStream(stream)
      const sessionId = await mooyaho.connect()
      setMySessionId(sessionId)
      await integrateGuest(sessionId, name)
      // @todo: handle logged in user
      if (meet) {
        mooyaho.enter(meet.channelId)
      } else {
        const meetData = await getMeet(params.slug)
        setMeet((prev) => ({ ...prev, meet: meetData }))
        mooyaho.enter(meetData.channelId)
      }
    }
    if (processed.current) return
    if (!name) return
    process()
    processed.current = true
  }, [name, meet, params.slug, setMeet])

  const sessionItems = useMemo(() => {
    if (!myStream || !mySessionId) return []
    if (sessions.length === 0) {
      return [
        {
          isMySelf: true,
          stream: myStream,
          sessionId: mySessionId,
        },
      ]
    }
    return sessions
  }, [sessions, myStream, mySessionId])

  if (!name) {
    return <MeetReady />
  }

  return (
    <Fullscreen>
      <main>
        <MeetGrid sessions={sessionItems} />
      </main>
      <footer>
        <div className="left">
          <div className="meetId">{params.slug}</div>
        </div>
        <div className="center">😇</div>
        <div className="right">😇</div>
      </footer>
    </Fullscreen>
  )
}

const Fullscreen = styled.div`
  background: #212121;
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    min-height: 0;
  }
  footer {
    display: flex;
    align-items: center;
    height: 80px;
    padding-left: 24px;
    padding-right: 24px;
    .left,
    .right {
      width: 240px;
      display: flex;
    }
    .right {
      justify-content: flex-end;
    }
    .center {
      display: flex;
      justify-content: center;
      flex: 1;
    }
    .meetId {
      font-family: monospace;
      color: white;
      font-size: 21px;
      font-weight: bold;
    }
  }
`
export default Meet
