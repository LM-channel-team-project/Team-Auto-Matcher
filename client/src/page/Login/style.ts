import styled from 'styled-components';

export const LoginPage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const wrapper = styled.div`
  padding: 50px 90px;
  border-radius: 20px;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #313131;
  color: rgba(255,255,255,0.4);
  letter-spacing: 2px;
  font-size:18px;
  font-weight: bold;
  position:relative;
  cursor: pointer;
  display: inline-block;
  text-decoration:none;
  padding:20px 50px;
  transition:1s;

  & span{
    display: block;
    position: absolute;
    background: #2894ff;
  }

  & span:nth-child(1){
    left: 0;
    bottom: 0;
    width: 3px;
    height: 100%;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform .5s;
  }

  & span:nth-child(2){
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform .5s;
  }

  & span:nth-child(3){
    right: 0;
    bottom: 0;
    width: 3px;
    height: 100%;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform .5s;
    transition-delay: .5s;
  }

  & span:nth-child(4){
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform .5s;
    transition-delay: .5s;
  }

  &:hover{
    color: rgba(255,255,255,1);
    span:nth-child(1){
    transform: scaleY(1);
    transform-origin: bottom;
    transition: transform .5s;
    };

    span:nth-child(2){
      transform: scaleX(1);
      transform-origin: left;
      transition: transform .5s;
    };

    span:nth-child(3){
      transform: scaleY(1);
      transform-origin: bottom;
      transition: transform .5s;
      transition-delay: .5s;
    };

    span:nth-child(4){
      transform: scaleX(1);
      transform-origin: left;
      transition: transform .5s;
      transition-delay: .5s;
    };
  }
`;

export const Title = styled.div`
  font-size: 45px;
  margin-bottom: 50%;
`;
