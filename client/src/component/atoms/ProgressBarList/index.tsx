import React from 'react';
import * as S from './style';

interface IProgressBarLists {
  onClickList: any;
  classProps?:string;
  setId?:Number;
  Brief:any;
}

function ProgressBarLists({
  onClickList,
  classProps,
  setId,
  Brief,
}: IProgressBarLists) {
  return (
    <S.ProgressBarList className={`${classProps}`}>
      <div id={`${setId}`} onClick={onClickList} ></div>
      <span>{Brief}</span>
    </S.ProgressBarList>
  );
}

export default ProgressBarLists;
