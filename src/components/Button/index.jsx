import React from "react";
import { Button as ButtonAnt } from "antd";
import classNames from "classnames";
import propTypes from "prop-types";
import style from "./style.sass";

export default function Button(props) {
  const classNamesStyle = classNames.bind(style);
  const cssClasses = classNamesStyle({
    "mp-btn-primary": props.type === "primary",
    "mp-btn-default": props.type === "default",
    "mp-btn-secondary": props.type === "secondary",
    "mp-btn-teal": props.type === "teal",
    "mp-btn-white": props.type === "white",
    "mp-btn-danger": props.type === "danger",
    "mp-btn-link": props.type === "link",
    "mp-btn-grey": props.type === "grey",
    "mp-btn-ghost": props.type === "ghost",
    "mp-btn-width-full": props.width === "full",
    "mp-btn-size-large": props.size === "large",
    "mp-btn-size-x-large": props.size === "xlarge",
    "mp-btn-size-small": props.size === "small",
    "mp-margin-button-small": props.margin === "small",
    "mp-margin-button-right-small": props.marginright === "small",
    "mp-margin-button-left-small": props.marginleft === "small",
    "mp-button-disabled": props.disabled === true
  });

  let propsAnt = {
    ...props,
    size: props.size === "xlarge" ? undefined : props.size,
    customwidth: props.customwidth !== undefined ? undefined : props.customwidth
  };

  return (
    <ButtonAnt
      style={{ width: `${props.customwidth}${`px`}` }}
      className={cssClasses}
      {...propsAnt}
    >
      {props.children}
    </ButtonAnt>
  );
}

Button.propTypes = {
  type: propTypes.oneOf([
    "primary",
    "default",
    "secondary",
    "teal",
    "white",
    "link",
    "danger",
    "grey",
    "ghost"
  ]),
  width: propTypes.oneOf(["default", "full"]),
  customwidth: propTypes.string,
  size: propTypes.oneOf(["default", "small", "large", "xlarge"]),
  margin: propTypes.oneOf(["small", "medium", "large"])
};

Button.defaultProps = {
  type: "default",
  width: "default",
  size: "default"
};
