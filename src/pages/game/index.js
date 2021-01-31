import React, {useEffect, useLayoutEffect, useState} from 'react';
import * as PropTypes from "prop-types";
import {getDb} from "../../services";
import Profile from "../../Components/Profile/Profile";
import PlayConsole from "../../Components/PlayConsole/PlayConsole";
import playStore from "../../services/PlayStore";
import {nanoid} from "nanoid";
import moment from "moment";
import Score from "../../Components/Score/Score";

function Game(props) {

    const [player, setPlayer] = useState(null)
    const [difficulty, setDifficulty] = useState(null)
    const [pStore, setPStore] = useState(playStore.initialState)

    useLayoutEffect(() => {
        const sub = playStore.subscribe(setPStore)
        playStore.init();
        return () => sub.unsubscribe();
    }, [])

    useEffect(() => {
        const subs = []
        async function fetchData() {
            const db = await getDb()
            const players = db.players.findOne({
                selector: {
                    id: props.id
                },
            }).$.subscribe(currentPlayer => {
                setPlayer(currentPlayer)
                let diff
                playStore.updateDifficulty(Number(props.difficulty))
                switch(Number(props.difficulty)) {
                    case 0:
                        diff = 'Easy';
                        break;
                    case 1:
                        diff = 'Medium';
                        break;
                    case 2:
                        diff = 'Hard';
                        break;
                    default:
                        diff = 'Easy'
                }
                setDifficulty(diff)
            })
            subs.push(players)
        }
        fetchData()
        return () => {
            subs.forEach(supscriber => supscriber.unsubscribe())
        }
    }, [])

    useEffect(() => {
        async function saveData(){
            const db = await getDb()
            const gameScore = {
                id: nanoid(),
                name: props.id,
                scores: pStore.currentScore.toString(),
                createdAt: moment().unix().toString(),
            }
            db.games.insert(gameScore)
        }
        if (pStore.finish) {
            saveData()
        }
    }, [pStore.finish])

    return (
        <div style={{padding: 24}}>
            <div className='row'>
                <div className='col-md-6 col-xs-12'>
                    <div className='d-flex flex-start'>
                        {player && <Profile id={player.id} name={player.name} expanded={true} difficulty={difficulty}/>}
                    </div>
                </div>
                <div className='col-md-6 col-xs-12'>
                    <div className='d-flex justify-content-end'>
                        <h3 style={{fontSize: 40, fontWeight: "bolder", fontFamily: 'IBM Plex Sans'}} className='text-primary'>FAST-FINGERS</h3>

                    </div>
                    <div className='d-flex justify-content-end'>
                        <h5  style={{fontWeight: "bolder", fontFamily: 'IBM Plex Sans'}} className='text-primary'>SCORE: {pStore.currentScore}</h5>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2'>
                    <Score id={props.id}/>
                </div>
                <div className='col-md-8'>
                    <PlayConsole/>
                </div>
                <div className='col-md-2'></div>
            </div>
        </div>
    )
}

Game.propTypes = {
    id: PropTypes.string,
    difficulty: PropTypes.string
}

export default Game;
