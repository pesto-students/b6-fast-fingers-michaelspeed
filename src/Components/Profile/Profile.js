import React, {useState} from 'react';
import * as PropTypes from "prop-types";
import {useNavigation} from "react-navi";

function Profile(props) {

    const [showDiff, setShowDiff] = useState(false)

    const navig = useNavigation()

    if(props.expanded) {
        return (
            <div style={{ border: '1px solid #ff5155', padding: 10}}>
                <div style={{margin: 5, borderRadius: 6, cursor: "pointer", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", minWidth: 250}}>
                    <div style={{display: "flex", justifyContent: "center", flexDirection: 'row'}}>
                        <i className="far fa-user-circle text-primary" style={{fontSize: 40}}></i>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", flexDirection: 'column', marginLeft: 10, alignItems: "center"}}>
                        <h3 className='text-primary'>{props.name}</h3>
                        <div>
                            <div>
                                <h6 className='text-white'>LEVEL</h6>
                            </div>
                            <span className="badge bg-primary" onClick={() => setShowDiff(!showDiff)}>{props.difficulty}</span>
                        </div>
                    </div>
                </div>
                {showDiff &&
                <div style={{padding: 5}}>
                    <h3 className='text-white'>Change Difficulty</h3>
                    <div style={{display: "flex", justifyContent: "space-between", flexDirection: 'row', marginLeft: 10, alignItems: "center"}} >
                        <span className="badge bg-primary" onClick={() => navig.navigate(`/game/${props.id}/0`)}>Easy</span>
                        <span className="badge bg-primary" onClick={() => navig.navigate(`/game/${props.id}/1`)}>Medium</span>
                        <span className="badge bg-primary" onClick={() => navig.navigate(`/game/${props.id}/2`)}>Hard</span>
                    </div>
                </div>}
            </div>
        )
    }

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
                {props.expanded ? <h6 className='text-primary'>{props.name}</h6> : <h6 className='text-primary'>{props.name.substring(0, 5)}...</h6>}

            </div>
        </div>
    )
}

Profile.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    expanded: PropTypes.bool,
    difficulty: PropTypes.string
}

export default Profile;
