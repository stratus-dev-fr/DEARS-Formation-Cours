import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Welcome from './Welcome'
import Second from './Second'
import Hooks from './Hooks'

import Register from './Register'
import Login from './Login'
import Account from './Account'

import Three from './Three'
import GSAP from './GSAP'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => <Welcome text='Hello World' />} />
        <Route path='/second/:id' component={Second} />
        <Route path='/hooks' component={Hooks} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/account' component={Account} />
        <Route path='/three' component={Three} />
        <Route path='/gsap' component={GSAP} />
      </Switch>
    </Router>
  )
}