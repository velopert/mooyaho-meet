import styled from 'styled-components'
import { MicOffIcon } from '../assets/icons'

function UserItem({ muted, displayName, isMySelf }) {
  return (
    <Item>
      <div>
        {displayName}
        {isMySelf && <span className="me">(Me)</span>}
      </div>
      {muted && <MicOffIcon />}
    </Item>
  )
}

const Item = styled.div`
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  .me {
    margin-left: 4px;
    color: #343434;
  }
  svg {
    width: 24px;
    height: 24px;
    color: #595959;
  }
`

export default UserItem
