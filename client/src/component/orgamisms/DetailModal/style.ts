import styled, { css } from 'styled-components';
import DetailContent from 'component/molecules/DetailContent';
import _LabelInputBox from 'component/molecules/LabelInputBox';
import _TextLabel from 'component/atoms/TextLabel';
import InputText from 'component/atoms/InputText';
import Button from 'component/atoms/Button';
import globalTheme from 'style/theme';

type TitleProps = {
  type: 'team' | 'personal';
}

type TextProps = {
  type?: 'people';
}

type StyleProps = {
  theme: typeof globalTheme;
}

export const Domain = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.5em;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.8em;

  ${({ type }: TitleProps) => css`
      &:after {
        content: '${type === 'team' ? ' 팀' : ''}';
      }
    `}
`;

export const Desc = styled.p`
  font-size: 1.3rem;
  margin-bottom: 1.5em;
`;

export const ContentsList = styled.ul`
  &:not(:last-child) {
    margin-bottom: 3em;
  }
`;

export const ContentItem = styled.li`
  &:not(:last-child) .ci-block {
    margin-bottom: 2.5em;
  }

  &:not(:last-child) .ci-people {
    margin-bottom: 1.5em;
  }
`;

export const InlineContent = styled(DetailContent)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;

  .dc-title {
    font-size: 1.6rem;
    white-space: nowrap;
  }

  .dc-title:after {
    content: ':';
    margin-right: 0.8em;
  }
  
  &.ci-skills .dc-title {
    line-height: 1.3em;
  }
`;

export const BlockContent = styled(DetailContent)`
  text-align: left;

  .dc-title {
    font-size: 1.6rem;
    margin-bottom: 0.8em;
  }
`;

export const Text = styled.span`
  font-size: 1.3rem;
  line-height: 1.4em;

  ${({ type }: TextProps) => css`
    &:not(:last-child):after {
      content: '${type === 'people' ? '님, ' : ''}';
    }

    &:last-child:after {
      content: '${type === 'people' ? '님' : ''}';
    }
  `}
`;

export const TextLabel = styled(_TextLabel)`
  font-size: 1.1rem;
  margin-bottom: 0.4em;

  &:not(:last-child) {
    margin-right: 0.4em;
  }
`;

export const Paragraph = styled.p`
  font-size: 1.3rem;
  line-height: 1.2em;
  white-space: pre-line;
`;

export const SubmitButton = styled(Button)``;

/* Styling Input Components for TeamAddForm */

const inputStyle = css`
  ${({ theme }: StyleProps) => css`
      background-color: ${theme.color.white};
      color: ${theme.color.black};
  `}
  
  font-size: 1.3rem;
  padding: 0.3em 0.5em;
  border-radius: 5px;
  border: 2px solid #cdcdcd;
  outline: none;

  &:focus {
    border-width: 2px;
    border-color: #abdcbd;
  }

  &:hover {
    border-width: 2px;
    border-color: #bcabef;
  }
`;

export const TitleInput = styled(InputText)`
  ${inputStyle}
  text-align: center;
  display: block;
  font-size: 2.5rem;
  margin: 0 auto 0.5em auto;
`;

export const OutlineInput = styled(InputText)`
  ${inputStyle}
  text-align: center;
`;

export const LabelInputBox = styled(_LabelInputBox)`
  & .lb-label {
    font-size: 1.1rem;
  }

  & .lb-input {
    font-size: 1.2rem;
    vertical-align: top;
    text-align: center;
    padding: 0.2em 0.4em;
  }
`;

export const Textarea = styled(InputText)`
  ${inputStyle}

  font-size: 1.3rem;
  line-height: 1.2em;
  padding: 0.3em 0.5em 0.8em 0.5em;
  resize: none;
  width: 100%;
  height: auto;
  min-height: 3em;
  overflow-y: hidden;
  box-sizing: border-box;

  &:not(:last-child) {
    margin-right: 0.2em;
  }
`;
