import styled, { css } from 'styled-components'

function LabelInput({ label, size, className, ...rest }) {
  return (
    <Block size={size} className={className}>
      <label>{label}</label>
      <input {...rest} />
    </Block>
  )
}

const Block = styled.div`
  label,
  input {
    display: block;
  }

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    padding-left: 8px;
    padding-right: 8px;
    font-size: 16px;
    height: 32px;
    width: 100%;
  }

  & + & {
    margin-top: 1rem;
  }

  ${(props) =>
    props.size === 'big' &&
    css`
      label {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 16px;
        display: block;
      }
      input {
        height: auto;
        font-size: 48px;
        padding: 16px 24px;
      }
      & + & {
        margin-top: 32px;
      }
    `}
`

export default LabelInput
