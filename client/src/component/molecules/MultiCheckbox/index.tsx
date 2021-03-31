import React, { useRef } from 'react';
import * as S from './style';

interface IMultiCheckbox {
  questionList: string[];
  bDuplicateSelect?: boolean;
  className?: string;
}

function MultiCheckbox({ questionList, bDuplicateSelect = false, className }: IMultiCheckbox) {
  const checkBoxListElement = useRef<HTMLDivElement>(null);

  const CheckboxList = questionList.map((question: string) => (
    <S.Wrapper key={question} className={'wrapper'}>
      <S.QuestionBlock text={question} />
      <S.Checkbox />
    </S.Wrapper>
  ));

  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    checkBoxListElement?.current?.childNodes.forEach((el: ChildNode) => {
      const checkboxElement = (el as HTMLDivElement).getElementsByTagName('input')[0];
      if (!bDuplicateSelect) {
        checkboxElement.checked = false;
      }
    });

    const checkboxElement = (event.target as HTMLElement).closest('.wrapper')?.getElementsByTagName('input')[0];
    if (checkboxElement || (event.target as HTMLElement)?.tagName === 'INPUT') {
      checkboxElement!.checked = true;
    }
  };

  return (
    <S.MultiCheckbox onClick={onClickHandler} ref={checkBoxListElement} className={className}>
      {CheckboxList}
    </S.MultiCheckbox>
  );
}

export default MultiCheckbox;
