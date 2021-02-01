import React, {useState} from 'react';
import * as PropTypes from "prop-types";
import './style.css'

function SegmentControls(props) {
    const [selection, setSelection] = useState(props.defaultKey | 0)

    return (
        <div>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                {props.items.map(item => (
                    <React.Fragment key={item.key}>
                        <input type="radio" className="btn-check" name={item.key} id={item.key} autoComplete="off" checked={selection === item.key}
                               onChange={event => {
                                   if (event.target.checked) {
                                       setSelection(item.key)
                                       props.onChange(item.key)
                                   }
                               }}
                        />
                        <label className="btn btn-outline-primary" htmlFor={item.key}>{item.label}</label>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

SegmentControls.propTypes ={
    items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.number,
        label: PropTypes.string
    })).isRequired,
    defaultKey: PropTypes.number,
    onChange: PropTypes.func
}

export default SegmentControls;
