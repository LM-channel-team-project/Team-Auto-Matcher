import styled from 'styled-components';

export const ProgressBarList = styled.li`
  flex: 2;
  position: relative;
  padding: 0 0 2em 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #cc0001;
  font-weight: 600;
  white-space: nowrap;
  overflow: visible;
  min-width: 0;
  text-align: center;
  border-bottom: 2px solid #313131;

  & div {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background-color: #313131;
    border-radius: 50%;
    border: 2px solid #e9e9e9;
    position: absolute;
    left: calc(50% - 6px);
    bottom: -7px;
    z-index: 3;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  & span {
    transition: opacity 0.3s ease-in-out;
  }

  @media screen and (max-width: 640px) {
    white-space: normal;
  }

  @media screen and (max-width: 430px) {
    display: none;
  }
`;

export default ProgressBarList;
