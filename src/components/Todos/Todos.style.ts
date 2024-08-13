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
export const TasksCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0px 5px 0px 5px;
  gap: 8px;
  border-radius: 50%;
  background: #694fff;
  float: inline-end;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
`;
