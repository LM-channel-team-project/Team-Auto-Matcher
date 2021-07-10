import styled, { css } from 'styled-components';
import LoginBtnComponent from 'component/molecules/LoginBtn';

export const MenuBar = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 100%;
  transition: padding 0.4s;
  padding: 1.7rem 15rem;
  border-bottom: 0.1rem solid rgb(233, 233, 233);
  z-index: 3;
  @media screen and (max-width: 1100px) {
    padding: 1.7rem 10rem;
  }
  @media screen and (max-width: 1000px) {
    padding: 1.7rem 7rem;
  }
  @media screen and (max-width: 920px) {
    padding: 1.7rem 3rem;
  }
  @media screen and (max-width: 840px) {
    padding: 1.7rem 1rem;
  }
`;

export const LoginBtn = styled(LoginBtnComponent)`
  width: 8rem;
  height: 3.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  padding: 1rem 1rem;
  border-radius: 0.4rem;
  background-color: #cc0001;
  &:hover {
    background-color: #313131;
  }
`;

export const MenuLeft = styled.ul`
  & a {
    display: flex;
    width: 21.5rem;
  }
`;

export const MainImage = styled.div`
  display: block;
  background-image: url('https://user-images.githubusercontent.com/71132893/122219295-43cb5400-ceea-11eb-9a71-60b772017020.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 3.24rem;
  height: 3.05rem;
  margin-top: 0.15rem;
`;

export const MainText = styled.div`
  margin-left: 0.5rem;

  & p:first-child {
    font-size: 1.5rem;
    font-weight: 800;
    color: #313131;
    line-height: 1.2;
    transition: all 0.2s;
    & span {
      transition: all 0.2s;
      color: #cc0001;
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1.2;
      margin: 0 0.5rem;
    }
  }

  & p:last-child {
    font-size: 1.28rem;
    font-weight: 600;
    line-height: 1.2;
    color: #d0d0d0;
    transition: all 0.4s;
  }

  &:hover p:last-child {
    color: #313131;
  }

  &:hover p:first-child {
    color: #cc0001;
    & span {
      color: #313131;
    }
  }
`;

export const MenuRight = styled.ul`
  display: flex;
  & a {
    font-weight: 400;
    font-size: 2rem;
    line-height: 1.8;
  }
  & li {
    margin-left: 3rem;
  }
  & li:first-child {
    margin-left: 0;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const MenuCenter = styled.ul`
  display: flex;
  margin: auto;

  & a::after {
    position: absolute;
    background-image: linear-gradient(rgba(204, 0, 17.2) 30%, transparent 30%);
    background-size: 0% 2rem;
    width: 120%;
    background-position: 50% 0;
    background-repeat: repeat-y;
    left: -10%;
    top: 50%;
    height: 0.2rem;
    margin-top: 0.9rem;
    content: '';
    transform: translateY(24px);
    transition: all 0.4s ease;
    cursor: default;
  }

  & a:hover::after {
    background-size: 100% 2rem;
  }

  & a.current::after {
    background-size: 100% 2rem;
  }

  & a {
    position: relative;
    font-weight: 600;
    line-height: 1.8;
    font-size: 1.5rem;
  }

  & li {
    margin-left: 5rem;
  }
  & li:first-child {
    margin-left: 0;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const MenuItems = styled.li`
  & div {
    cursor: pointer;
  }
  & a {
    cursor: pointer;
    color: #313131;
    text-decoration: none;
    transition: color 0.1s;
  }
  & a.mail {
    display: block;
    background-image: url('https:user-images.githubusercontent.com/71132893/121883934-4c3a5800-cd4d-11eb-8c70-d9dece275b9f.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 3rem;
    height: 3rem;
    font-size: 0;
    margin-top: 0.3rem;
  }
`;

export interface ClickedProps {
  clicked: boolean;
}

const firstSpanStyle = css`
  ${({ clicked }: ClickedProps) => clicked
    && css`
      transform: rotate(-45deg) translate(-7px, 6px);
    `}
`;

const secondSpanStyle = css`
  ${({ clicked }: ClickedProps) => clicked
    && css`
      opacity: 0;
    `}
`;

const lastSpanStyle = css`
  ${({ clicked }: ClickedProps) => clicked
    && css`
      transform: rotate(45deg) translate(-7px, -6px);
    `}
`;

export const Hamburger = styled.div`
  display: none;
  margin-left: auto;
  & span {
    cursor: pointer;
    display: block;
    width: 3.5rem;
    height: 0.5rem;
    background-color: #313131;
    margin: 0.4rem 0;
    transition: all 0.4s;
  }
  &:hover span {
    background-color: #cc0001;
  }
  & span:first-child {
    margin-top: 0.7rem;
    ${firstSpanStyle}
  }
  & span:nth-child(2) {
    ${secondSpanStyle}
  }
  & span:last-child {
    ${lastSpanStyle}
  }
  @media screen and (max-width: 600px) {
    display: block;
  }
`;

export const HamburgerSpan = styled.span``;

const menuStyle = css`
  ${({ clicked }: ClickedProps) => clicked
    && css`
      left: 0;
    `}
`;

export const HamburgerMenus = styled.ul`
  transition: all 0.4s;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  position: absolute;
  top: 7rem;
  left: -600px;
  width: 100%;
  z-index: 20;
  & a:hover,
  & div:hover {
    color: #cc0001;
  }
  & a,
  div {
    display: block;
    width: 100%;
    font-weight: 400;
    text-align: center;
    font-size: 2rem;
    margin: 1rem 0;
  }
  ${menuStyle}
`;
