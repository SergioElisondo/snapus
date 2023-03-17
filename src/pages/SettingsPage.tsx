import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonButton } from '@ionic/react';
import {auth} from '../firebase' // need if you want user to log out, talks with data there
const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton color={'medium'} expand="block" onClick={() => {
          auth.signOut()
        }}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
