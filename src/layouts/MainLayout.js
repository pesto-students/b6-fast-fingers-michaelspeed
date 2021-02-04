import React, {useEffect, useLayoutEffect, useState} from 'react';
import playStore from "../services/PlayStore";

function MainLayout({children}) {
    const [pStore, setPStore] = useState(playStore.initialState)

    useLayoutEffect(() => {
        const sub = playStore.subscribe(setPStore)
        playStore.init();
        return () => sub.unsubscribe();
    }, [])

    useEffect(() => {
        const sub = playStore.subscribe(setPStore)
        playStore.init();
        return () => {
            return sub.unsubscribe()
        }
    }, [])

    return (
        <React.Fragment>
            <div style={{backgroundImage: pStore.dark ? 'url("/bg/bg2.webp")': 'url("/bg/bg1.webp")', height: '100vh'}}>
                <div style={{display:"flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "end", padding: 10}}>
                    <div className="form-check form-switch primary">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value={pStore.dark} onChange={event => playStore.triggerTheme()}/>
                            <label className="form-check-label text-primary" htmlFor="flexSwitchCheckDefault">
                                Theme
                            </label>
                    </div>
                </div>
                {children}
            </div>
        </React.Fragment>
    );
}

export default MainLayout;
