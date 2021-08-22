import React from 'react';
import * as S from './style';

interface InputType {
  type?: 'text';
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusOut?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface TextAreaType {
  type: 'textarea';
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocusOut?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

type IInputText = {
  className?: string;
  invalid?: boolean;
  name?: string;
  value?: string | number;
  placeholder?: string;
  maxLength?: number;
  autoWidth?: boolean;
  maxWidth?: number;
  minWidth?: number;
} & (InputType | TextAreaType);

function InputText(props: IInputText) {
  let inputRef;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type !== 'textarea' && props.onChange) {
      const { offsetWidth, value } = event.target;

      if (props.maxWidth && offsetWidth > props.maxWidth) {
        const newEvent = { ...event };
        newEvent.target.value = value.slice(0, -1);
        props.onChange(newEvent);
        return;
      }

      props.onChange(event);
    }
  };

  if (props.type !== 'textarea') {
    inputRef = props.inputRef as React.RefObject<HTMLInputElement>;
    return (
      <S.InputText
        {...props}
        onChange={onInputChange}
        ref={inputRef}
        type="text"
        autoComplete="off"
      />
    );
  }

  inputRef = props.inputRef as React.RefObject<HTMLTextAreaElement>;
  return <S.InputTextarea {...props} ref={inputRef} autoComplete="off" />;
}

export default InputText;
