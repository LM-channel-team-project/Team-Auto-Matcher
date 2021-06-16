import styled from 'styled-components';
import Button from 'component/atoms/Button';

export const DetailModal = styled.div`
  width: 40em;
  background-color: ${({ theme }) => theme.color.background};
  text-align: center;
  font-size: 1rem;
  padding: 3em 0.5em;
  border-radius: 5%;
  box-shadow: ${({ theme }) => theme.color.shadowscale[0]};
`;

export const HeaderWrapper = styled.div`
  margin-bottom: 2em;
  font-size: 1.5rem;
`;

export const ButtonWrapper = styled.div`
  font-size: 1.3rem;
`;

export const CloseButtonWrapper = styled(Button)`
  position: absolute;
  top: 1em;
  right: 1em;
  font-size: 2rem;
  background-color: transparent;
`;

export const BodyContainer = styled.div`
  height: 25em;
  font-size: 1.4rem;
  padding: 1em 1.5em;
  margin-bottom: 1em;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.scrollbar};
    border-radius: 5px;
  }
`;
