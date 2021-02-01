import React, {useState} from 'react';

function MainLayout({children}) {

    const [theme, setTheme] = useState(false)

    return (
        <React.Fragment>
            <div style={{backgroundImage: theme ? 'url("/bg/bg2.png")': 'url("/bg/bg1.png")', height: '100vh'}}>
                <div style={{display:"flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "end", padding: 10}}>
                    <div className="form-check form-switch primary">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value={theme} onChange={event => setTheme(event.target.checked)}/>
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
