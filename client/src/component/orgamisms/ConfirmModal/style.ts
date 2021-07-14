import styled from 'styled-components';
import Button from 'component/atoms/Button';

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  position: relative;
  width: 38em;
  height: 15em;
  background: #ffffff;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
`;
export const Text = styled.h1`
  font-size: 2.3em;
  margin-bottom: 1.3em;
`;

export const Content = styled.div`
  display: flex;
  padding: 3em;
  flex-direction: column;
  display: flex;
`;

export const Btns = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const CloseButtonWrapper = styled(Button)`
  position: absolute;
  top: 1em;
  right: 1em;
  font-size: 2rem;
  background-color: transparent;
`;
