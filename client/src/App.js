import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {
  DASHBOARD_ROUTE,
  ARTIST_REGISTER_ROUTE,
  ENTERPRISE_REGISTER_ROUTE,
  LOGIN_ROUTE,
  ARTIST_UPDATE_INFOS_ROUTE,
} from './routes'

import { Provider } from 'react-redux'
import store from './store'

import Container from 'react-bootstrap/Container'

import Header from './components/layout/Header'
import Alert from './components/layout/Alert'

import Home from './components/home/Home'
import ArtistRegister from './components/artists/ArtistRegister'
import EnterpriseRegister from './components/enterprises/EnterpriseRegister'
import Login from './components/auth/Login'

import Dashboard from './components/dashboard/Dashboard'
import DashboardLayout from './components/layout/DashboardLayout'

import ArtistInfosForm from './components/artists/ArtistInfosForm'

import setAuthToken from './utils/setAuthToken'
import { loadUser, loadGoogleUser } from './actions/auth'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    if (localStorage.googleLogin) {
      store.dispatch(loadGoogleUser())
    } else {
      store.dispatch(loadUser())
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <>
          <Header title={process.env.REACT_APP_TITLE} />

          <Container fluid>
            <Alert />

            <Switch>
              <Route exact path='/' component={Home} />
              <Route
                exact
                path={ARTIST_REGISTER_ROUTE}
                component={ArtistRegister}
              />
              <Route
                exact
                path={ENTERPRISE_REGISTER_ROUTE}
                component={EnterpriseRegister}
              />
              <Route exact path={LOGIN_ROUTE} component={Login} />

              <DashboardLayout>
                <Route exact path={DASHBOARD_ROUTE} component={Dashboard} />
                <Route
                  exact
                  path={ARTIST_UPDATE_INFOS_ROUTE}
                  component={ArtistInfosForm}
                />
              </DashboardLayout>
            </Switch>
          </Container>
        </>
      </Router>
    </Provider>
  )
}

export default App
