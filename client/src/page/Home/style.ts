import styled from 'styled-components';
import Loading from 'component/atoms/Loading';

export const Home = styled.div`
  position: relative;
  margin-top: 69px;
  height: calc(100vh - 69px);
  width: 100vw;
  display: flex;
`;

export interface IProps {
  background: string;
}

export const Left = styled.div`
  background: url(${({ background }: IProps) => background || ''});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 47%;
  @media screen and (max-width: 700px) {
    width: 0;
  }
`;

export const Right = styled.div`
  width: 53%;
  padding: 0 12rem;
  margin: 25vh 0 0;
  @media screen and (max-width: 1130px) {
    padding: 0 4rem;
  }
  @media screen and (max-width: 820px) {
    padding: 0 1rem;
  }
  @media screen and (max-width: 700px) {
    padding: 0 2rem;
    margin: 15vh 0 0;
    width: 100%;
  }
`;

export const Title = styled.div`
  word-break: break-word;
  width: 80%;
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.3;
  @media screen and (max-width: 370px) {
    font-size: 3rem;
    line-height: 1.1;
  }
`;

export const Description = styled.div`
  word-break: break-word;
  margin-top: 3rem;
  font-size: 2rem;
  font-weight: 300;
  line-height: 1.3;
  @media screen and (max-width: 370px) {
    font-size: 1.6rem;
  }
`;

export const BlackButton = styled.button`
  margin-top: 3rem;
  cursor: pointer;
  padding: 1.6rem 4.3rem;
  font-size: 1.3rem;
  font-weight: 900;
  background-color: black;
  color: white;
  border-radius: 0.8rem;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  @media screen and (max-width: 370px) {
    padding: 1rem 3.2rem;
    font-size: 0.9rem;
  }
`;

export const WhiteButton = styled.button`
  margin-left: 3rem;
  margin-top: 3rem;
  cursor: pointer;
  padding: 1.4rem 4.1rem;
  font-size: 1.3rem;
  font-weight: 900;
  background-color: white;
  color: black;
  border-radius: 0.8rem;
  border: 0.2rem solid black;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  @media screen and (max-width: 370px) {
    padding: 1rem 3.2rem;
    font-size: 0.9rem;
    margin-left: 1rem;
  }
`;

export const LoadingComponent = styled(Loading)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Home;
