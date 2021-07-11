import styled, { css } from 'styled-components';
import globalTheme from 'style/theme';

export interface StyleProps {
  color?: keyof typeof globalTheme.color.button;
  size?: keyof typeof sizes;
}

const colorStyles = css<StyleProps>`
  ${({ theme, color }) => color
    && css`
      background-color: ${theme.color.button[color]};

      border: none;
      padding: 0.5em 1.2em;
      border-radius: 0.5em;
    `}
`;

const sizes = {
  biglarge: { padding: '0.8em 1.5em', fontSize: '2em', fontWeight: 'bold' },
  large: { padding: '0.8em 1.5em', fontSize: '1.2em', fontWeight: '' },
  medium: { padding: '0.8em 1.5em', fontSize: '1em', fontWeight: '' },
  small: { padding: '0.8em 1.5em', fontSize: '0.875em', fontWeight: '' },
};

const sizeStyles = css<StyleProps>`
  ${({ size }) => size
    && css`
      padding: ${sizes[size].padding};
      font-size: ${sizes[size].fontSize};
      font-weight: ${sizes[size].fontWeight};
    `}
`;

export const Button = styled.button<StyleProps>`
  background-color: white;
  color: black;
  cursor: pointer;

  ${colorStyles}

  ${sizeStyles}
`;

export default {};
