import React from 'react';
import './App.css';
import './styles/styles.scss'
import {useCurrentRoute, useViewElement} from "react-navi";
import {useTransition, animated} from "react-spring";

function App() {
    let currentRoute = useCurrentRoute()
    let viewElement = useViewElement()
    let transitions = useTransition(viewElement, currentRoute.url.href, {
        from: { opacity: 0, transform: 'scale(0.5) translateY(-50%)' },
        enter: { opacity: 1, transform: 'scale(1) translateY(0)' },
        leave: { opacity: 0, transform: 'scale(0.5) translateY(50%)' },
    })

    return transitions.map(({ item, props: style, key, state }) =>
        <animated.div key={key} style={{
            ...style,
            position: 'absolute',
            top: 0,
            width: '100%',
        }}>
            {item}
        </animated.div>
    )
}

export default App;
