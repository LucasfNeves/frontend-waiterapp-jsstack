import styled from 'styled-components'

export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 198px;
`

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1216px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;

  h1 {
    font-size: 32px;
    color: #fff;
  }

  h2 {
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    opacity: 0.9;
    margin-top: 6px;
  }
`

