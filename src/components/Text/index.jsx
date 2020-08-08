import React, { Fragment } from "react";
import { Typography } from "antd";
import propTypes from "prop-types";
import classNames from "classnames";
import style from "./style.sass";

export default function Text({ size, type, weight, children, ...rest }) {
  const classNamesStyle = classNames.bind(style);
  const cssClasses = classNamesStyle({
    "mp-text-color__primary": type === "primary",
    "mp-text-color__secondary": type === "secondary",
    "mp-text-color__grey": type === "grey",
    "mp-text-size__small": size === "small",
    "mp-text-size__medium": size === "medium",
    "mp-text-size__large": size === "large",
    "mp-text-weight__thin": weight === "thin",
    "mp-text-weight__normal": weight === "normal",
    "mp-text-weight__bold": weight === "bold"
  });

  return (
    <Fragment>
      <Typography.Text className={cssClasses} type={type} {...rest}>
        {children}
      </Typography.Text>
    </Fragment>
  );
}

Text.propTypes = {
  size: propTypes.oneOf(["small", "medium", "large"]),
  type: propTypes.oneOf(["default", "primary", "secondary", "grey"]),
  weight: propTypes.oneOf(["thin", "normal", "bold"])
};

Text.defaultProps = {
  type: "default",
  size: "medium",
  weight: "normal"
};
