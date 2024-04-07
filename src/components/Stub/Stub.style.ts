import { T } from "@admiral-ds/react-ui";
import { styled } from "styled-components";

export const StubWrapper = styled.span`
  width: 100%;
  height: calc(95vh - 144px);

  gap: 24px;
  padding: 24px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  border-radius: 12px;
  background-color: var(--white-bg-color);
`;

export const StubHeader = styled.span`
  display: flex;
  gap: 14px;
`;

export const StubBody = styled.span`
  width: 389px;
  height: 48px;
  margin-left: 320px;
`;

export const StubIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const StubTitle = styled(T)`
  font-family: ${props => props.$font};
  font-size: 24px;
  font-weight: 550;
  line-height: 32px;
  text-align: left;
  color: #232431;
`;
export const StubSubtitle = styled(T)`
  font-family: ${props => props.$font};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #50515f;
`;
