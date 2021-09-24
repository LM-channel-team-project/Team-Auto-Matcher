import React from 'react';

import BaseTemplate from 'page/BaseTemplate';
import * as S from './style';

interface IContact {
  name: string;
  role: string;
  backgroundUrl: string;
  englishName: string;
  github: string;
  blog?: string;
  mailHref: string;
  mail: string;
}

const Contact = ({ className }: any) => {
  const data: IContact[] = [
    {
      name: '박상신',
      role: 'Director',
      backgroundUrl: 'https://avatars.githubusercontent.com/u/34783156?v=4',
      englishName: 'Sangshin Park',
      github: 'https://github.com/pkiop',
      blog: 'https://blog.pkiop.me',
      mailHref: 'mailto:pkiopb@gmail.com',
      mail: 'pkiopb@gmail.com',
    },
    {
      name: '임홍규',
      role: 'Manager',
      backgroundUrl: 'https://avatars.githubusercontent.com/u/44824320?v=4',
      englishName: 'HK',
      github: 'https://github.com/lhk3337',
      mailHref: 'mailto:lhk3337@gmail.com',
      mail: 'lhk3337@gmail.com',
    },
    {
      name: '오영롱',
      role: 'Manager',
      backgroundUrl: 'https://avatars.githubusercontent.com/u/64844815?v=4',
      englishName: 'Oh Young-rong',
      github: 'https://github.com/youngrongoh',
      mailHref: 'mailto:youngrong.oh@gmail.com',
      mail: 'youngrong.oh@gmail.com',
    },
    {
      name: '주병호',
      role: 'Manager',
      backgroundUrl: 'https://avatars.githubusercontent.com/u/71132893?v=4',
      englishName: 'Joo-Byungho',
      github: 'https://github.com/Ho-s',
      blog: 'https://ho-space.netlify.app/',
      mailHref: 'mailto:kjcoco13@gmail.com',
      mail: 'kjcoco13@gmail.com',
    },
  ];
  const SetMates = (): any =>
    data.map((datas) => (
      <S.Mates>
        <S.FlipWrapper>
          <S.FlipFront>
            <S.FlipTop>
              <S.FlipTopSpan>{datas.name}</S.FlipTopSpan>
              <S.FlipTopSpan>{datas.role}</S.FlipTopSpan>
            </S.FlipTop>
            <S.FlipBottom background={datas.backgroundUrl} />
          </S.FlipFront>
          <S.FlipBack>
            <S.FlipBackP>{datas.englishName}</S.FlipBackP>
            <S.FlipBackP>
              <S.FlipBackA href={datas.github}>{datas.github}</S.FlipBackA>
            </S.FlipBackP>
            {datas.blog && (
              <S.FlipBackP>
                <S.FlipBackA href={datas.blog}>{datas.blog}</S.FlipBackA>
              </S.FlipBackP>
            )}
            <S.FlipBackP>
              <S.FlipBackA href={datas.mailHref}>{datas.mail}</S.FlipBackA>
            </S.FlipBackP>
          </S.FlipBack>
        </S.FlipWrapper>
      </S.Mates>
    ));
  return (
    <BaseTemplate>
      <S.Contact className={className}>
        <S.Teams>
          <SetMates />
        </S.Teams>
      </S.Contact>
    </BaseTemplate>
  );
};

export default Contact;
