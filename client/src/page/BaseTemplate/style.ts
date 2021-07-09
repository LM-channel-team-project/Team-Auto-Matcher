import styled from 'styled-components';

export const Template = styled.section`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const Nav = styled.nav``;

export const Body = styled.section``;

export const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 20;
`;

export const ModalBG = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
`;

export const Modal = styled.dialog`
  position: relative;
  top: 50%;
  left: 50%;
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;
  transform: translate(-50%, -50%);
`;
