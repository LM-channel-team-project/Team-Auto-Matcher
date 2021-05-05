import React from 'react';
import GitHubWhitePlus from 'image/GitHubBlackPlus.png';
import * as S from './style';

interface IGithubIdInput {
  className?: string;
}

function GithubIdInput({
  className,
}: IGithubIdInput) {
  return (
    <S.GithubIdInput className={className}>
      <S.Img src={GitHubWhitePlus} />
      GitHub ID를 입력하세요 :
      <S.InputText />
    </S.GithubIdInput>
  );
}

export default GithubIdInput;
