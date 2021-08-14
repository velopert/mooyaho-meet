import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

function Button({ fullWidth, size, to, theme, ...rest }) {
  if (to) {
    return (
      <StyledLink
        size={size}
        fullWidth={fullWidth}
        theme={theme}
        {...rest}
        to={to}
      />
    )
  }
  return (
    <StyledButton
      size={size}
      fullWidth={fullWidth}
      theme={theme}
      {...rest}
    ></StyledButton>
  )
}

const commonStyle = css`
  font-family: inherit;
  ${(props) =>
    props.fullWidth
      ? css`
          width: 100%;
          display: flex;
        `
      : css`
          display: inline-flex;
        `}

  align-items: center;
  justify-content: center;

  background: black;
  color: white;
  height: 32px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  cursor: pointer;
  padding-left: 12px;
  padding-right: 12px;
  &:hover {
    background: #333333;
  }

  ${(props) =>
    props.size === 'big' &&
    css`
      height: 64px;
      font-size: 32px;
      padding-left: 24px;
      padding-right: 24px;
    `}

  ${(props) =>
    props.theme === 'textOnly' &&
    css`
      background: none;
      color: #333333;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    `}
`

const StyledLink = styled(Link)`
  ${commonStyle}
  text-decoration: none;
  color: white;
`

const StyledButton = styled.button`
  ${commonStyle}
`

export default Button
