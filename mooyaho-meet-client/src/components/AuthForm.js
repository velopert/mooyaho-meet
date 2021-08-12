import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from './Button'
import LabelInput from './LabelInput'

function AuthForm({ isRegister }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <StyledForm>
      <LabelInput label="Username" name="username" onChange={onChange} />
      <LabelInput label="Password" name="password" onChange={onChange} />
      {isRegister && (
        <LabelInput
          label="Confirm Password"
          name="passwordConfirm"
          onChange={onChange}
        />
      )}
      <StyledButton fullWidth>{isRegister ? 'Register' : 'Login'}</StyledButton>
      <Or>
        Or{' '}
        <Link to={isRegister ? '/login' : '/register'}>
          {isRegister ? 'Login' : 'Register'}
        </Link>
      </Or>
    </StyledForm>
  )
}

const StyledForm = styled.form``
const StyledButton = styled(Button)`
  margin-top: 32px;
`
const Or = styled.div`
  color: #333333;
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  a {
    color: inherit;
    &:hover {
      color: #555555;
    }
  }
`

export default AuthForm
