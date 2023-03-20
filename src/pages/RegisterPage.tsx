import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonLoading, IonIcon } from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import { eye, eyeOff } from 'ionicons/icons';

// css file
import './RegisterPage.css'

// interface Props {
//   onLogin: () => void;
// }

//const LoginPage: React.FC<Props> = ({ onLogin }) => { ...
const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState({error: false, loading: false})
  const [userError, setUserError] = useState('')

  const handleRegister = async () => {
    try {
      setStatus({loading: true, error: false})
      const credential = await auth.createUserWithEmailAndPassword(email, password)
      // setStatus({loading: false, error: false})
      console.log(credential, 'credentials!')
      // onLogin()
    } catch (error) {
      setStatus({loading: false, error: true})
      console.log(error)
      console.log(error.message)
      setUserError(error.message)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  if(loggedIn){
    return <Redirect to='my/entries' />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList>
        <IonItem>
          <IonLabel style={{ fontFamily: 'Montserrat', fontWeight: 600, color: "#424242" }} className='login-email-title' position='stacked'>Email</IonLabel>
          <IonInput className='login-email-input' type='email' value={email} onIonChange={(event) => {setEmail(event.detail.value)}}/>
        </IonItem>
        <IonItem>
          <IonLabel style={{ fontFamily: 'Montserrat', fontWeight: 600, color: "#424242" }} position='stacked'>Password</IonLabel>
          <IonInput className='login-password-input' type={showPassword ? 'text' : 'password'} value={password} onIonChange={(event) => {setPassword(event.detail.value); setStatus({loading: false, error: false})}} />
          {/* {clearInput={true} add this to IonInput for users to quickly remove input value} */}
          <IonIcon slot="end" icon={showPassword ? eyeOff : eye} onClick={togglePasswordVisibility} />
        </IonItem>
      </IonList>
      { /* error && <IonText color={'danger'}>Invalid Credentials</IonText>} {Only if the error is true, otherwise no action take} */}
      {status.error ? <IonText className='invalid-credentials-login' color={'danger'}>Registration Failed... {userError}</IonText> : null }
      <IonContent className="ion-padding">
        <IonButton expand='block' onClick={handleRegister}>Create Account</IonButton>
        <IonButton expand='block' fill="clear" routerLink='/login'>Already Have an Account?</IonButton>
        <IonLoading isOpen={status.loading} message={'Registering... Hang Tight!'}/>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
