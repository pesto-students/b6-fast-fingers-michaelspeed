import React from 'react';
import * as PropTypes from "prop-types";

function Profile(props) {
    if (props.selected) {
        return (
            <div style={{margin: 5, border: '1px solid #ff5155', padding: 10, borderRadius: 6, cursor: "pointer", backgroundColor: '#ff5155'}} onClick={() => props.onSelect(null)}>
                <div style={{display: "flex", justifyContent: "center", flexDirection: 'row'}}>
                    <i className="far fa-user text-white" style={{fontSize: 35}}></i>
                </div>
                <div style={{display: "flex", justifyContent: "center", flexDirection: 'row', marginTop: 10}}>
                    <h6 className='text-white'>{props.name.substring(0, 5)}...</h6>
                </div>
            </div>
        )
    }
    return (
        <div style={{margin: 5, border: '1px solid #ff5155', padding: 10, borderRadius: 6, cursor: "pointer"}} onClick={() => props.onSelect(props.id)}>
            <div style={{display: "flex", justifyContent: "center", flexDirection: 'row'}}>
                <i className="far fa-user text-primary" style={{fontSize: 35}}></i>
            </div>
            <div style={{display: "flex", justifyContent: "center", flexDirection: 'row', marginTop: 10}}>
                <h6 className='text-primary'>{props.name.substring(0, 5)}...</h6>
            </div>
        </div>
    )
}

Profile.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
}

export default Profile;
