import InputText from 'component/atoms/InputText';
import _TextLabel from 'component/atoms/TextLabel';
import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const LabelWrapper = styled.div`
  position: relative;
  display: inline-block;
  font-size: 1rem;

  &:hover > button {
    visibility: visible;
    opacity: 0.8;
  }
`;

export const LabelRemoveBottton = styled.button`
  position: absolute;
  right: -0.1em;
  top: -0.2em;
  width: 1em;
  font-size: 1.2em; // ralative sizing to LabelWrapper
  line-height: 1em;
  border-radius: 50%;
  border: 1px solid black;
  background-color: white;
  box-sizing: content-box;
  z-index: 1;
  visibility: hidden;
  opacity: 0;
  cursor: pointer;
  transition: opacity 150ms ease-in;
`;

export const TextLabel = styled(_TextLabel)`
  margin-bottom: 0.4em;

  &:not(:last-child) {
    margin-right: 0.4em;
  }
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

  ${({ theme }) => css`
      background-color: ${theme.color.white};
      color: ${theme.color.black};
  `}
`;
