import React from 'react';
import * as S from './style';

interface IProgressBar {
  currentPage: number;
  totalPage: number
  className?: string;
  onClickList: any;
  listQuestionnairesData?:any;
}

function ProgressBar({
  currentPage,
  totalPage,
  className,
  onClickList,
  listQuestionnairesData,
}: IProgressBar) {
  return (
    <S.ProgressBar className={className}>
      {Array(totalPage).fill(null).map((v:any, i:number):any => {
        let whatClass:string = '';
        if (i < currentPage - 1) {
          whatClass = 'is-complete';
        } else if (i === currentPage - 1) {
          whatClass = 'is-active';
        }
        return (
          <S.ProgressBarList
            classProps={whatClass}
            onClickList={onClickList}
            setId={i}
            Brief={listQuestionnairesData[i].questionBrief}
          />
        );
      })}
    </S.ProgressBar>
  );
}

export default ProgressBar;
