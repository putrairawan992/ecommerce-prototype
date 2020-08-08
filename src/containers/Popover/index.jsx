import React, { useState, useEffect } from "react";
import "./style.sass";
import { Popover as AntPopover } from "antd";
import PropTypes from "prop-types";
import UserMenu from "./UserMenu";
import { useRootContext } from "../../hoc/RootContext";
import FormLoginContainer from "../FormLogin/FormLoginContainer";

export default function Popover(props) {
  const { authProfile, isAuthenticated, handleLogout } = useRootContext();
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(<FormLoginContainer />);
  const type = props.type === "Home" ? "mp-popover" : "";

  useEffect(() => {
    setVisible(false);
  }, [isAuthenticated]);

  useEffect(() => {
    isAuthenticated
      ? setContent(<UserMenu handleLogout={handleLogout} />)
      : setContent(
          <div className="mp-form-login-popup">
            <FormLoginContainer />
          </div>
        );
  }, [visible]);

  const label = isAuthenticated ? (
    <span className="mp-main-header-popover__username">{authProfile.name}</span>
  ) : (
    <span className="mp-main-header-popover__login">Login</span>
  );

  return (
    <React.Fragment>
      <div className="header__user-box">
        <AntPopover
          overlayClassName={type}
          placement="bottom"
          content={content}
          trigger="click"
          visible={visible}
          onVisibleChange={val => setVisible(val)}
        >
          <span
            className="mp-main-header-popover__box"
            onClick={() => setVisible(!visible)}
          >
            {label}
          </span>
        </AntPopover>
      </div>
    </React.Fragment>
  );
}

Popover.propTypes = {
  name: PropTypes.string,
  isAuthenticated: PropTypes.bool
};
