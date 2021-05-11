import React from 'react';
import * as S from './style';

const MatchPresenter = ({
  className,
  data,
}: {
  className: string;
  data: any;
}) => {
  const { items } = data.listMatchWaitQueue;
  const temp = items.map((el: any) => {
    const stacks = el.stacks.map((stack: string) => <S.Text>{stack}</S.Text>);
    return (
      <S.List>
        <S.Text>{el.name}</S.Text>
        <S.Text>{el.year}</S.Text>
        <S.Stack>{stacks}</S.Stack>
        <S.Text>{el.message}</S.Text>
        <S.Text>{el.state}</S.Text>
      </S.List>
    );
  });
  return (
    <S.MatchPage className={className}>
      <S.Title>매칭 대기열</S.Title>
      <S.Title>Front-End</S.Title>
      {temp}
    </S.MatchPage>
  );
};
export default MatchPresenter;
