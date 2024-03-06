import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className: string;
};

const Card = ({ children, className }: Props) => {
  return <section className={`main__box w-3/4 lg:w-1/2 ${className}`}>{children}</section>;
};

export default Card;
