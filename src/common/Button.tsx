import React, { FC } from "react";
import back from "../img/back.svg";

interface IButton {
  className: string;
  value: string | number;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: FC<IButton> = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value === "C" ? <img src={back} alt="C" /> : value}
    </button>
  );
};

export default Button;
