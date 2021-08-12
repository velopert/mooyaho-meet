import styled from 'styled-components'

function LabelInput({ label, ...rest }) {
  return (
    <Block>
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
`

export default LabelInput
