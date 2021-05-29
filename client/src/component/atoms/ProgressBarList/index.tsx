import React from 'react';
import * as S from './style';

interface IProgressBarLists {
  onClickList: any;
  classProps?:string;
  setId?:Number;
  brief:any;
}

function ProgressBarLists({
  onClickList,
  classProps,
  setId = 0,
  brief,
}: IProgressBarLists) {
  return (
    <S.ProgressBarList className={`${classProps}`}>
      <div id={`${setId}`} onClick={onClickList} ></div>
      <span>{brief}</span>
    </S.ProgressBarList>
  );
}

export default ProgressBarLists;
