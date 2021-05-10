import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import MultiCheckboxComponent from 'component/molecules/MultiCheckbox';
// import ArrowNavComponent from 'component/molecules/ArrowNav';
import PageCntComponent from 'component/molecules/PageCnt';

export const Questionnaire = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 15px;

  padding: 1.6rem;
`;

export const QuestionBlock = styled(QuestionBlockComponent)`
  font-weight: 600;

  font-size: 3rem;

  margin: 1.6rem 0;
`;

export const PageCnt = styled(PageCntComponent)`
`;

export const MultiCheckbox = styled(MultiCheckboxComponent)`
  margin-bottom: 1.6rem;
`;

export const backButton = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  margin-right: 40px;
  font-size: 25px;
  font-weight: 600;
  color: #160840;
  background-color: white;
  cursor: pointer;
  transition: all .1s;
  &:hover{
    background-color: #191412;
    color:white;
  }
`;

export const nextButton = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  color: #160840;
  font-size: 25px;
  font-weight: 600;
  background-color: white;
  transition: all .1s;
  cursor: pointer;
  &:hover{
    color:white;
    background-color: #191412;
  }
`;

// export const ArrowNav = styled(ArrowNavComponent)`
//   justify-content: center;
// `;
