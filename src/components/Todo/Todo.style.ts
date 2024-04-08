import { T } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const Container = styled.span`
  width: 24%;
  height: 100px;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--white-bg-color);
  box-shadow: 0px 3.2px 9px 0px #00000029;
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

export const Wrapper = styled.span`
  width: 95%;
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
  margin: auto auto 20px auto;
`;

export const TextTodo = styled(T)`
  font-family: ${(props) => props.$font};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

export const BtnWrapper = styled.button`
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  &:hover,
  &:disabled {
    background: #0000000d;
  }

  background: none;
  border: none;
  cursor: pointer;
`;

export const TagsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Tags = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ButtonBox = styled.div`
  display: flex;
`;

export const EditFormBox = styled.div`
  gap: 4px;
  display: flex;
  margin-top: 5px;
`;

export const TextViewBox = styled.div`
  gap: 4px;
  display: flex;
  margin-top: 10px;
`;
