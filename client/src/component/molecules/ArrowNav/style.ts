import styled from 'styled-components';

import ArrowBtnComponent from 'component/atoms/ArrowBtn';

export const ArrowNav = styled.div`
  display: flex;
`;

export const ArrowBtn = styled(ArrowBtnComponent)``;

export const ArrowBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6rem;
  height: 6rem;
  padding: 1rem;
  border: 0.1rem solid black;
  border-radius: 50%;

  :last-child {
    margin-left: 1rem;
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;
