import { classNames } from "primereact/utils";
import { ReactNode } from "react";

type FrontContainerProps = {
  children: ReactNode;
  className?: string;
};

const FrontContainer = ({ children, className }: FrontContainerProps) => {
  return (
    <div className={classNames(className, "mx-auto max-w-5xl p-4")}>
      {children}
    </div>
  );
};

export default FrontContainer;
