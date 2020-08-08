import React from 'react';
import { Card as CardAnt } from 'antd';
import './style.sass';

export default function Card (props) {
    return (
        <React.Fragment>
            <CardAnt
                {...props}
                className="mp-card"
            >
                {props.children}
            </CardAnt>
        </React.Fragment>
    )
}