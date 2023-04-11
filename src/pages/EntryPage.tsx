import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonButtons, IonBackButton, IonIcon } from '@ionic/react';
import { useParams } from 'react-router';
// import { entries } from '../data'
import { firestore } from '../firebase'
import { Entry, toEntry } from '../models'
import { useAuth } from '../auth';
import { trash as trashIcon } from 'ionicons/icons'

import { useHistory } from 'react-router';
import { formatDate } from '../date';


interface RouteParams {
  id: string;
}
const EntryPageWithRouter: React.FC = () => {
  const { userId } = useAuth()
  const [entry, setEntry]  = useState<Entry>()
  const { id } = useParams<RouteParams>()
  const history = useHistory()
  // const entry = entries.find((entry) => entry.id === id)
  // if(!entry){
  //   throw new Error(`No Such Entry: ${id}`)
  // }
  useEffect(() => {
    const entryRef = firestore.collection('users').doc(userId).collection('entries').doc(id)
    entryRef.get().then((doc) => setEntry(toEntry(doc)))
  }, [userId, id]) // if id changes, we need to fecth a different doc from firestore, this effect depends on it

  // <IonTitle>{entry?.title}</IonTitle> optional chaining operator, if entry is defined, then use its title, otherwise expression is undefined

  const handleDelete = async () => {
    const entryRef = firestore.collection('users').doc(userId).collection('entries').doc(id)
    entryRef.delete()
    history.goBack()
  }

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonBackButton />
            </IonButtons>
            <IonTitle>{formatDate(entry?.date)}</IonTitle>
            <IonButtons slot='end'>
              <IonButtons onClick={handleDelete}>
                <IonIcon icon={trashIcon} slot='icon-only'></IonIcon>
              </IonButtons>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>{entry?.title}</h2>
          <p>{entry?.description}</p>
        </IonContent>
      </IonPage>
  );
};

export default EntryPageWithRouter;
