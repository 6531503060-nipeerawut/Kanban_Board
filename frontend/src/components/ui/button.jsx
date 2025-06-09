import React from "react";
import classNames from "classnames";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow transition duration-200",
        className
      )}
    >
      {children}
    </button>
  );
};
