import styled, { css } from 'styled-components';

type Props = {
  value?: string | number;
  autoWidth?: boolean;
  minWidth?: number;
}

// Extract the type of the value matched with a key in Object type
type ExtractTOfV<O, K> = K extends keyof O ? O[K] : never;

type Value = ExtractTOfV<Props, 'value'>;

const calcWidthbyLength = (str: string) => {
  const korRegExp = /[ㄱ-ㅎ가-힣]+/g;
  const upperRegExp = /[A-Z]+/g;
  const korMatch = str.match(korRegExp) || [];
  const upperMatch = str.match(upperRegExp) || [];
  const korLength = Array.from(korMatch).join('').length;
  const upperLength = Array.from(upperMatch).join('').length;
  return (str.length - korLength - upperLength) * 0.5 + upperLength * 0.7 + korLength * 0.9;
};

const getWidthByLength = (value: Value = '', min: number = 3) => {
  const width = calcWidthbyLength(String(value));
  return (css`
    width: ${width > min ? width : min}em;
    box-sizing: content-box;
  `);
};

export const InputText = styled.input`
  ${({ value, autoWidth, minWidth }: Props) => autoWidth && getWidthByLength(value, minWidth)}
`;

export const InputTextarea = styled.textarea`
`;

export default {};
