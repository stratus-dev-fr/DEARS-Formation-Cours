import React, { useEffect, useState } from 'react'

import * as firebase from 'firebase'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyCHW6oh1tNDXTP5jQvSbAsjI6rMr-RJzpU",
        authDomain: "dears-d37ba.firebaseapp.com",
        databaseURL: "https://dears-d37ba.firebaseio.com",
        projectId: "dears-d37ba",
        storageBucket: "dears-d37ba.appspot.com",
        messagingSenderId: "7279348593",
        appId: "1:7279348593:web:6faaad9582c4449c0d44d0",
        measurementId: "G-WXEFXTCPNF"
    })
}

export default function Hooks (props) {
    const [condition, setCondition] = useState(undefined)
    const [temperature, setTemperature] = useState(undefined)
    const [test, setTest] = useState(undefined)

    const [load, setLoad] = useState(false)

    function handleSet (e) {
        e.preventDefault()

        firebase.database().ref('data/set').set({
            test: true
        })
    }

    function handleUpdate (e) {
        e.preventDefault()

        firebase.database().ref('data/update').update({
            test: new Date().getTime()
        })
    }

    function handlePush (e) {
        e.preventDefault()

        firebase.database().ref('data/push').push({
            test: true
        })
    }

    useEffect(async () => {
        firebase.database().ref('/').on('value', async (snapshot) => {
            const jsonData = snapshot.toJSON()

            const url = 'https://www.prevision-meteo.ch/services/json/lat=45.9167lng=6.8667'
            const result = await fetch(url)
            const json = await result.json()

            setCondition(json.current_condition.condition)
            setTemperature(json.current_condition.tmp)
            setTest(jsonData.test)
            setLoad(true)
        })
    }, [])

    if (load) {
        return (
            <>
                <h1>Hello World</h1>
                <h2>{props.match.params.id}</h2>

                <p>Condition: {condition}</p>
                <p>Température: {temperature}</p>

                <p>Firebase: {test}</p>

                <div>
                    <button onClick={(e) => handleSet(e)}>set</button>
                    <button onClick={(e) => handleUpdate(e)}>update</button>
                    <button onClick={(e) => handlePush(e)}>push</button>
                </div>
            </>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}