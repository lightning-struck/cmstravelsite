import React from "react";
import s from "./marked-block.module.css";
import { marked } from "marked";
export const MarkedBlock = ({ value }) => {
  if (!value) return null;
  return (
    <div
      className={s.marked}
      dangerouslySetInnerHTML={{ __html: marked.parse(value) }}
    ></div>
  );
};
