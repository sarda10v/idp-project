import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  border-bottom: 1px solid grey;

  > *:not(:first-child) {
    margin-top: 16px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 20px;
  }
  > * {
    flex: 0 0 auto;
  }
`;

export const DeleteIcon = styled.img`
  width: 20px;
  height: 20px;
`;
