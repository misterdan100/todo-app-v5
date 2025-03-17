import React from "react";

export const InputErrorMessage = ({children}: {children: React.ReactNode}) => {
  return <p className="text-red-500 text-sm ml-3">{children}</p>;
};
