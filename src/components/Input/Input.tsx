import { useState, type ChangeEvent } from "react";
import type { TextInputProps } from "@admiral-ds/react-ui";
import { StyleTextInput } from "./Input.styles";

export const Input = ({
  value = "",
  placeholder = "Введите текст",
  CSSCustomProps,
  ...props
}: TextInputProps & {
  CSSCustomProps?: boolean;
}) => {
  const [localValue, setValue] = useState<string>(String(value) ?? "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    props.onChange?.(e);
  };

  return (
    <StyleTextInput
      {...props}
      value={localValue}
      placeholder={placeholder}
      onChange={handleChange}
      displayClearIcon={true}
      skeleton={false}
    />
  );
};
