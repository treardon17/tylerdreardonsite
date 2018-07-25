import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import AppState from './state/AppState'

// include scss
import './styles/base.scss'

// import pages
import Home from './pages/Home'

// create global state
const appState = new AppState()

// define routes
const Routes = () => (
  <BrowserRouter>
    <div id="app-container">
      <Route exact path="/" component={() => <Home state={appState} />} />
    </div>
  </BrowserRouter>
)

export default Routes
