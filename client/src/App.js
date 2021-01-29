import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import Container from 'react-bootstrap/Container'

import Header from './components/Header'
import Alert from './components/layout/Alert'

import Home from './components/home/Home'
import ArtistRegister from './components/artists/ArtistRegister'
import Login from './components/auth/Login'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Header title={process.env.REACT_APP_TITLE} />

          <Container fluid>
            <Alert />

            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/artist/register' component={ArtistRegister} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Container>
        </>
      </Router>
    </Provider>
  )
}

export default App
