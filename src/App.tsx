import { IonApp } from '@ionic/react';

import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
import AppTabs from './AppTabs';
import { AuthContext } from './auth';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const [ loggedIn, setLoggedIn ] = useState(false)

// IonRouterOutlet is replaced with Switch -- we lose animations, AppTabs still has it, which means users will get effect once logged in

  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
            {/* <IonRouterOutlet> */}
            <Switch>
              <Route exact path="/login">
                {<LoginPage onLogin={() => setLoggedIn(true)}/>}
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

