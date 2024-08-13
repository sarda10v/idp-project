import React from "react";
import { HeaderIcon, HeaderWrapper } from "./Header.styles";
import GridOutline from "@admiral-ds/icons/build/category/GridOutline.svg";
import { Avatar } from "@admiral-ds/react-ui";
import logo from "../../assets/LogoSfera.svg";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <HeaderIcon src={GridOutline} alt="logo" />
        <img src={logo} alt="logo" />
      </span>
      <Avatar dimension="s" userName={"Сардалов Ибрагим"} />
    </HeaderWrapper>
  );
};

export default Header;
