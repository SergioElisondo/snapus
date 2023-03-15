import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonButton } from '@ionic/react';
import { Redirect } from 'react-router';

interface Props {
  userLoggedIn: boolean;
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({userLoggedIn, onLogin}) => {
  if(userLoggedIn){
    return <Redirect to='my/entries' />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand='block' onClick={onLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
