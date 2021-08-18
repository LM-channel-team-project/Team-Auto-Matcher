import React, { useEffect, useRef, useState } from 'react';
import { listNotice } from 'graphql/queries';
import { createNotice } from 'graphql/mutations';
import { gql, useMutation, useQuery } from '@apollo/client';
import DetailModalTemplate from '../template';
import * as S from '../style';

interface InputState {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ContentsState {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

const NoticeAddForm = ({ onCloseModal }: any) => {
  const [createNoticeData] = useMutation(
    gql`
      ${createNotice}
    `,
  );
  const { refetch } = useQuery(
    gql`
      ${listNotice}
    `,
  );

  const dateObj = new Date();
  const today = `${dateObj.getFullYear()} - ${dateObj.getMonth() + 1} - ${dateObj.getDate()}`;
  // Data to submit when create a team
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>(today);
  const [contents, setContents] = useState<string>('');

  const inputsState: { [key: string]: InputState } = {
    title: {
      value: title,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
      },
    },
    date: {
      value: date,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
      },
    },
  };

  const contentsState: ContentsState = {
    value: contents,
    onChange: (
      event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
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
      <S.OutlineInput
        value={inputsState.date.value}
        placeholder="날짜"
        autoWidth
        minWidth={4}
        maxWidth={300}
        onChange={inputsState.date.onChange}
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
    await createNoticeData({
      variables: {
        input: {
          title,
          date,
          contents,
        },
      },
    });
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