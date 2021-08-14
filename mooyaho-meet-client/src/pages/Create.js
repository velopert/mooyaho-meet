import styled from 'styled-components'
import { customAlphabet } from 'nanoid'
import { useEffect, useState } from 'react'
import LabelInput from '../components/LabelInput'
import CenterForm from '../components/CenterForm'

const nanoid = customAlphabet('0123456789abcdef', 6)

function Create() {
  const [form, setForm] = useState({
    name: '',
    code: '',
  })

  useEffect(() => {
    setForm((prev) => ({ ...prev, code: nanoid() }))
  }, [])

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <StyledCenterForm submitButtonText="Create">
      <LabelInput
        className="code"
        label="Meeting Code"
        size="big"
        name="code"
        value={form.code}
        onChange={onChange}
        onKeyDown={(e) => {
          // ignore when e.key is not alphanumeric
          if (!/[a-zA-Z0-9]/.test(e.key)) {
            e.preventDefault()
          }
        }}
      />
      <LabelInput
        label="Name"
        size="big"
        name="name"
        onKeyDown={(e) => {
          // ignore when e.key is not alphanumeric
          if (!/[a-zA-Z0-9 ]/.test(e.key)) {
            e.preventDefault()
          }
        }}
      />
    </StyledCenterForm>
  )
}

const StyledCenterForm = styled(CenterForm)`
  .code {
    input {
      font-family: monospace;
      text-transform: lowercase;
    }
  }
`

export default Create
