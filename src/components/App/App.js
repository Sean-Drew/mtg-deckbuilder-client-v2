import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Home from '../Home/Home'
import MyPlayDecks from '../MyPlayDecks/MyPlayDecks'
import MySingleDeck from '../MySingleDeck/MySingleDeck'
import CreatePlayDeck from '../CreatePlayDeck/CreatePlayDeck'
import UpdatePlayDeck from '../UpdatePlayDeck/UpdatePlayDeck'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state
    // console.log('this.state is: ', this.state)
    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' component={Home}/>
          <AuthenticatedRoute user={user} exact path='/decks/create' render={() => (
            <CreatePlayDeck props={this.state} msgAlert={this.msgAlert} user={user} />
          )} />
          {/* <AuthenticatedRoute user={user} path='/my-play-decks' render={() => (
            <MyPlayDecks props={this.state} msgAlert={this.msgAlert} user={user} />
          )} /> */}
          <AuthenticatedRoute user={user} exact path='/my-play-decks' render={({ match }) => {
            const currentDeck = match.params.id
            return (
              <MyPlayDecks
                deckId={currentDeck}
                user={user}
                msgAlert={this.msgAlert}
                props={this.state}
              />
            )
          }} />
          <AuthenticatedRoute user={user} exact path='/decks/:id' render={({ match }) => {
            const currentDeck = match.params.id
            return (
              <MySingleDeck
                deckId={currentDeck}
                user={user}
                msgAlert={this.msgAlert}
                props={this.state}
              />
            )
          }} />
          <AuthenticatedRoute user={user} exact path='/decks/update/:id' render={({ match }) => {
            const currentDeck = match.params.id
            return (
              <UpdatePlayDeck
                deckId={currentDeck}
                user={user}
                msgAlert={this.msgAlert}
                props={this.state}
              />
            )
          }} />
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
