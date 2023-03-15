import { IonApp, IonRouterOutlet } from '@ionic/react';

import { Redirect, Route } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
import AppTabs from './AppTabs';
import { AuthContext } from './auth';

const App: React.FC = () => {
  const [ loggedIn, setLoggedIn ] = useState(false)


  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/login">
                {<LoginPage onLogin={() => setLoggedIn(true)}/>}
              </Route>
              <Route path="/my">
                <AppTabs />
              </Route>
              <Redirect exact path='/' to="/my/entries"/>
            </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;

