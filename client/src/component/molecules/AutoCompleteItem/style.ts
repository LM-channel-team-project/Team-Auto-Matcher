import globalTheme from 'style/theme';
import styled, { css } from 'styled-components';
import _ColorCircle, {
  Props as ColorCircleProps,
} from 'component/atoms/ColorCircle';

export interface StyleProps extends ColorCircleProps {
  theme: typeof globalTheme;
  dividerColor?: keyof typeof globalTheme.color;
  divider?: boolean;
}

export const AutoComplete = styled.div`
  position: relative;
  padding: 0.5em 0.8em;
  cursor: pointer;

  ${({ divider }: StyleProps) => divider
    && css`
      &:not(:last-child):after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: ${({ theme, dividerColor = 'subMainColor' }: StyleProps) => theme.color[dividerColor]};
        opacity: 0.2;
      }
    `}
`;

export const ColorCircle = styled(_ColorCircle)`
  margin-right: 0.3em;
`;

export const Text = styled.span`
  font-size: ${({ size }: StyleProps) => {
    let sizeNum: number;
    switch (size) {
    case 'small':
      sizeNum = 1;
      break;
    case 'medium':
      sizeNum = 1.2;
      break;
    case 'large':
      sizeNum = 1.5;
      break;
    default:
      throw new Error(`invalid size: ${size}`);
    }
    return sizeNum;
  }}rem;
`;

export default {};
