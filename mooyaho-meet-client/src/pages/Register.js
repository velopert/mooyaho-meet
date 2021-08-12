import AuthForm from '../components/AuthForm'
import AuthTemplate from '../components/AuthTemplate'

function Register() {
  return (
    <AuthTemplate title="Register">
      <AuthForm isRegister />
    </AuthTemplate>
  )
}

export default Register
