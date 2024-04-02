import * as React from "react";
import type { ChangeEvent } from "react";
import { TextInput } from "@admiral-ds/react-ui";
import type { TextInputProps, BorderRadiusType } from "@admiral-ds/react-ui";

export const Input = ({
  value = "Привет!",
  placeholder = "Введите текст",
  themeBorderKind,
  CSSCustomProps,
  ...props
}: TextInputProps & {
  themeBorderKind?: BorderRadiusType;
  CSSCustomProps?: boolean;
}) => {
  const [localValue, setValue] = React.useState<string>(String(value) ?? "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    props.onChange?.(e);
  };

  return (
    <TextInput
      {...props}
      value={localValue}
      placeholder={placeholder}
      onChange={handleChange}
      displayClearIcon={true}
      skeleton={false}
    />
  );
};
