import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage } from '@ionic/react';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        This is the Settings page.
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
