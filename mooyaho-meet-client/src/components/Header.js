import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Header() {
  return (
    <StyledHeader>
      <div className="logo">Mooyaho Meet</div>
      {/* <div className="right">
        <StyledLink to="/login">Login</StyledLink>
        <Button to="/register">Register</Button>
      </div> */}
    </StyledHeader>
  )
}

/*
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin-right: 24px;
  &:hover {
    text-decoration: underline;
    color: #333333;
  }
`
*/

const StyledHeader = styled.header`
  z-index: 10;
  height: 64px;
  display: flex;
  background: black;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: space-between;
  .logo {
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
  .right {
  }
`

export default Header
