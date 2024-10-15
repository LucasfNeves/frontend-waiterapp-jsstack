import { styled } from 'styled-components'

export const Overlay = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);

  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalBody = styled.div`
  background-color: #fff;
  width: 480px;
  border-radius: 8px;
  padding: 32px;
  height: fit-content;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 24px;
      font-weight: 500;
    }

    button {
      border: 0;
      background: transparent;
      line-height: 0;
    }
  }

  .status-container {
    margin-top: 32px;

    small {
      font-size: 14px;
      color: #667;
    }

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
  }
`

export const OrderDetails = styled.div`
  margin-top: 32px;

  > strong {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
  }
  .order-itens {
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    .item {
      display: flex;
      align-items: center;
      justify-content: start;

      & + .item {
        margin-top: 16px;
      }

      img {
        border-radius: 6px;
      }

      .quantity {
        font-size: 14px;
        color: #667;
        display: block;
        margin-left: 12px;
        min-width: 20px;
        align-self: flex-start;
      }

      .product-details {
        margin-left: 4px;

        strong {
          display: block;
          margin-bottom: 4px;
        }

        span {
          font-size: 14px;
          color: #667;
        }
      }
    }
  }


  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;

    span {
      font-weight: 500;
      font-size: 14px;
      opacity: 0.8;
    }

    strong{
      font-size: 16px;
      font-weight: 500;
    };
  }
`

export const Actions = styled.footer`
margin-top: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;

  .primary {
    background-color: #333;
    border-radius: 48px;
    border: 0;
    color: #fff;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #222;
      transition: background-color 0.3s;
    }
  }

  .secundary {
    padding: 12px 24px;
    border: 0;
    border: 1px solid #d73035;
    color: #d73035;
    background-color: transparent;
    border-radius: 8px;
    font-weight: bold;

    &:hover {
      background-color: #d73035;
      color: #fff;
      transition: background-color 0.3s;
    }
  }

  button:disabled{
    opacity: 0.5;
    cursor: not-allowed;
  }
`
