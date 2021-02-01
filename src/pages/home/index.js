import React, {useEffect, useState} from 'react';
import useScripts from "../../libs/hooks/useScripts";
import Spacer from "../../Components/Spacer/Spacer";
import SegmentControls from "../../Components/SegmentControls/SegmentControls";
import {getDb} from "../../services";
import {nanoid} from "nanoid";
import {useNavigation} from "react-navi";
import Profile from "../../Components/Profile/Profile";

function HomePage(props) {

    // use this if need to use jquery for bootstrap
    // useScripts('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js')

    const navig = useNavigation()
    const [name, setName] = useState('')
    const [key, setKey] = useState(0)
    const [player, setPlayer] = useState([])
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const subs = []
        async function fetchData() {
            const db = await getDb()
            const players = db.players.find({
                selector: {},
                sort: [
                    {
                        name: 'asc'
                    }
                ]
            }).$.subscribe(allPlayer => {
                setPlayer(allPlayer)
            })
            subs.push(players)
        }
        fetchData()
        return () => {
            subs.forEach(supscriber => supscriber.unsubscribe())
        }
    }, [])

    /**
     *
     * @return {Promise<void>}
     */
    const onClickCreatePlayerWithGame = async () => {
        if (selected) {
            navig.navigate(`/game/${selected}/${key}`)
        } else {
            const db = await getDb()
            const newPlayer = {
                name,
                id: nanoid()
            }
            db.players.insert(newPlayer).then(value => {
                navig.navigate(`/game/${value.id}/${key}`)
            })
        }
    }

    return (
        <div>
            <Spacer height={'10vh'}/>
            <div style={{display: "flex", flexDirection: 'row', justifyContent: 'center'}}>
                <i className="fas fa-keyboard" style={{color: '#ff5155', fontSize: 100}}></i>
            </div>
            <div style={{display: "flex", flexDirection: 'row', justifyContent: 'center'}}>
                <h1 style={{fontSize: 80, fontWeight: "bolder", fontFamily: 'IBM Plex Sans'}}
                    className='text-primary'>FAST-FINGERS</h1>
            </div>
            <div style={{display: "flex", flexDirection: 'row', justifyContent: 'center'}}>
                <div className="mb-3">
                    <h4 className="form-check-label text-primary" style={{fontFamily: 'IBM Plex Sans'}}>Enter your
                        name</h4>
                    <input type="text" className="form-control" placeholder="Enter your name"
                           value={name}
                           onChange={event => setName(event.target.value)}
                           style={{
                               width: 400,
                               fontFamily: 'IBM Plex Sans',
                               background: 'transparent',
                               color: '#ff5155',
                               fontSize: 30
                           }}
                    />
                </div>
            </div>
            {player.length !== 0 && <div style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                <div className="mb-3">
                    <div style={{display: "flex", flexDirection: 'row', justifyContent: 'center'}}>
                        <h4 className="form-check-label text-primary" style={{fontFamily: 'IBM Plex Sans'}}>OR</h4>
                    </div>
                    <div style={{display: "flex", flexDirection: 'row', justifyContent: 'center'}}>
                        <h4 className="form-check-label text-primary">Select from existing player</h4>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    {player.map(item => (
                        <Profile id={item.id} name={item.name} key={item.id} selected={selected === item.id} onSelect={value => setSelected(value)}/>
                    ))}
                </div>
            </div>}
            <Spacer height={50}/>
            <div>
                <div style={{display: "flex", flexDirection: 'row', justifyContent: 'center'}}>
                    <h4 className="form-check-label text-primary" style={{fontFamily: 'IBM Plex Sans'}}>Select
                        Difficulty</h4>
                </div>
                <div style={{display: "flex", flexDirection: 'row', justifyContent: 'center'}}>
                    <SegmentControls items={[
                        {
                            key: 0,
                            label: 'Easy'
                        },
                        {
                            key: 1,
                            label: 'Medium'
                        },
                        {
                            key: 2,
                            label: 'Difficult'
                        }
                    ]} defaultKey={0} onChange={(key) => setKey(key)}/>
                </div>
            </div>
            <Spacer height={50}/>
            <div style={{display: "flex", flexDirection: 'row', justifyContent: 'center'}}>
                <button className="btn btn-primary" onClick={onClickCreatePlayerWithGame}>Start Game</button>
            </div>

        </div>
    );
}

export default HomePage;
