import globalTheme from 'style/theme';
import styled, { css } from 'styled-components';

export interface StyleProps {
  color?: keyof typeof globalTheme.color.label;
  size?: 'small' | 'medium' | 'large';
}

function sizeStyle({ size = 'medium' }: StyleProps) {
  let sizeNum: number;
  switch (size) {
  case 'small':
    sizeNum = 0.8;
    break;
  case 'medium':
    sizeNum = 1;
    break;
  case 'large':
    sizeNum = 1.2;
    break;
  default:
    throw new Error(`Enter a invalid size: ${size}`);
  }
  return css`
    width: ${sizeNum}rem;
    height: ${sizeNum}rem;`;
}

export const Circle = styled.div`
  display: inline-block;
  border-radius: 50%;

  background: ${({ theme, color = 'gray' }) => theme.color.label[color]};

  ${sizeStyle}
`;

export default {};
