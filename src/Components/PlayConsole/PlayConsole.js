import React, {useEffect, useState} from 'react';
import './PlayConsole.css'
import playStore from "../../services/PlayStore";

const PlayConsoleInput = React.lazy(() =>import("./PlayConsoleInput"));

function PlayConsole(props) {

    const [pStore, setPStore] = useState(playStore.initialState)

    useEffect(() => {
        const sub = playStore.subscribe(setPStore)
        return () => {
            sub.unsubscribe()
        }
    }, [])

    if(pStore.finish) {
        return (
            <div>
                <div style={{display:"flex", justifyContent:"center",alignItems: "center"}}>
                    <div>
                        <span className='text-primary' style={{fontSize: 100, fontWeight: "bolder"}}>Game Over</span>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"center",alignItems: "center"}}>
                    <div>
                        <span className='text-primary' style={{fontSize: 50, fontWeight: "bolder"}}>Score: {pStore.currentScore}</span>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"center",alignItems: "center", marginTop: 20}}>
                    <button className="btn btn-primary" onClick={() => {
                        window.location.reload()
                        /*playStore.resetGame()
                        playStore.setCurrentWord()*/
                    }}>
                        <i className="fas fa-redo-alt"></i> Start Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={{display:"flex", justifyContent:"center",alignItems: "center"}}>
                <div style={{width: 300, height: 300}}>
                    <svg id="svg" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="transparent"/>
                        <path fill="none" strokeLinecap="round" strokeWidth="5" stroke="#ff5155"
                              strokeDasharray={`${pStore.loader}, 250`}
                              d="M50 10
           a 40 40 0 0 1 0 80
           a 40 40 0 0 1 0 -80"/>
                        <text x="50" y="50" textAnchor="middle" dy="7" fontSize="20" style={{fill: '#ff5155'}}>{pStore.timer}</text>
                    </svg>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"center",alignItems: "center", marginTop: 20}}>
                <PlayConsoleInput/>
            </div>
        </div>
    )
}

export default PlayConsole;
