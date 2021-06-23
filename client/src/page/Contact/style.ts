import styled, { css } from 'styled-components';

export const Contact = styled.div``;

export const Teams = styled.ul`
  display: flex;
  justify-content: space-evenly;
  padding: 0 13rem;
  flex-wrap: wrap;
  margin-top: 30rem;
  min-width: 460px;
  @media screen and (max-width: 800px) {
    padding: 0;
    margin-top: 15rem;
  }
  @media screen and (max-width: 640px) {
    margin-top: 0;
    transform: translateY(15rem);
  }
`;

export const Mates = styled.li`
  @media screen and (max-width: 640px) {
    margin-top: 3rem;
  }
`;

export const FlipWrapper = styled.div`
  width: 20rem;
  height: 30rem;
  position: relative;
  perspective: 150em;
  &:hover div:first-child {
    transform: rotateY(-180deg);
  }

  &:hover div:last-child {
    transform: rotate(0);
  }
`;

export const FlipFront = styled.div`
  position: absolute;
  border-radius: 1.2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 30rem;
  backface-visibility: hidden;
  transition: all 0.6s ease;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 20%);
`;

export const FlipBack = styled.div`
  border-radius: 1.2rem;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem 2rem;
  width: 100%;
  height: 30rem;
  backface-visibility: hidden;
  transition: all 0.6s ease;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 20%);
  transform: rotateY(180deg);
`;

export const FlipBackP = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #bebebe;
  margin-top: 2rem;
  word-break: break-word;
  &:first-child {
    margin-top: 0;
  }
`;

export const FlipBackA = styled.a`
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  color: #bebebe;
`;

export const FlipTop = styled.p`
  padding: 1rem 2rem;
  & span:first-child {
    font-weight: 800;
  }
  & span:last-child {
    float: right;
    font-weight: 600;
  }
`;

export const FlipTopSpan = styled.span`
  font-size: 1.4rem;
`;

export interface IBackProps {
  background: string;
}

export const FlipBottom = styled.div`
  background-color: #e9e9e9;
  width: 100%;
  height: 26.6em;
  border-radius: 0 0 1.2rem 1.2rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${({ background }: IBackProps) => css`
    background-image: url(${background});
  `}
`;
