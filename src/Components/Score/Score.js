import React, {useEffect, useState} from 'react';
import {getDb} from "../../services";
import * as PropTypes from "prop-types";
import moment from "moment";

function Scores(props) {

    const [listedScores, setListedScores] = useState([])
    const [highest, setHeighest] = useState(null)

    useEffect(() => {
        const subs = []
        async function fetchData() {
            const db = await getDb()
            const score = db.games.find({
                selector: {
                    name: props.id
                },
                sort: [
                    { scores: 'desc' }
                ],
                limit: 10
            }).$.subscribe(allScores => {
                setListedScores(allScores)
            })
            subs.push(score)
        }

        fetchData()
        return () => {
            subs.forEach(subscriber => subscriber.unsubscribe())
        }
    })

    useEffect(() => {
        const max = Math.max.apply(Math, listedScores.map(o => Number(o.scores)))
        setHeighest(max)
    }, [listedScores])

    return (
        <div>
            <div style={{border: '1px solid #ff5155', borderRadius: 6}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: '#ff5155', padding: 5}}>
                    <h3 className='text-white'>Scores</h3>
                </div>
                <div>
                    {listedScores.map(score => (
                        <div style={{padding: 10}} key={score.id}>
                            <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                                <span className='text-primary' style={{fontWeight: "bold"}}>
                                    {moment.unix(score.createdAt).format('DD MMM YYYY')}
                                </span>
                                <span className='text-white'>
                                    {Number(highest) === Number(score.scores) && <span className="badge bg-danger" style={{marginRight: 10}}>Highest</span>}
                                    {score.scores}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

Scores.propTypes = {
    id: PropTypes.string,
}

export default Scores;
