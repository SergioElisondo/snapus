import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonList, IonItem } from '@ionic/react';
import { entries } from "../data"

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) =>
            <IonItem button key={entry.id} routerLink={`/my/entries/${entry.id}`}>{entry.title}
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
