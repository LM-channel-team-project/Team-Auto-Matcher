import styled, { css } from 'styled-components';

export const TeamDashboardPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Left = styled.div`
  width: 123em;
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
  font-size: 3em;
`;
export const Title = styled.h1`
  margin-bottom: 1em;
  font-size: 1.6em;
`;
export const ContentInfo = styled.div`
  font-size: 1.5em;
`;

export interface stateProps {
  state: 'open' | 'closed' | 'end';
}

export const State = styled.div`
  border-radius: 2em;
  background-color: #e3faf3;
  padding: 0.7em 0.8em;
  color: ${({ state }: stateProps) => {
    let color = '#fff';
    switch (state) {
    case 'open':
      color = '#aaa';
      break;
    case 'closed':
      color = '#green';
      break;
    case 'end':
      color = 'yellow';
      break;
    default:
      color = '#fff';
      break;
    }

    return color;
  }};
  font-size: 1.6rem;
  font-weight: bold;
`;

export const Main = styled.h1`
  margin: 1.5em 0;
  font-size: 4em;
`;

export const TeamPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 1.2em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #7f8c8d;
    border-radius: 1em;
  }
  &::-webkit-scrollbar-track {
    background-color: #dfe6e9;
    border-radius: 1em;
  }
  padding-top: 1em;
  width: 150em;
  height: 58em;
`;

export const List = styled.div`
  display: flex;
  width: 140em;
  cursor: pointer;
  margin-bottom: 3em;
  &:last-child {
    margin-bottom: 3.5em;
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
`;

export const CreateBtn = styled.button`
  cursor: pointer;
  margin-top: 1.5em;
  width: 10em;
  height: 3em;
  font-size: 2em;
  border-radius: 0.5em;
`;
export default {};
