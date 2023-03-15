import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from './auth';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
// import { IonReactRouter } from '@ionic/react-router';



// interface Props {
//   loggedIn: boolean;
// }

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth()
  if(!loggedIn){
    return <Redirect to="/login" />
    }

  return (
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="my/entries">
              <HomePage/>
            </Route>
            <Route exact path="my/entries/:id">
              <EntryPage/>
            </Route>
            <Route exact path="my/settings">
              <SettingsPage/>
            </Route>
            <Redirect exact path="/" to="my/entries" />
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab="home" href="my/entries">
              <IonIcon icon={homeIcon}></IonIcon>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="my/settings">
              <IonIcon icon={settingsIcon}></IonIcon>
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
  );
};

export default AppTabs;
