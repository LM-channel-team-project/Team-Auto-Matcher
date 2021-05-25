import styled, { css } from 'styled-components';
import globalTheme from 'style/theme';

export interface StyleProps {
  color?: keyof typeof globalTheme.color.label;
  outline?: boolean;
}

const colorStyle = css<StyleProps>`
  ${({ theme, color = 'gray' }) => {
    const selected = theme.color.label[color];
    return color && (
      css`
        background-color: ${selected};

        ${(props: StyleProps) => props.outline && css`
          background-color: ${theme.color.white};
          color: ${selected};
          border: 1px solid ${selected};
        `}
      `
    );
  }
}
`;

export const TextLabel = styled.div<StyleProps>`
  display: inline-block;
  font-size: 1em;
  padding: 0 1em;
  line-height: 2em;
  height: 2em;
  border-radius: 2.5em;

  ${colorStyle}
`;

export const Text = styled.span`
  font-size: 1em;
`;
