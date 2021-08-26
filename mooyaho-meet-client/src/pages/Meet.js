import { useParams } from 'react-router'
import styled from 'styled-components'
import MeetGrid from '../components/MeetGrid'
import Mooyaho from 'mooyaho-client-sdk'
import { useEffect, useMemo, useRef, useState } from 'react'
import { integrateGuest } from '../api/auth'
import { useMeetState } from '../contexts/MeetContext'
import MeetReady from '../components/MeetReady'
import { getMeet } from '../api/meet'
import FooterButtonGroup from '../components/FooterButtonGroup'
import MyCameraViewer from '../components/FloatingVideo'

function Meet() {
  const params = useParams()
  const client = useRef(null)
  const processed = useRef(false)
  const [{ name, meet }, setMeet] = useMeetState()
  const [myStream, setMyStream] = useState(null)
  const [sessions, setSessions] = useState([])
  const [mySessionId, setMySessionId] = useState(null)
  const [{ muted, videoDisabled }, setMediaState] = useState({
    muted: false,
    videoDisabled: false,
  })

  useEffect(() => {
    const process = async () => {
      const mooyaho = new Mooyaho({
        url: 'ws://localhost:8080',
      })

      client.current = mooyaho
      const stream = await mooyaho.createUserMedia({
        video: { width: { max: 480 }, frameRate: 10 },
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

      window.mooyaho = mooyaho

      mooyaho.addEventListener('enterSuccess', (event) => {
        const sessions = mooyaho.sessionsArray
          .filter((s) => s.id !== sessionId) // sessions without userself
          .map((s) => ({ ...s, stream: null }))

        console.log(mooyaho.sessionsArray)
        setSessions(sessions)
      })

      mooyaho.addEventListener('entered', (e) => {
        if (e.isSelf) return
        setSessions((prev) =>
          prev.concat({
            id: e.sessionId,
            user: e.user,
            stream: null,
            state: {
              muted: false,
              videoOff: false,
            },
          })
        )
      })

      mooyaho.addEventListener('remoteStreamChanged', (e) => {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === e.sessionId
              ? {
                  ...s,
                  stream: mooyaho.getRemoteStreamById(e.sessionId),
                }
              : s
          )
        )
      })

      mooyaho.addEventListener('updatedMediaState', (e) => {
        setSessions((prev) => {
          return prev.map((s) =>
            s.id === e.sessionId
              ? {
                  ...s,
                  state: {
                    ...s.state,
                    [e.key]: e.value,
                  },
                }
              : s
          )
        })
      })

      mooyaho.addEventListener('left', (e) => {
        setSessions((prev) => prev.filter((s) => s.id !== e.sessionId))
      })
    }

    // handle enterSuccess

    if (processed.current) return
    if (!name) return
    process()
    processed.current = true
  }, [name, meet, params.slug, setMeet])

  useEffect(() => {
    return () => {
      if (client.current) {
        client.current.dispose()
      }
    }
  }, [])

  const sessionItems = useMemo(() => {
    if (!myStream || !mySessionId) return []
    if (sessions.length === 0) {
      return [
        {
          isMySelf: true,
          stream: myStream,
          id: mySessionId,
          user: {
            displayName: 'Me',
          },
          state: {
            muted,
            videoOff: videoDisabled,
          },
        },
      ]
    }
    return sessions
  }, [sessions, myStream, mySessionId, muted, videoDisabled])

  const onToggleMuted = () => {
    const nextValue = !muted
    setMediaState((prev) => ({ ...prev, muted: nextValue }))
    client.current?.updateMediaState('muted', nextValue)
    const audioTrack = myStream?.getAudioTracks()[0]
    if (!audioTrack) return
    audioTrack.enabled = !nextValue
  }
  const onToggleVideoDisabled = () => {
    const nextValue = !videoDisabled
    setMediaState((prev) => ({ ...prev, videoDisabled: nextValue }))
    client.current?.updateMediaState('videoOff', nextValue)
    const videoTrack = myStream?.getVideoTracks()[0]
    if (!videoTrack) return
    videoTrack.enabled = !nextValue
  }

  if (!name) {
    return <MeetReady />
  }

  console.log(sessionItems)

  return (
    <Fullscreen>
      <main>
        <MeetGrid sessions={sessionItems} />
        <MyCameraViewer stream={myStream} visible={sessions.length !== 0} />
      </main>
      <footer>
        <div className="left">
          <div className="meetId">{params.slug}</div>
        </div>
        <div className="center">
          <FooterButtonGroup
            muted={muted}
            videoDisabled={videoDisabled}
            onToggleMuted={onToggleMuted}
            onToggleVideoDisabled={onToggleVideoDisabled}
          />
        </div>
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
    position: relative;
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
