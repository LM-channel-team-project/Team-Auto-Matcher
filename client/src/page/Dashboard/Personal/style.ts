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

export const MainBtn = styled.button`
  cursor: pointer;
  width: 6em;
  height: 2em;
  position: absolute;
  top: 1.5em;
  left: 2em;
  font-size: 3em;
  border-radius: 0.5em;
`;

export const Main = styled.h1`
  display: flex;
  margin-top: 0.63em;
  margin-bottom: 1.5em;
  justify-content: center;
  align-items: center;
  font-size: 4em;
`;

export const Slider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5em;
`;
export const Button = styled.div`
  cursor: pointer;
  background-color: #dfe6e9;
  width: 8em;
  height: 8em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Field = styled.h1`
  width: 7.7em;
  text-align: center;
  font-size: 4em;
`;

export const MatchPage = styled.div`
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
  width: 115em;
  height: 58em;
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
`;

export const Title = styled.h1`
  font-size: 4em;
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

export default {};
