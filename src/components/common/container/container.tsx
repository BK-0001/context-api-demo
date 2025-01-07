import { HTMLAttributes } from "react";
import "./container.scss";

type Props = HTMLAttributes<HTMLDivElement>;

const BASE_CLASS = "container";

export function Container({ children, className }: Props) {
  const classes = [BASE_CLASS, className].join(" ");

  return <div className={classes}>{children}</div>;
}
