import React from "react";
import s from "./section-button.module.css";
import cn from "classnames";
export const SectionButton = ({ isActive, children, ...props }) => {
  return (
    <button className={cn(s.button, isActive && s.active)} {...props}>
      {children}
    </button>
  );
};
