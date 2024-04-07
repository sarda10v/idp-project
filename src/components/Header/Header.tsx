import React from "react";
import { HeaderIcon, HeaderWrapper } from "./Header.styles";
import GridOutline from "@admiral-ds/icons/build/category/GridOutline.svg";
import { Avatar, T } from "@admiral-ds/react-ui";
import logo from "../../assets/LogoSfera.svg";
import suboIcon from "../../assets/subo.webp";
const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <HeaderIcon src={GridOutline} alt="logo" />
        <img src={logo} alt="logo" />
        <img
          style={{ width: "24px", height: "24px" }}
          src={suboIcon}
          alt="subo"
        />
        <T font="Body/Body 1 Long">ИПР</T>
      </span>
      <Avatar dimension="s" userName={"Сардалов Ибрагим"} />
    </HeaderWrapper>
  );
};

export default Header;
