import { useHistory } from 'react-router'
import styled from 'styled-components'
import Button from './Button'

function CenterForm({ className, onSubmit, submitButtonText, children }) {
  const history = useHistory()

  return (
    <Block className={className}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.()
        }}
      >
        {children}
        <div className="buttons">
          <Button
            size="big"
            theme="textOnly"
            onClick={(e) => {
              e.preventDefault()
              history.goBack()
            }}
          >
            Cancel
          </Button>
          <Button size="big">{submitButtonText}</Button>
        </div>
      </form>
    </Block>
  )
}

const Block = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 480px;

    .buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 24px;
      button + button {
        margin-left: 16px;
      }
    }
  }
`

export default CenterForm
