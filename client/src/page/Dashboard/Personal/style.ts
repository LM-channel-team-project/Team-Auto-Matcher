import styled from 'styled-components';

export const Top = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  padding-top: 20px;
  background-color: #fff;
  margin-bottom: 10px;
  padding-bottom: 5px;
`;

export const MainBtn = styled.button`
  cursor: pointer;
  width: 250px;
  height: 60px;
  position: absolute;
  top: 30px;
  left: 60px;
  font-size: 30px;
  border-radius: 20px;
`;

export const Main = styled.h1`
  display: flex;
  margin-top: 5%;
  margin-bottom: 2%;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

export const Slider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
export const Button = styled.div`
  cursor: pointer;
  background-color: #dfe6e9;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Field = styled.h1`
  width: 300px;
  text-align: center;
  font-size: 40px;
  margin: 0px 20px;
`;

export const MatchPage = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const List = styled.div`
  display: flex;
  width: 1100px;
  cursor: pointer;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 20px;
  border: 3px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export const Title = styled.h1`
  font-size: 40px;
`;

export const Text = styled.div`
  font-size: 20px;
`;
export const Stack = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Stacklist = styled.div`
  font-size: 20px;
  margin-right: 10px;
  background-color: #dfe6e9;
  border-radius: 30px;
  padding: 8px 10px;
`;

export const Team = styled.div`
  border-radius: 30px;
  background-color: #e3faf3;
  padding: 8px 20px;
  color: #07c3a7;
  font-size: 18px;
  font-weight: bold;
`;

export default {};
