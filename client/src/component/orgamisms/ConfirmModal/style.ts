import styled from 'styled-components';

import Button from 'component/atoms/Button';

export const Main = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  position: relative;
  width: 38em;
  background: #ffffff;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
`;
export const Text = styled.h1`
  line-height: 1.2;
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
