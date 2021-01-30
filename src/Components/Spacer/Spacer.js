import React from 'react';
import * as PropTypes from "prop-types";

function Spacer(props) {
    return (
        <div style={{height: props.height}}/>
    );
}

Spacer.propTypes = {
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
}

export default Spacer;
