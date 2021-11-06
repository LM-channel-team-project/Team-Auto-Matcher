import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { CREATE_NOTICE } from 'graphql/mutations';
import { LIST_NOTICE } from 'graphql/queries';

import makeObjectShorten from 'utils/makeObjectShorten';
import DetailModalTemplate from '../template';
import * as S from '../style';

interface InputState {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ContentsState {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const NoticeAddForm = ({ onCloseModal }: any) => {
  const [createNoticeData] = useMutation(CREATE_NOTICE);
  const { refetch } = useQuery(LIST_NOTICE);

  // Data to submit when create a team
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  const inputsState: { [key: string]: InputState } = {
    title: {
      value: title,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
      },
    },
  };

  const contentsState: ContentsState = {
    value: contents,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { target } = event;
      // Change height of Textarea automatically by value;
      target.style.height = `${target.scrollHeight}px`;
      setContents(event.target.value);
    },
  };

  const headerContents = (
    <>
      <S.TitleInput
        value={inputsState.title.value}
        placeholder="제목"
        autoWidth
        maxLength={30}
        minWidth={4}
        maxWidth={350}
        onChange={inputsState.title.onChange}
      />
    </>
  );

  const bodyContents = () => {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      // initailize height on mounted
      if (ref.current) {
        const { scrollHeight, style } = ref.current! as HTMLTextAreaElement;
        style.height = `${scrollHeight}px`;
      }
    }, []);

    return (
      <S.ContentItem>
        <S.BlockContent className="ci-block">
          <S.Textarea
            placeholder="내용"
            inputRef={ref}
            type="textarea"
            value={contentsState.value}
            onChange={contentsState.onChange}
          />
        </S.BlockContent>
      </S.ContentItem>
    );
  };

  const onMake = async () => {
    const noticeObject = {
      title,
      date: new Date(),
      contents,
    };
    await createNoticeData(makeObjectShorten(noticeObject));
    await refetch();
    onCloseModal();
  };

  return (
    <>
      <DetailModalTemplate
        modalHeader={headerContents}
        modalBody={bodyContents()}
        modalButton={
          <>
            <S.SubmitButton size="medium" color="yellow" onClick={onMake}>
              공지 추가하기
            </S.SubmitButton>
            <S.SpaceSpan />
            <S.SubmitButton size="medium" color="red" onClick={onCloseModal}>
              취소
            </S.SubmitButton>
          </>
        }
        onCloseModal={onCloseModal}
      />
    </>
  );
};

export default NoticeAddForm;
