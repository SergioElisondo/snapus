import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonButton } from '@ionic/react';
// import { useContext } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth'

interface Props {
  // userLoggedIn: boolean;
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const { loggedIn } = useAuth()
  if(loggedIn){
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
