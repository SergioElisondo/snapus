import { IonContent, IonPage } from '@ionic/react';

import './NotFoundPage.css'

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className='not-found-main-box'>
          <h2 className='not-found-title'>
            Whoops... Something went wrong!
          </h2>
          <p className='not-found-paragraph'>
            If error continues, contact customer support.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
