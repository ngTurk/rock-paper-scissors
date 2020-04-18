import React from 'react'

import './Header.scss';
import Logo from '../../assets/img/logo.svg';

export default function Header(props) {
    return (
        <div className="rps-header">
            <div>
                <img src={Logo} alt="logo" />
            </div>
            <div className="rps-score">
                <small>SCORE</small>
                <span>{props.score || 0}</span>
            </div>
        </div>
    )
}
