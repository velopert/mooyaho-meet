import { useHistory, useParams } from 'react-router'
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
import UsersButton from '../components/UsersButton'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import ErrorBox from '../components/ErrorBox'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState(false)
  const history = useHistory()

  const hangOff = () => {
    const mooyaho = client.current
    history.replace('/')
    if (!mooyaho) return
    mooyaho.leave()
  }

  useEffect(() => {
    if (meet) return
    const process = async () => {
      try {
        const meetData = await getMeet(params.slug)
        setMeet((prev) => ({ ...prev, meet: meetData }))
      } catch (e) {
        setError(true)
      }
    }
    process()
  }, [meet, params.slug, setMeet])

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
        const sessions = mooyaho.sessionsArray.map((s) => ({
          ...s,
          stream: null,
        }))

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
      setMeet({
        meet: null,
        name: '',
      })
    }
  }, [setMeet])

  const sessionItems = useMemo(() => {
    if (!myStream || !mySessionId) return []

    if (sessions.length === 1) {
      return [{ ...sessions[0], isMySelf: true, stream: myStream }]
    }

    return sessions.filter((s) => s.id !== mySessionId)
  }, [sessions, myStream, mySessionId])

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

  const onToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (error) {
    return <ErrorBox />
  }

  if (!meet) {
    return (
      <SpinnerWrapper>
        <Spinner size={48} />
      </SpinnerWrapper>
    )
  }

  if (!name) {
    return <MeetReady />
  }

  return (
    <Fullscreen>
      <Wrapper>
        <main
          onClick={() => {
            setSidebarOpen(false)
          }}
        >
          <MeetGrid sessions={sessionItems} sidebarOpen={sidebarOpen} />
          <MyCameraViewer stream={myStream} visible={sessions.length > 1} />
        </main>
        <Sidebar
          visible={sidebarOpen}
          onClose={onToggleSidebar}
          sessions={sessions}
          mySessionId={mySessionId}
        />
      </Wrapper>
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
            onHangOff={hangOff}
          />
        </div>
        <div className="right">
          <UsersButton usersCount={sessions.length} onClick={onToggleSidebar} />
        </div>
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
    height: 100%;
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
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

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
`

const SpinnerWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`
export default Meet
