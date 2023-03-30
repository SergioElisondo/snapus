import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonList, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth';
// import { entries } from "../data"
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models'


// original code

// useEffect(() => {
//     const entriesRef = firestore.collection('entries')
//     // not using async/await here since it's tricky with useEffect
//     entriesRef.get().then((snapshot) => {
//       // snapshot.docs.forEach((doc) => console.log(doc.id, doc.data())) // DATA returns! not seen in the object returned in console log...
//       const entries = snapshot.docs.map((doc) => ({
//         // id: doc.id,
//         // ...doc.data(),
//       })); // wrap curlys in parenthesis to it knows it's an object expression, and not as function body
//       console.log('entries: ', entries)
//       console.log('snapshot: ', snapshot)
//       setEntries(entries)
//     })
//   }, [])


const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([])
  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries') // was  'entries'
    entriesRef.get().then(({docs}) => setEntries(docs.map(toEntry)))
  }, [userId]);
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
            <IonItem button key={entry.id} routerLink={`/my/entries/view/${entry.id}`}>{entry.title}
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
