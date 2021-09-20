import styled, { css } from 'styled-components';

import AutoCompleteItem, { Props as ItemProps } from 'component/molecules/AutoCompleteItem';

export interface StyleProps extends Omit<ItemProps, 'text' | 'theme'> {}

export const List = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.color.background};
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(80, 80, 80, 0.2);
  overflow: hidden;
  white-space: nowrap;
`;

export const Item = styled(AutoCompleteItem)`
  transition: background 100ms ease;

  &.focus,
  &:hover {
    ${({ theme }) => css`
      background: ${theme.color.select};
      color: ${theme.color.white};
    `}
  }
`;

export default {};
