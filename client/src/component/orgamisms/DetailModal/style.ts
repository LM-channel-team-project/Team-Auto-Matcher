import styled, { css } from 'styled-components';
import Button from 'component/atoms/Button';
import DetailContent from 'component/molecules/DetailContent';

interface ITitle {
  type: 'team' | 'personal';
}

export const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 0.8em;

  ${({ type }: ITitle) => css`
      &:after {
        content: '${type === 'team' ? ' 팀' : ''}';
      }
    `}
`;

export const Domain = styled.h2`
  font-size: 1.3em;
  margin-bottom: 0.5em;
`;

export const Desc = styled.p`
  font-size: 1.1em;
  margin-bottom: 1.5em;
`;

export const ContentsList = styled.ul`
  font-size: 1em;

  &:not(:last-child) {
    margin-bottom: 3em;
  }
`;

export const ContentItem = styled.li`
  font-size: 1em;

  &:not(:last-child) .ci-block {
    margin-bottom: 2.5em;
  }

  &:not(:last-child) .ci-inline {
    margin-bottom: 1.5em;
  }
`;

export const BlockContent = styled(DetailContent)`
  text-align: left;
  font-size: 1em;

  .dc-title {
    font-size: 1.5em;
    margin-bottom: 0.8em;
  }
`;

export const InlineContent = styled(DetailContent)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.2em;

  .dc-title {
    font-size: 1em;
    white-space: nowrap;
  }

  .dc-title:after {
    content: ':';
    margin-right: 0.8em;
  }

  .dc-label {
    font-size: 0.8em;

    &:not(:last-child) {
      margin-right: 0.2em;
    }
  }
`;

interface IText {
  type?: 'people';
}

export const Text = styled.span`
  font-size: 1em;

  ${({ type }: IText) => css`
    &:not(:last-child):after {
      content: '${type === 'people' ? '님, ' : ''}';
    }

    &:last-child:after {
      content: '${type === 'people' ? '님' : ''}';
    }
  `}
`;

export const Paragraph = styled.p`
  font-size: 1em;
  white-space: pre-line;
`;

export const SubmitButton = styled(Button)``;
