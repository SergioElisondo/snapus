import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonButtons, IonBackButton } from '@ionic/react';
import { useParams } from 'react-router';
// import { entries } from '../data'
import { firestore } from '../firebase'
import { Entry, toEntry } from '../models'


interface RouteParams {
  id: string;
}
const EntryPage: React.FC = () => {
  const [entry, setEntry]  = useState<Entry>()
  const { id } = useParams<RouteParams>()
  // const entry = entries.find((entry) => entry.id === id)
  // if(!entry){
  //   throw new Error(`No Such Entry: ${id}`)
  // }
  useEffect(() => {
    const entryRef = firestore.collection('entries').doc(id);
    entryRef.get().then((doc) => setEntry(toEntry(doc)))
  }, [id]) // if id changes, we need to fecth a different doc from firestore, this effect depends on it

  // <IonTitle>{entry?.title}</IonTitle> optional chaining operator, if entry is defined, then use its title, otherwise expression is undefined
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
              <IonBackButton />
          </IonButtons>
          <IonTitle>{entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {entry?.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
