import styled from 'styled-components';
import globalTheme from 'style/theme';
import TextLabel from 'component/atoms/TextLabel';
import Floating from 'component/atoms/FloatingButton';

export const TeamDashboardPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Left = styled.div`
  width: 123rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Text = styled.div`
  text-align: center;
  &:first-child {
    margin-right: 5em;
  }
`;
export const Content = styled.div`
  display: flex;
`;
export const Name = styled.h1`
  font-size: 3rem;
`;
export const Title = styled.h1`
  margin-bottom: 1em;
  font-size: 1.6rem;
`;
export const ContentInfo = styled.div`
  font-size: 1.5rem;
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
  margin: 1.5em 0;
  font-size: 4rem;
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
  width: 150rem;
  height: 58rem;
`;

export const List = styled.div`
  display: flex;
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
  padding: 0.7em 0.8em;
  line-height: 1em;
  margin-bottom: 0.8em;
`;

export default {};
