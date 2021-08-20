import styled from 'styled-components';
import globalTheme from 'style/theme';
import TextLabel from 'component/atoms/TextLabel';
import Loading from 'component/atoms/Loading';
import Floating from 'component/atoms/FloatingButton';

export const TeamDashboardPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const List = styled.div`
  display: flex;
  position: relative;
  width: 140rem;
  cursor: pointer;
  margin-bottom: 3em;
  &:last-child {
    margin-bottom: 3.5em;
  }
  justify-content: space-between;
  align-items: center;
  border-radius: 1.5rem;
  padding: 2em;
  border: 0.3rem solid #ffffff;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.12),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 1.4rem 2.8rem rgba(0, 0, 0, 0.25),
      0 1rem 1rem rgba(0, 0, 0, 0.22);
  }
  @media screen and (max-width: 1450px) {
    width: 110rem;
  }
  @media screen and (max-width: 1160px) {
    width: 90rem;
  }
  @media screen and (max-width: 954px) {
    width: 79em;
  }
  @media screen and (max-width: 50rem) {
    width: 43rem;
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 470px) {
    width: 36rem;
  }
`;

export const Left = styled.div`
  width: 123rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1450px) {
    width: 93rem;
  }
  @media screen and (max-width: 1160px) {
    width: 73rem;
  }
  @media screen and (max-width: 954px) {
    width: 65em;
  }
  @media screen and (max-width: 50rem) {
    width: 30rem;
    display: flex;
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  @media screen and (max-width: 50rem) {
    display: flex;
    flex-direction: column;
  }
`;

export const Text = styled.div`
  text-align: center;
  width: 20rem;
  &:first-child {
    margin-right: 5em;
  }
  @media screen and (max-width: 1450px) {
    width: 14rem;
  }
  @media screen and (max-width: 1160px) {
    width: 12rem;
  }
  @media screen and (max-width: 954px) {
    width: 9rem;
  }
  @media screen and (max-width: 50rem) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20rem;
    &:first-child {
      margin-right: 0;
    }
    &:last-child {
      margin-top: 4em;
    }
  }
`;

export const Title = styled.h1`
  margin-bottom: 1em;
  font-size: 1.6rem;
  @media screen and (max-width: 954px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 50rem) {
    font-size: 2rem;
  }
`;
export const ContentInfo = styled.div`
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (max-width: 50rem) {
    font-size: 1.8rem;
  }
`;

export const Name = styled.h1`
  font-size: 3rem;
  @media screen and (max-width: 954px) {
    font-size: 2em;
  }
  @media screen and (max-width: 50rem) {
    font-size: 3.5em;
  }
`;

export const Stack = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1450px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: center;
    grid-row-gap: 1em;
  }
  @media screen and (max-width: 1160px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    grid-row-gap: 1em;
    justify-content: center;
  }
  @media screen and (max-width: 50rem) {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 2em 0;
  }
`;

export const Stacklist = styled.div`
  font-size: 2em;
  margin-right: 0.5em;
  background-color: #dfe6e9;
  border-radius: 2em;
  padding: 0.4em 0.5em;
  @media screen and (max-width: 1450px) {
    font-size: 1.7em;
    padding: 0.2em 0.3em;
  }
  @media screen and (max-width: 954px) {
    font-size: 1.5em;
  }
  @media screen and (max-width: 50rem) {
    font-size: 2em;
    padding: 0.4em 0.5em;
    margin: 0em 0.2em 1em;
  }
`;

export interface stateProps {
  theme: typeof globalTheme;
  state: '모집중' | '진행중' | '종료';
}

const setColor = (text: string) => {
  switch (text) {
  case '모집중':
    return 'green';
  case '진행중':
    return 'red';
  case '종료':
    return 'gray';
  default:
    return undefined;
  }
};

export const Main = styled.h1`
  margin: 3em 0 1.5em;
  font-size: 3.2em;
  font-weight: bold;
`;

export const TeamPage = styled.div`
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
  width: 145rem;
  height: 58rem;
  @media screen and (max-width: 1450px) {
    width: 117rem;
  }
  @media screen and (max-width: 1160px) {
    width: 97rem;
  }
  @media screen and (max-width: 954px) {
    width: 82em;
  }
  @media screen and (max-width: 50rem) {
    width: 47em;
    height: 62em;
  }
  @media screen and (max-width: 470px) {
    width: 38em;
    height: 50em;
  }
`;

export const CreateBtn = styled.button`
  cursor: pointer;
  margin-top: 1.5em;
  width: 20rem;
  height: 6rem;
  font-size: 2rem;
  border-radius: 0.5rem;
`;

export const FloatingButton = styled(Floating)``;

export const State = styled((props: { text: string }) => TextLabel({
  color: setColor(props.text),
  fontColor: setColor(props.text),
  ...props,
}))`
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1em;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  @media screen and (max-width: 50rem) {
    position: absolute;
    right: 0.5em;
    top: 0.6em;
  }
`;

export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20%;
`;

export const LoadingComponent = styled(Loading)``;

export default {};
