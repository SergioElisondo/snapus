import { getPlatforms, IonApp, IonLoading } from '@ionic/react';

import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';
// import { useEffect, useState } from 'react';
import AppTabs from './AppTabs';
import { AuthContext, useAuthInit } from './auth';

// import { auth } from './firebase'

import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  const { loading, auth } = useAuthInit() //calling hook instead of using useState and only returns authState, not an array

  // checking to see if app is a mobile app or pwa
  console.log('platforms: ', getPlatforms())

  // IonRouterOutlet is replaced with Switch -- we lose animations, AppTabs still has it, which means users will get effect once logged in
  console.log(`rendering App with authState: `, auth)
  if(loading) {
    return <IonLoading isOpen message={'Loading...'}/>
  }
  // <LoginPage onLogin={() => setLoggedIn(true)}/> from LoginPage Compobent
  // <AuthContext.Provider value={{ loggedIn: authState.loggedIn }}> this is before change in auth.ts file
  //  <AuthContext.Provider value={ authState.auth }> before unpacking useAuthInit()
  return (
    <IonApp>
      <AuthContext.Provider value={ auth }>
        <IonReactRouter>
            {/* <IonRouterOutlet> */}
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
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

