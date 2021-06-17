import styled, { css } from 'styled-components';

export const MenuBar = styled.nav`
  position: fixed;
  top:0;
  background-color: white;
  left:0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding:1.7rem 15rem;
  border-bottom: 0.1rem solid rgb(233,233,233);
  z-index:3;
  @media screen and (max-width:900px){
    padding:1.7rem 10rem;
  }
  @media screen and (max-width:800px){
    padding:1.7rem 5rem;
  }
  @media screen and (max-width:700px){
    padding:1.7rem 1rem;
  }
`;

export const MenuLeft = styled.ul`
  & a{
    display: flex;
    width:21.5rem;
  }
`;

export const MainImage = styled.div`
  display: block;
  background-image:url('https://user-images.githubusercontent.com/71132893/122219295-43cb5400-ceea-11eb-9a71-60b772017020.png');
  background-repeat:no-repeat;
  background-size: cover;
  width:3.24rem;
  height:3.05rem;
  margin-top: .15rem;
`;

export const MainText = styled.div`
    margin-left: 0.5rem;

  & p:first-child{
    font-size: 1.5rem;
    font-weight: 800;
    color:#313131;
    line-height: 1.2;
    & span{
      color:#cc0011;
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1.2;
      margin: 0 0.5rem;
    }
  }

  & p:last-child{
    font-size: 1.28rem;
    font-weight: 600;
    line-height: 1.2;
    color:#d0d0d0;
  }
`;

export const MenuRight = styled.ul`
  display: flex;
  & div{
    width:8rem;
    height:3.5rem;
    background-color: #cc0011;
    border-radius: 3.5rem;
    color: white;
    transition:all .4s;
    cursor: pointer;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 2.6;
  }
  & div:hover{
    background-color: #313131;
  }
  & a{
    font-weight: 400;
    font-size: 2rem;
    line-height: 1.8;
  }
  & li{
    margin-left:3rem;
  }
  & li:first-child{
    margin-left:0;
  }
  @media screen and (max-width:600px){
    display:none;
  }
`;

export const MenuCenter = styled.ul`
  display: flex;
  margin: auto;

  & a::after{
    position: absolute;
    background-image:linear-gradient(rgba(204,0,17.2) 30%,transparent 30%);
    background-size:0% 20px;
    width:120%;
    background-position:50% 0;
    background-repeat:repeat-y;
    left: -10%;
    top: 50%;
    height: 3px;
    margin-top: 8px;
    content: '';
    transform: translateY(24px);
    transition: all .4s ease;
    cursor:default;
  }

  & a:hover::after{
    background-size:100% 20px;
  }

  & a.current::after{
    background-size:100% 20px;
  }
  
  & a{
    position: relative;
    font-weight: 600;
    line-height: 1.8;
    font-size: 1.5rem;
  }

  & li{
    margin-left:5rem;
  }
  & li:first-child{
    margin-left:0;
  }
  @media screen and (max-width:600px){
    display:none;
  }
`;

export const MenuItems = styled.li`
  & div{
    cursor: pointer;
  }
  & a{
    cursor: pointer;
    color: #313131;
    text-decoration: none;
    transition:color .1s;
  }
  & a.mail{
    display:block;
    background-image:url('https:user-images.githubusercontent.com/71132893/121883934-4c3a5800-cd4d-11eb-8c70-d9dece275b9f.png');
    background-repeat:no-repeat;
    background-size: cover;
    width:3rem;
    height:3rem;
    font-size:0;
    margin-top: 0.3rem;
  }
`;

export interface ClickedProps{
  clicked : boolean;
}

const firstSpanStyle = css`
  ${({ clicked }:ClickedProps) => {
    const sth = 0;
    return clicked && (
      css`
        transform: rotate(-45deg) translate(-9px, 6px);
      `
    );
  }
}
`;

const secondSpanStyle = css`
  ${({ clicked }:ClickedProps) => {
    const sth = 0;
    return clicked && (
      css`
        opacity: 0;
      `
    );
  }
}
`;

const lastSpanStyle = css`
  ${({ clicked }:ClickedProps) => {
    const sth = 0;
    return clicked && (
      css`
        transform: rotate(45deg) translate(-8px, -8px);
      `
    );
  }
}
`;

export const Hamburger = styled.div`
  display: none;
  margin-left: auto;
  & span{
    cursor:pointer;
    display:block;
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
  }
  & span:first-child{
    margin-top:0.7rem;
    ${firstSpanStyle}
  }
  & span:nth-child(2){
    ${secondSpanStyle}
  }
  & span:last-child{
    ${lastSpanStyle}
  }
  @media screen and (max-width:600px){
    display:block;
  }
`;

export const HamburgerSpan = styled.span`
`;

const menuStyle = css`
  ${({ clicked }:ClickedProps) => {
    const sth = 0;
    return clicked && (
      css`
        display: block;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
        margin-top:9rem;
      `
    );
  }
}
`;

export const HamburgetMenus = styled.ul`
  transition: all .4s;
  margin-top: -100rem;
  margin-bottom: 57rem;
  z-index: 1;
  & a:hover,
  & div:hover{
    color:#cc0011
  }
  & a, div{
    display: block;
    width:100%;
    font-weight: 400;
    text-align: center;
    font-size: 4rem;
    margin-top: 2rem;
  }
  & li:first-child{
    margin-top:9rem;
  }
  ${menuStyle}
`;
