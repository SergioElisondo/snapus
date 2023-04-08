import React, { useState } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { firestore } from '../firebase';
import { useAuth } from '../auth';
import { useHistory } from 'react-router';

// import { entries } from '../data'

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSave = async () => {
    // console.log("This is now saved: ", {title, description})
    const entriesRef = firestore.collection('users').doc(userId)
    .collection('entries')
    const entryData = {title, description}
    const entryRef = entriesRef.add(entryData)
    console.log(entryRef)
    history.goBack()
    // console.log('Saved: ', (await entryRef).id)
  }

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
                <IonBackButton />
            </IonButtons >
            <IonTitle>Add Entry</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonLabel position='stacked'>Title</IonLabel>
              <IonInput value={title} onIonChange={(event) => setTitle(event.detail.value)}/>
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Descrition</IonLabel>
              <IonInput value={description} onIonChange={(event) => setDescription(event.detail.value)}/>
            </IonItem>
            <IonButton expand='block' onClick={handleSave}>Save</IonButton>
          </IonList>
        </IonContent>
      </IonPage>
  );
};

export default AddEntryPage;
