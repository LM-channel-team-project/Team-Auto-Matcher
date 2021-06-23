import React from 'react';
import * as S from './style';

type ExtractKey<O, K extends keyof O> = O[K];

interface Item {
  text: string;
  color: ExtractKey<S.StyleProps, 'color'>
}

interface Props extends S.StyleProps {
  className: string;
  items: [Item];
  divider?: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const AutoCompleteList = ({
  className, items, size, divider, dividerColor, onClick,
}: Props) => (
  <S.List className={className}>
    {items.map((item) => (
      <S.Item
        key={item.text}
        text={item.text}
        color={item.color}
        size={size}
        divider={divider}
        dividerColor={dividerColor}
        onClick={onClick}
      />
    ))}
  </S.List>
);

export default AutoCompleteList;
