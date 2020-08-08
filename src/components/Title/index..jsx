import React from "react";
import { Typography } from "antd";
import propTypes from "prop-types";
import classNames from 'classnames';
import style from '.style.sass';

export default function Title({ level, children, ...rest }) {
	const classNamesStyle = classNames.bind(style);
	const cssClasses = classNamesStyle({
		"mp-title__default" : level === 5
	})

  return (
    <React.Fragment>
			<Typography.Title 
				level={level} 
				className={cssClasses}
				{...rest}
			>
        {children}
      </Typography.Title>
    </React.Fragment>
  );
}

Title.propTypes = {
  level: propTypes.oneOf([1, 2, 3, 4, 5])
};

Title.defaultProps = {
  level: 5
};
