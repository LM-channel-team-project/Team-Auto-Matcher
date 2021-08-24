import styled from 'styled-components';
import ProgressBarListComponent from 'component/atoms/ProgressBarList';

export const ProgressBar = styled.ol`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;

  & li:first-child {
    text-align: left;
    flex: 1;
  }

  & li:last-child {
    flex: 1;
    text-align: right;
  }

  & li:first-child div {
    left: 0;
  }

  & li:last-child div {
    right: 0;
    left: auto;
  }

  & li:not(.is-active) span {
    opacity: 0;
  }

  & .is-complete:not(:first-child):after,
  & .is-active:not(:first-child):after {
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    bottom: -2px;
    left: -50%;
    z-index: 2;
    border-bottom: 2px solid #cc0001;
  }

  & li:last-child span {
    width: 200%;
    display: inline-block;
    position: absolute;
    left: -100%;
  }

  & .is-complete:last-child:after,
  & .is-active:last-child:after {
    width: 200%;
    left: -100%;
  }

  & .is-complete div {
    background-color: #cc0001;
  }

  & .is-active div,
  & div:hover {
    background-color: #e9e9e9;
    border-color: #cc0001;
  }

  & div:hover {
    transform: scale(1.33);
  }

  & div:hover + span {
    opacity: 1;
  }

  &:hover li:not(:hover) span {
    opacity: 0;
  }
`;

export const ProgressBarList = styled(ProgressBarListComponent)``;

export default ProgressBar;
