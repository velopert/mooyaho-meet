import { useHistory } from 'react-router'
import styled from 'styled-components'
import Button from './Button'

function ErrorBox() {
  const history = useHistory()
  return (
    <Fullscreen>
      <Title>This meet code is invalid.</Title>
      <Button onClick={() => history.goBack()} size="big">
        Go Back
      </Button>
    </Fullscreen>
  )
}

const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Title = styled.h2`
  margin-top: 0;
  font-size: 64px;
  margin-bottom: 32px;
  line-height: 1.5;
`

export default ErrorBox
