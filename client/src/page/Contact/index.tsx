import React from 'react';
import MenuBar from 'component/templates/menuBar';
import * as S from './style';

const Contact = ({ className } : any) => {
  interface IContact {
    name:string,
    role:string,
    backgroundUrl:string,
    englishName:string,
    githubHref:string,
    github:string,
    blogHref?:string,
    blog?:string,
    mailHref:string,
    mail:string,
    say:string,
  }
  const SetMates = ({
    name,
    role,
    backgroundUrl,
    englishName,
    githubHref,
    github,
    blogHref,
    blog,
    mailHref,
    mail,
    say,
  }:IContact):any => (
    <S.Mates>
      <S.FlipWrapper>
        <S.FlipFront>
          <S.FlipTop>
            <S.FlipTopSpan>{name}</S.FlipTopSpan>
            <S.FlipTopSpan>{role}</S.FlipTopSpan>
          </S.FlipTop>
          <S.FlipBottom background={backgroundUrl}/>
        </S.FlipFront>
        <S.FlipBack>
          <S.FlipBackP>{englishName}</S.FlipBackP>
          <S.FlipBackP>
            <S.FlipBackA href={githubHref}>{github}</S.FlipBackA>
          </S.FlipBackP>
          {blogHref && <S.FlipBackP>
            <S.FlipBackA href={blogHref}>{blog}</S.FlipBackA>
          </S.FlipBackP>}
          <S.FlipBackP>
            <S.FlipBackA href={mailHref}>{mail}</S.FlipBackA>
          </S.FlipBackP>
          <S.FlipBackP>{say}</S.FlipBackP>
        </S.FlipBack>
      </S.FlipWrapper>
    </S.Mates>
  );
  return (
    <>
      <MenuBar></MenuBar>
      <S.Contact className={className}>
        <S.Teams>
          <SetMates
            name='박상신'
            role='Director'
            backgroundUrl='https://avatars.githubusercontent.com/u/34783156?v=4'
            englishName='Sangshin Park'
            githubHref='https://github.com/pkiop'
            github='https://github.com/pkiop'
            blogHref='https://blog.pkiop.me'
            blog='https://blog.pkiop.me'
            mailHref='mailto:pkiopb@gmail.com'
            mail='pkiopb@gmail.com'
            say='하고 싶은 말'
          ></SetMates>
          <SetMates
            name='임홍규'
            role='Manager'
            backgroundUrl='https://avatars.githubusercontent.com/u/44824320?v=4'
            englishName='HK'
            githubHref='https://github.com/lhk3337'
            github='https://github.com/lhk3337'
            mailHref='mailto:lhk3337@naver.com'
            mail='lhk3337@naver.com'
            say='하고 싶은 말'
          ></SetMates>
          <SetMates
            name='오영롱'
            role='Manager'
            backgroundUrl='https://avatars.githubusercontent.com/u/64844815?v=4'
            englishName='Oh Young-rong'
            githubHref='https://github.com/youngrongoh'
            github='https://github.com/youngrongoh'
            mailHref='mailto:youngrong.oh@gmail.com'
            mail='youngrong.oh@gmail.com'
            say='하고 싶은 말'
          ></SetMates>
          <SetMates
            name='주병호'
            role='Manager'
            backgroundUrl='https://avatars.githubusercontent.com/u/71132893?v=4'
            englishName='Joo-Byungho'
            githubHref='https://github.com/Ho-s'
            github='https://github.com/Ho-s'
            blogHref='https://ho-space.netlify.app/'
            blog='https://ho-space.netlify.app/'
            mailHref='mailto:kjcoco13@gmail.com'
            mail='kjcoco13@gmail.com'
            say='하고 싶은 말'
          ></SetMates>
        </S.Teams>
      </S.Contact>
    </>
  );
};

export default Contact;
