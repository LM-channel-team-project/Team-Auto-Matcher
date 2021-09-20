import styled from 'styled-components';

import DirectionBtnComponent from 'component/atoms/DirectionBtn';

export const DirectionNav = styled.div`
  display: flex;
`;

export const DirectionBtn = styled(DirectionBtnComponent)``;

export const DirectionWrapper = styled.div`
  padding: 10px 30px;
  border-radius: 5px;
  background-color: white;
  transition: all 0.1s;

  :last-child {
    margin-left: 5rem;
  }

  &:hover {
    cursor: pointer;
    background-color: #313131;
  }

  &:hover span {
    color: white;
  }
`;
