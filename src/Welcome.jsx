import React, { Component } from 'react'

import {
    Link
} from 'react-router-dom'

export default class Welcome extends Component {
    constructor () {
        super()

        this.state = {
            date: 'Hello World',
            counter: 0
        }
    }

    changeCounter (e, number) {
        e.preventDefault()

        this.setState({
            counter: this.state.counter + number
        })
    }

    componentDidMount () {
        setInterval(() => {
            const date = new Date()

            const final = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`

            this.setState({
                date: final
            })
        }, 1000)
    }

    render () {
        return (
            <>
                <p>{this.state.date}</p>

                <h1>{this.state.counter}</h1>

                <button onClick={(e) => this.changeCounter(e, 1)}>+1</button>
                <button onClick={(e) => this.changeCounter(e, -1)}>-1</button>

                <h2>{this.props.text}</h2>

                <Link to='/second/hello'>Va vers la seconde page</Link>
            </>
        )
    }
}