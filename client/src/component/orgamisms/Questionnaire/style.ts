import styled from 'styled-components';
import QuestionBlockComponent from 'component/atoms/QuestionBlock';
import MultiCheckboxComponent from 'component/molecules/MultiCheckbox';
import ArrowNavComponent from 'component/molecules/ArrowNav';
import PageCntComponent from 'component/molecules/PageCnt';

export const Questionnaire = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1.6rem;

  border: 0.4rem solid black;

  > .header {
    display: flex;
    justify-content: space-between;
    margin: 0 3rem;
  }
`;

export const QuestionBlock = styled(QuestionBlockComponent)`
  text-align: center; 

  font-size: 4rem;

  margin-bottom: 1.6rem;
`;

export const MultiCheckbox = styled(MultiCheckboxComponent)`
  margin-bottom: 2rem;
`;

export const ArrowNav = styled(ArrowNavComponent)`
  justify-content: center;
`;

export const PageCnt = styled(PageCntComponent)`
`;
