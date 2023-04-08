import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonList, IonItem, IonFab, IonFabButton, IonIcon, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth';
// import { entries } from "../data"
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models'
// import { add as addIcon } from 'ionicons/icons'

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


function formatDate(isoString){
  return new Date(isoString).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
}

const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([])
  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries') // was  'entries'
    // entriesRef.get().then(({docs}) => setEntries(docs.map(toEntry)))
    return entriesRef.onSnapshot(({docs}) => setEntries(docs.map(toEntry)))
    // onSnapshot can be used to build a chat
  }, [userId]);
  console.log('[HomePage] render entries: ', entries)
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
            <IonItem button key={entry.id} routerLink={`/my/entries/view/${entry.id}`}>
              <IonLabel>
                <h2>{formatDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
        <IonFab vertical='bottom' horizontal='end'>
          <IonFabButton routerLink='/my/entries/add'>
            {/* <IonIcon icon='addIcon'/> */}
            {/* <IonIcon icon={addIcon} slot='icon-only'></IonIcon> */}
            <h2>+</h2>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
