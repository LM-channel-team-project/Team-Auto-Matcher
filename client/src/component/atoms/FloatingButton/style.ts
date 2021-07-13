import styled from 'styled-components';

export const FloatingButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 5rem;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid rgb(233, 233, 233);
  transition: all 0.4s;
  top: 69px;
  padding: 1.3rem 2.7rem;
  font-size: 1rem;
  font-weight: 900;
  animation: contentsMoving 2s ease-in-out infinite alternate;

  @keyframes contentsMoving {
    from {
      transform: translateX(-20px);
    }

    to {
      transform: translateX(-50px);
    }
  }
`;

export default FloatingButton;
