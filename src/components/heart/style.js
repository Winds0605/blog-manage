import styled, { keyframes } from 'styled-components'

const love1 = keyframes`
        30%,
        50% {
          height: 12px;
          transform: translateY(-6px);
        }
        70%,
        100% {
          height: 4px;
          transform: translateY(0px);
        }
`
const love2 = keyframes`
    30%,
    50% {
        height: 25px;
        transform: translateY(-12px);
    }
    70%,
    100% {
        height: 4px;
        transform: translateY(0px);
    }
`

const love3 = keyframes`
    30%,
    50% {
        height: 32px;
        transform: translateY(-15px);
    }
    70%,
    100% {
        height: 4px;
        transform: translateY(0px);
    }
`

const love4 = keyframes`
    30%,
    50% {
        height: 36px;
        transform: translateY(-12px);
    }
    70%,
    100% {
        height: 4px;
        transform: translateY(0px);
    }
`

const love5 = keyframes`
    30%,
    50% {
        height: 38px;
        transform: translateY(-9px);
    }
    70%,
    100% {
        height: 4px;
        transform: translateY(0px);
    }
`

export const Heart = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    height: 25px;
    float:left;
    position: absolute;
    top: 50%;

    ul {
      height: 20px;
    }
    li {
      float: left;
      width: 5px;
      height: 5px;
      border-radius: 5px;
      list-style: none;
      margin-right: 3px;
    }
    li:nth-child(1) {
      background-color: #f62e74;
      animation: ${love1} 4s infinite;
    }
    li:nth-child(2) {
      background-color: #f45330;
      animation: ${love2} 4s infinite;
      animation-delay: 0.15s;
    }
    li:nth-child(3) {
      background-color: #ffc883;
      animation: ${love3} 4s infinite;
      animation-delay: 0.3s;
    }
    li:nth-child(4) {
      background-color: #30d268;
      animation: ${love4} 4s infinite;
      animation-delay: 0.45s;
    }
    li:nth-child(5) {
      background-color: #006cb4;
      animation: ${love5} 4s infinite;
      animation-delay: 0.6s;
    }
    li:nth-child(6) {
      background-color: #784697;
      animation: ${love4} 4s infinite;
      animation-delay: 0.75s;
    }
    li:nth-child(7) {
      background-color: #ffc883;
      animation: ${love3} 4s infinite;
      animation-delay: 0.9s;
    }
    li:nth-child(8) {
      background-color: #f45330;
      animation: ${love2} 4s infinite;
      animation-delay: 1.05s;
    }
    li:nth-child(9) {
      background-color: #f62e74;
      animation: ${love1} 4s infinite;
      animation-delay: 1.2s;
    }
`   
