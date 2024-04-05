import { T } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const StyleList = styled(T)`
  border: 1px solid red;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:first-child) {
    margin-top: 16px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 66px;
  }
  > * {
    flex: 0 0 auto;
  }
`;

export const DeleteIcon = styled.img`
  width: 20px;
  height: 20px;
  fill: red !important;

`;
