import styled from 'styled-components';

export const Container = styled.div`
  height: 10rem;
  position: relative;
  width: 10rem;
  border-radius: 100%;
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
  height: 10rem;
  position: relative;
  width: 10rem;
  border-radius: 100%;
  border: 0.3rem solid transparent;
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
      opacity: 1;
    }
  }
  animation: loading-text-opacity 2s linear 0s infinite normal;
  color: black;
  font-family: 'Helvetica Neue, ' Helvetica ', ' 'arial';
  font-size: 1rem;
  font-weight: bold;
  margin-top: 4.5rem;
  opacity: 0;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  top: 0;
  width: 10rem;
`;
