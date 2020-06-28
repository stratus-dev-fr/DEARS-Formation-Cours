import React, { useState } from 'react'

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

export default function Login () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleConnect (e) {
        e.preventDefault()

        if (username !== '' && password !== '') {
            firebase.database().ref(`comptes/${username}`).on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const jsonData = snapshot.toJSON()
                    const dataPassword = jsonData.password

                    if (password === dataPassword) {
                        window.localStorage.setItem('hasAccount', username)
                    }
                }
            })
        }
    }

    return (
        <>
            <h1>Se connecter</h1>

            <input type="text" placeholder='Pseudonyme' onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />

            <button onClick={(e) => handleConnect(e)}>Se connecter</button>
        </>
    )
}