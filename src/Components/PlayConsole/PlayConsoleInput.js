import React, {useEffect, useState} from 'react';
import playStore from "../../services/PlayStore";
import clsx from "clsx";

function PlayConsoleInput(props) {

    const [text, setText] = useState('');
    const [pStore, setPStore] = useState(playStore.initialState)
    const [errorText, setErrorText] = useState([])

    useEffect(() => {
        const sub = playStore.subscribe(setPStore)
        return () => {
            return sub.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (!pStore.initialPlay && text !== '') {
            playStore.startCounter()
        }
        setErrorText([])
        for (const [index, textChar] of text.split('').entries()) {
            const currentChar = pStore.currentWord.charAt(index)
            if (text.charAt(index).toLowerCase() !== currentChar.toLowerCase()) {
                if (!errorText.includes(index)) {
                    setErrorText([...errorText, index])
                }
            } else {
                if (errorText.includes(index)) {
                    const spliceIndex = errorText.indexOf(index)
                    setErrorText(errorText.splice(spliceIndex, 1))
                }
            }
        }
        if (text.toLowerCase() === pStore.currentWord.toLowerCase() && pStore.initialPlay) {
            setText('')
            playStore.checkNewWord(pStore.currentWord);
        }
    }, [text])


    return (
        <div>
            <div style={{display: "flex",justifyContent: "center", alignItems: "center"}}>
                {pStore.currentWord.split('').map((character, index) => (
                    <h1 className={clsx({
                        'text-uppercase font-weight-bold': true,
                        'text-white': text.length <= index,
                        'text-primary': text.length > index && errorText.includes(index),
                        'text-info': text.length > index && !errorText.includes(index)
                    })} key={index}>{character}</h1>
                ))}
            </div>
            <input type="text" className="form-control"
                   value={text}
                   onChange={event => {
                       setText(event.target.value)
                   }}
                   style={{
                       width: 400,
                       fontFamily: 'IBM Plex Sans',
                       background: 'transparent',
                       color: '#ff5155',
                       fontSize: 30
                   }}
            />
        </div>
    )
}

export default PlayConsoleInput;
