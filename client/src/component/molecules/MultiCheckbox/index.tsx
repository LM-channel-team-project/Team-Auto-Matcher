import React, { useRef } from 'react';

import * as S from './style';

interface IMultiCheckbox {
  questionList: string[];
  bDuplicateSelect?: boolean;
  selectedData?: string[];
  setSelectedData: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

function MultiCheckbox({
  questionList,
  bDuplicateSelect = false,
  selectedData = [],
  setSelectedData,
  className,
}: IMultiCheckbox) {
  const checkBoxListElement = useRef<HTMLDivElement>(null);

  const CheckboxList = questionList.map((question: string) => (
    <S.Wrapper key={question} className={'wrapper'}>
      <S.Checkbox checked={selectedData.includes(question)} />
      <S.QuestionBlock>
        <span>{question}</span>
      </S.QuestionBlock>
    </S.Wrapper>
  ));

  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectCheckboxElement = (event.target as HTMLElement)
      .closest('.wrapper')
      ?.getElementsByTagName('input')[0];
    if (!selectCheckboxElement) return;

    if (selectCheckboxElement.checked) {
      selectCheckboxElement.checked = false;
    } else {
      checkBoxListElement?.current?.childNodes.forEach((el: ChildNode) => {
        const checkboxElement = (el as HTMLDivElement).getElementsByTagName(
          'input',
        )[0];
        if (!bDuplicateSelect) {
          checkboxElement.checked = false;
        }
      });
      selectCheckboxElement.checked = true;
    }

    const selectedList: string[] = [];
    checkBoxListElement?.current?.childNodes.forEach((el: ChildNode) => {
      const checkboxElement = (el as HTMLDivElement).getElementsByTagName(
        'input',
      )[0];
      if (checkboxElement.checked) {
        const selectText = checkboxElement?.nextElementSibling?.textContent;
        selectedList.push(selectText || '');
      }
    });
    setSelectedData([...selectedList]);
  };

  const onChangeHandler = (event: any) => {
    setSelectedData([event.target.value]);
  };

  if (questionList.length > 0) {
    return (
      <S.MultiCheckbox
        onClick={onClickHandler}
        ref={checkBoxListElement}
        className={className}
      >
        {CheckboxList}
      </S.MultiCheckbox>
    );
  }
  return (
    <>
      {bDuplicateSelect ? (
        <S.Input
          maxLength={20}
          placeholder="20자 이하로 작성해주세요."
          value={selectedData[0] || ''}
          onChange={onChangeHandler}
        />
      ) : (
        <S.Input
          maxLength={400}
          placeholder="400자 이하로 작성해주세요."
          value={selectedData[0] || ''}
          onChange={onChangeHandler}
        />
      )}
    </>
  );
}

export default MultiCheckbox;
