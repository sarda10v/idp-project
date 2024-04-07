import { T } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const Container = styled.div`
  width: 447px;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--white-bg-color);
  box-shadow: 0px 3.2px 9px 0px #00000029;
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  &:hover {
    background-color: red;
  }
`;

export const Wrapper = styled.div`
  width: 95%;
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`;
export const TextTodo = styled(T)`
  width: 305px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
