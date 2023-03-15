import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom'
// import { useAuth } from './auth';

import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons'
// import { useState } from 'react';
// import { IonReactRouter } from '@ionic/react-router';

import { useAuth } from './auth';



// interface Props {
//   loggedIn: boolean;
// }

// <Props> removed from React.FC<Props>
// no longer needed since using useAuth


const AppTabs: React.FC = () => {
  // const [loggedIn, setLoggedIn] = useState(false)
  const { loggedIn } = useAuth()
  if(!loggedIn){
    return <Redirect to="/login" />
    }


  // <Route exact path="/login">
  //   <LoginPage userLoggedIn={loggedIn} onLogin={() => setLoggedIn(true)} />
  // </Route>

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries">
          <HomePage/>
        </Route>
        <Route exact path="/my/entries/:id">
          <EntryPage/>
        </Route>
        <Route exact path="/my/settings">
          <SettingsPage/>
        </Route>
        {/* <Redirect exact path="/" to="/my/entries" /> */}
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon icon={homeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
