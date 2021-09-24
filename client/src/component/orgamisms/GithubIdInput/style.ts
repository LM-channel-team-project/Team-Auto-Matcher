import styled from 'styled-components';

import ImgComponent from 'component/atoms/Img';
import InputTextComponent from 'component/atoms/InputText';

export const GithubIdInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.6rem;

  border: 0.4rem solid black;

  font-size: 3rem;
`;

export const InputText = styled(InputTextComponent)`
  margin-left: 2rem;
  height: 3.2rem;
  font-size: 3rem;
`;

export const Img = styled(ImgComponent)`
  margin-right: 2rem;
  width: 6rem;
  height: 6rem;
`;

export default GithubIdInput;
