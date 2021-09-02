import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Top = styled.div`
  top: 0em;
  left: 0em;
  z-index: 2;
  padding-top: 2em;
  background-color: #fff;
  padding-bottom: 2em;
`;

export const Main = styled.h1`
  display: flex;
  margin: 3em 0 1em;
  justify-content: center;
  align-items: center;
  font-size: 3.2em;
`;

export const CreateBtn = styled.button`
  cursor: pointer;
  width: 20rem;
  height: 6rem;
  font-size: 2rem;
  border-radius: 0.5rem;
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 1.2rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #7f8c8d;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-track {
    background-color: #dfe6e9;
    border-radius: 1rem;
  }
  padding-top: 1em;
  width: 124rem;
  height: 66vh;
  @media screen and (max-width: 1290px) {
    width: 108rem;
  }
  @media screen and (max-width: 1110px) {
    width: 95rem;
  }
  @media screen and (max-width: 954px) {
    width: 82rem;
  }
  @media screen and (max-width: 820px) {
    width: 67em;
  }
  @media screen and (max-width: 670px) {
    width: 49em;
  }
  @media screen and (max-width: 470px) {
    width: 38em;
  }
`;

export const List = styled.div`
  display: flex;
  width: 110em;
  cursor: pointer;
  margin-bottom: 3em;
  &:last-child {
    margin-bottom: 1em;
  }
  justify-content: space-between;
  align-items: center;
  border-radius: 1.5em;
  padding: 2em;
  border: 0.3em solid #ffffff;
  box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.12),
    0 0.1em 0.2em rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 1.4em 2.8em rgba(0, 0, 0, 0.25), 0 1em 1em rgba(0, 0, 0, 0.22);
  }
  @media screen and (max-width: 1290px) {
    width: 97em;
  }
  @media screen and (max-width: 1110px) {
    width: 84rem;
  }
  @media screen and (max-width: 954px) {
    width: 71em;
  }
  @media screen and (max-width: 820px) {
    width: 59rem;
  }
  @media screen and (max-width: 670px) {
    width: 43rem;
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 470px) {
    width: 36rem;
  }
`;

export const Title = styled.h1`
  font-size: 2em;
  @media screen and (max-width: 670px) {
    font-size: 2.5em;
    margin-bottom: 1.6em;
  }
`;

export const Text = styled.div`
  font-size: 2em;
`;
export const Stack = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Stacklist = styled.div`
  font-size: 2em;
  margin-right: 0.5em;
  background-color: #dfe6e9;
  border-radius: 2em;
  padding: 0.4em 0.5em;
`;

export const Team = styled.div`
  border-radius: 2em;
  background-color: #e3faf3;
  padding: 0.7em 0.8em;
  color: #07c3a7;
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ContentInfo = styled.div`
  font-size: 1.5rem;
`;

export const Left = styled.div`
  width: 123rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.h1`
  font-size: 3rem;
`;

export const Content = styled.div`
  display: flex;
`;
