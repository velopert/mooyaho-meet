import { useState } from 'react'
import styled from 'styled-components'
import { useMeetState } from '../contexts/MeetContext'
import CenterForm from './CenterForm'
import LabelInput from './LabelInput'

function MeetReady() {
  const [name, setName] = useState('')
  const [, setMeet] = useMeetState()
  const onSubmit = () => {
    setMeet((prev) => ({ ...prev, name }))
  }

  return (
    <CenterForm submitButtonText="Start Meeting" onSubmit={onSubmit}>
      <Title>Enter your name before you start meeting.</Title>
      <LabelInput
        size="big"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </CenterForm>
  )
}

const Title = styled.h2`
  margin-top: 0;
  font-size: 32px;
  margin-bottom: 64px;
  line-height: 1.5;
`

export default MeetReady
