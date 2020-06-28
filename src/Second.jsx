import React, { Component } from 'react'

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

export default class Second extends Component {
    constructor () {
        super()

        this.state = {
            condition: undefined,
            temperature: undefined,
            test: undefined,
            load: false
        }
    }

    async componentWillMount () {
        firebase.database().ref('/').on('value', async (snapshot) => {
            const jsonData = snapshot.toJSON()

            const url = 'https://www.prevision-meteo.ch/services/json/lat=45.9167lng=6.8667'
            const result = await fetch(url)
            const json = await result.json()

            this.setState({
                condition: json.current_condition.condition,
                temperature: json.current_condition.tmp,
                test: jsonData.test,
                load: true
            })
        })
    }

    render () {
        if (this.state.load) {
            return (
                <>
                    <h1>Hello World</h1>
                    <h2>{this.props.match.params.id}</h2>

                    <p>Condition: {this.state.condition}</p>
                    <p>Température: {this.state.temperature}</p>

                    <p>Firebase: {this.state.test}</p>
                </>
            )
        } else {
            return (
                <>
                    <h1>Loading...</h1>
                </>
            )
        }
    }
}