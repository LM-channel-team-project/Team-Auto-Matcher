import styled from 'styled-components';
import Floating from 'component/atoms/FloatingButton';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Top = styled.div`
  top: 0em;
  left: 0em;
  padding-top: 2em;
  background-color: #fff;
`;

export const Main = styled.h1`
  display: flex;
  margin: 3em 0 1.3em;
  justify-content: center;
  align-items: center;
  font-size: 3.2em;
  font-weight: bold;
`;

export const Slider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5em;
`;
export const Button = styled.div`
  cursor: pointer;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Field = styled.h1`
  padding: 0 2rem;
  max-width: 7.7em;
  text-align: center;
  font-size: 2.9em;
  font-weight: bold;
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
  width: 150em;
  height: 58em;
  @media screen and (max-width: 1450px) {
    width: 115em;
    height: 58em;
  }
  @media screen and (max-width: 1160px) {
    width: 95em;
    height: 56em;
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
    height: 62em;
  }
`;
export const List = styled.div`
  display: flex;
  width: 140rem;
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
  @media screen and (max-width: 1450px) {
    width: 110em;
  }
  @media screen and (max-width: 1160px) {
    width: 90em;
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

export const Title = styled.h1`
  font-size: 3.5em;
  @media screen and (max-width: 1160px) {
    font-size: 3em;
  }
  @media screen and (max-width: 954px) {
    font-size: 2em;
  }
  @media screen and (max-width: 50rem) {
    font-size: 3.5em;
  }
`;

export const Text = styled.div`
  font-size: 1.8em;
  @media screen and (max-width: 1450px) {
    font-size: 1.3em;
  }
  @media screen and (max-width: 1160px) {
    font-size: 1.3em;
  }
  @media screen and (max-width: 954px) {
    font-size: 1.3em;
  }
  @media screen and (max-width: 50rem) {
    font-size: 1.5em;
    margin: 1.5em 0;
  }
`;
export const Stack = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  grid-row-gap: 1em;

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
  @media screen and (max-width: 1160px) {
    margin: 0em 0.2em 0em;
  }
  @media screen and (max-width: 954px) {
    font-size: 1.2em;
  }
  @media screen and (max-width: 50rem) {
    font-size: 2em;
    padding: 0.4em 0.5em;
    margin: 0em 0.2em 1em;
  }
`;

export const Team = styled.div`
  border-radius: 2em;
  background-color: #e3faf3;
  padding: 0.7em 0.8em;
  color: #07c3a7;
  font-size: 1.6rem;
  font-weight: bold;
  @media screen and (max-width: 954px) {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 50rem) {
    font-size: 1.6rem;
  }
`;

export const FloatingButton = styled(Floating)``;

export default {};
