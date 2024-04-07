import { TextInput } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const StyleFormWrapper = styled.span`
  width: 95%;
  height: 32px;
  margin: 40px auto 24px auto;

  display: flex;
  justify-content: space-between;
`;

export const StyleInputWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

export const StyleTextInput = styled(TextInput)`
  width: 230px;
`;
