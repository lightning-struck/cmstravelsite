import s from "./button.module.css";
import cn from "classnames";
export const Button = ({ className, children, ...props }) => {
  return <button {...props} className={cn(s.button, className)}>{children}</button>;
};
