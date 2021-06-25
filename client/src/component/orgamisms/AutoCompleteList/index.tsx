import React from 'react';
import * as S from './style';

type ExtractKey<O, K extends keyof O> = O[K];

export interface Item {
  text: string;
  color: ExtractKey<S.StyleProps, 'color'>
}

export interface Props extends S.StyleProps {
  listRef?: React.MutableRefObject<HTMLDivElement | undefined>
  className?: string;
  items?: Item[];
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const AutoCompleteList = ({
  listRef, className, items, size, divider, dividerColor, onClick,
}: Props) => (
  <S.List
    className={className}
    ref={listRef ? listRef as React.MutableRefObject<HTMLDivElement> : undefined}
  >
    {items?.map((item) => (
      item && <S.Item
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
