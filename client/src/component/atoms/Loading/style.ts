import styled from 'styled-components';

export const Container = styled.div`
  height: 100px;
  position: relative;
  width: 100px;
  border-radius: 100%;
  margin: 40px auto;
  transition: all 0.5s ease-in-out;
  &:hover div:first-child {
    border-color: transparent #e45635 transparent #e45635;
  }
`;

export const Circle = styled.div`
  @keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  height: 100px;
  position: relative;
  width: 100px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-color: transparent black transparent black;
  animation: rotate-loading 1.5s linear 0s infinite normal;
  transform-origin: 50% 50%;
  transition: all 0.5s ease-in-out;
`;

export const Text = styled.div`
  @keyframes loading-text-opacity {
    0% {
      opacity: 1;
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  animation: loading-text-opacity 2s linear 0s infinite normal;
  color: black;
  font-family: 'Helvetica Neue, ' Helvetica ', ' 'arial';
  font-size: 10px;
  font-weight: bold;
  margin-top: 45px;
  opacity: 0;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  top: 0;
  width: 100px;
`;
