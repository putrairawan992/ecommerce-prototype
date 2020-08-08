import React, { useState } from "react";
import {Alert as AlertAnt} from 'antd';
import propTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.sass';

export default function Alert({title, type, afterClose, showIcon, description, animation, closable}) {
  const [fade, setFade] = useState(false)
  const classNamesStyle = classNames.bind(style)
  const cssClasses = classNamesStyle({
    'mp-alert-animation-fall' : (animation === 'fall'),
    'mp-alert' : (animation === 'default')
  })
  function setFadeTrue() {
    setFade(true);
  }
  setTimeout(
    setFadeTrue
  , 5000)
  return (
    <div className="alert-container">
        <div className={fade ? "mp-alert-animation-fade" : cssClasses}>
          <AlertAnt 
            showIcon={showIcon}
            message={title} 
            type={type} 
            closable={closable}
            afterClose={afterClose}
            description={description}
            animation={animation}
          />
        </div>
    </div>
  );
}

Alert.propTypes= {
  title: propTypes.string.isRequired,
  type: propTypes.oneOf(['success', 'warning', 'info', 'error']),
  showIcon: propTypes.bool,
  description: propTypes.string,
  animation: propTypes.oneOf(['default', 'fall']),
  closable: propTypes.bool
}

Alert.defaultProps = {
  type: "success",
  showIcon: false,
  animation: "default",
  closable: false
}
