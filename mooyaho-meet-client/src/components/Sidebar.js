import styled, { css } from 'styled-components'
import { CloseIcon } from '../assets/icons'

function Sidebar({ visible, onClose }) {
  return (
    <Aside visible={visible}>
      <div className="content">
        <header>
          <h3>Users</h3>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </header>
      </div>
    </Aside>
  )
}

const Aside = styled.aside`
  display: flex;
  background: #212121;
  width: 320px;

  flex-direction: column;
  ${(props) =>
    props.visible
      ? css`
          width: 320px;
          opacity: 1;
        `
      : css`
          width: 0px;
          opacity: 0;
        `}
  .content {
    border: 8px solid #212121;
    border-left-width: 4px;
    background: white;
    flex: 1;

    header {
      border-bottom: 1px solid #efefef;
      height: 64px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
      }
      h3 {
        font-size: 24px;
        margin: 0;
      }
    }
  }
`

export default Sidebar
