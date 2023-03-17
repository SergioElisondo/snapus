import { IonApp, IonLoading } from '@ionic/react';

import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import { useEffect, useState } from 'react';
import AppTabs from './AppTabs';
import { AuthContext } from './auth';
import NotFoundPage from './pages/NotFoundPage';
import { auth } from './firebase'

const App: React.FC = () => {
  const [ authState, setAuthState ] = useState({loading: true, loggedIn: false})
  useEffect(() => {
    auth.onAuthStateChanged(user => {
    // console.log('onAuthStateChanged: ', user)
    setAuthState({loading: false, loggedIn: Boolean(user)}) // if user is null ? then set to false. when it's an object ? then set to true
    }) // have firebase notify us when auth state changes, outside of function so it gets called only once when app is loaded
  }, []) // emtpy array, effect should only run once, then never run again. The array is a list of values this effect depends on, so if one of the values change, this effect will run again

// IonRouterOutlet is replaced with Switch -- we lose animations, AppTabs still has it, which means users will get effect once logged in
  console.log(`rendering App with authState: `, authState)

  if(authState.loading) {
    return <IonLoading isOpen message={'Loading...'}/>
  }
  // <LoginPage onLogin={() => setLoggedIn(true)}/> from LoginPage Compobent
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn: authState.loggedIn }}>
        <IonReactRouter>
            {/* <IonRouterOutlet> */}
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route path="/my">
                <AppTabs />
              </Route>
              <Redirect exact path='/' to="/my/entries"/>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
            {/* </IonRouterOutlet> */}
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;

