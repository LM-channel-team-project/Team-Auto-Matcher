import styled, { css } from 'styled-components';
import globalTheme from 'style/theme';

export interface StyleProps {
  color?: keyof typeof globalTheme.color.label;
  fontColor?: keyof typeof globalTheme.color.text;
  outline?: boolean;
}

const colorStyle = css<StyleProps>`
  ${({ theme, color = 'gray' }) => {
    const selected = theme.color.label[color];
    return color && (
      css`
        background-color: ${selected};

        ${() => ['navy', 'darkGreen'].includes(color) && css`
          color: ${theme.color.white};
        `}

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

const fontColorStyle = css<StyleProps>`
  ${({ theme, fontColor = 'black' }) => {
    const selected = theme.color.text[fontColor];
    return fontColor && css`color: ${selected};`;
  }
}
`;

export const TextLabel = styled.div<StyleProps>`
  display: inline-block;
  font-size: 1rem;
  padding: 0 1em;
  line-height: 2em;
  height: 2em;
  border-radius: 2.5em;

  ${colorStyle}

  ${fontColorStyle}
`;

export const Text = styled.span`
  font-size: 1em; // Relative Sizing for TextLabel
`;
