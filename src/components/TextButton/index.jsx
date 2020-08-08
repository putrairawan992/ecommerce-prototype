import React, { Fragment } from "react";
import { Typography } from "antd";
import propTypes from "prop-types";
import classNames from "classnames";
import style from "./style.sass";

export default function TextButton({ size, type, weight, children, ...rest }) {
  const classNamesStyle = classNames.bind(style);
  const cssClasses = classNamesStyle({
    "mp-text-button-color__primary": type === "primary",
    "mp-text-button-color__secondary": type === "secondary",
    "mp-text-button-color__grey": type === "grey",
    "mp-text-button-size__small": size === "small",
    "mp-text-button-size__medium": size === "medium",
    "mp-text-button-size__large": size === "large",
    "mp-text-button-weight__thin": weight === "thin",
    "mp-text-button-weight__normal": weight === "normal",
    "mp-text-button-weight__bold": weight === "bold"
  });

  return (
    <Fragment>
      <Typography.Text
        className={`mp-text-button ${cssClasses}`}
        type={type}
        {...rest}
      >
        {children}
      </Typography.Text>
    </Fragment>
  );
}

TextButton.propTypes = {
  size: propTypes.oneOf(["small", "medium", "large"]),
  type: propTypes.oneOf(["default", "primary", "secondary", "grey"]),
  weight: propTypes.oneOf(["thin", "normal", "bold"])
};

TextButton.defaultProps = {
  type: "default",
  size: "medium",
  weight: "normal"
};
