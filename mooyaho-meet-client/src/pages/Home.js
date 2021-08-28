import { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Button from '../components/Button'
import Header from '../components/Header'

function Home() {
  const history = useHistory()
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState('')

  return (
    <Block>
      <Header />
      <main>
        <h2>Start your online meeting{'\n'}with Mooyaho Meet</h2>
        <Section>
          <Button size="big" to="/create">
            Create New Meeting
          </Button>
          <div className="or">OR</div>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              history.push(`/meet/${value}`)
            }}
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter Code"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            {(focused || value !== '') && (
              <button disabled={value === ''}>Enter</button>
            )}
          </Form>
        </Section>
      </main>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  main {
    margin-top: -64px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 48px;
    padding-right: 48px;
    h2 {
      line-height: 1.3;
      white-space: pre;
      font-size: 64px;
      font-weight: 400;
    }
  }
`

const Section = styled.section`
  display: flex;
  align-items: center;
  .or {
    margin-left: 16px;
    margin-right: 16px;
    font-size: 24px;
    color: #666666;
  }
`

const Form = styled.form`
  display: flex;
  input {
    width: 272px;
    height: 64px;
    padding-left: 24px;
    padding-right: 24px;
    font-size: 32px;
  }
  button {
    /* display: none; */
    margin-left: 16px;
    font-size: 24px;
    background: none;
    border: none;
    padding-left: 12px;
    padding-right: 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #1e88e5;
    &:disabled {
      color: #888888;
    }
    &:hover {
      background: #f5f5f5;
    }
  }
  input:focus + button {
    /* display: initial; */
  }
`

export default Home
