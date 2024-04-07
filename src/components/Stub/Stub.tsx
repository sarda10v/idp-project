import React from "react";
import {
  StubBody,
  StubHeader,
  StubIcon,
  StubSubtitle,
  StubTitle,
  StubWrapper,
} from "./Stub.style";
import ArchiveOutline from "@admiral-ds/icons/build/service/ArchiveOutline.svg";

const Stub: React.FC = () => {
  const TITLE_STUB = "Нет задач";
  const SUBTITLE_STUB =
    "Нажмите кнопку «Добавить», чтобы создать свою первую задачу.";

  return (
    <StubWrapper>
      <StubHeader>
        <StubIcon src={ArchiveOutline} alt="StubIcon" />
        <StubTitle font="Header/H4" as={"h4"}>
          {TITLE_STUB}
        </StubTitle>
      </StubHeader>
      <StubBody>
        <StubSubtitle font="Body/Body 1 Long">{SUBTITLE_STUB}</StubSubtitle>
      </StubBody>
    </StubWrapper>
  );
};

export default Stub;
