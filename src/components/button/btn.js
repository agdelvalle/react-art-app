import React from "react";
import './btn.css'
import PropTypes from "prop-types"
import classNames from "classnames";

export const Button = (props) => {
    return(
    <button className={classNames("btn", props.mode)}
    onClick={props.onClick}>{props.innerText}</button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    innerText: PropTypes.string,
    mode: PropTypes.string.isRequired,
}