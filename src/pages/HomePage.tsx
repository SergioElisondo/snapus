import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonList, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';
// import { entries } from "../data"
import { firestore } from '../firebase';

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState([])
  useEffect(() => {
    const entriesRef = firestore.collection('entries')
    // not using async/await here since it's tricky with useEffect
    entriesRef.get().then((snapshot) => {
      // snapshot.docs.forEach((doc) => console.log(doc.id, doc.data())) // DATA returns! not seen in the object returned in console log...
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // wrap curlys in parenthesis to it knows it's an object expression, and not as function body
      console.log('entries: ', entries)
      console.log('snapshot: ', snapshot)
      setEntries(entries)
    })
  }, [])
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
