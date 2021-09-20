import styled from 'styled-components';

import InputText from 'component/atoms/InputText';
import _TextLabel from 'component/atoms/TextLabel';
import DetailContent from 'component/molecules/DetailContent';

export const Container = styled.div``;

export const LabelWrapper = styled.div`
  font-size: 1rem;
  position: relative;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

export const LabelRemoveBottton = styled.button`
  position: absolute;
  right: .5rem;
  top: .5rem;
  width: 1em;
  font-size: 1.2em;
  line-height: 1em;
  border-radius: 50%;
  border: 1px solid black;
  background-color: white;
  box-sizing: content-box;
  z-index: 1;
  visibility: visible;
  cursor: pointer;
  transition: opacity 150ms ease-in;
`;

export const TextLabel = styled(_TextLabel)`
  margin-bottom: 0.4em;
  margin: 0 0.5rem;

  &:not(:last-child) {
    margin-right: 0.4em;
  }
`;

export const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.2em;
  padding: 0.5rem .5rem;
  white-space: pre-line;
  word-break: break-all;
`;

export const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
`;

export const Input = styled(InputText)`
  font-size: 1rem;
  padding: 0.3em 0.5em;
  border-radius: 1em;
  border: 2px solid #cdcdcd;
  outline: none;

  &:focus {
    border-color: #abdcbd;
  }

  &:hover {
    border-color: #bcabef;
  }
`;

export const BlockContent = styled(DetailContent)`
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  .dc-title {
    font-size: 1.6rem;
    margin-bottom: 0.8em;
  }
`;
