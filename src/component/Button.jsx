import React from "react";

const Button = ({ children, type, ...rest }) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className="px-10 py-1 bg-orange-300 rounded-lg"
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton = ({ children, ...rest }) => {
  return (
    <select className="py-1 text-white bg-gray-600 rounded-lg px-7" {...rest}>
      {children}
    </select>
  );
};
export { SelectButton };
export default Button;
