import React from "react";
import { HeaderIcon, HeaderWrapper } from "./Header.styles";
import GridOutline from "@admiral-ds/icons/build/category/GridOutline.svg";
import { Avatar } from "@admiral-ds/react-ui";
const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderIcon src={GridOutline} alt="logo" />
      <Avatar dimension="s" userName={"Сардалов Ибрагим"} />
    </HeaderWrapper>
  );
};

export default Header;
