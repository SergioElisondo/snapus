import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { firestore, storage } from '../firebase';
import { useAuth } from '../auth';
import { useHistory } from 'react-router';

import './AddEntryPage.css'


async function savePicture(blobUrl: string, userId: string): Promise<string> {
  const pictureRef = storage
    .ref(`/user/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log('saved picture:', url);
  return url; // Return the download URL
}

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth()
  const history = useHistory()
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png')
  const [description, setDescription] = useState('')
  const fileInputRef = useRef<HTMLInputElement>()

  useEffect(() => () => {
    if(pictureUrl.startsWith('blob:')){
      URL.revokeObjectURL(pictureUrl);
      console.log('revoked URL: ', pictureUrl)
    }
  }, [pictureUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('files: ', event.target.files)
    if(event.target.files.length > 0){
      const file = event.target.files.item(0)
      const pictureUrl = URL.createObjectURL(file)
      console.log('created URL: ', pictureUrl)
      setPictureUrl(pictureUrl)
    }
  }




  const handleSave = async () => {
  const entriesRef = firestore
    .collection('users')
    .doc(userId)
    .collection('entries');
  let entryData = { date, title, description, pictureUrl };
  if (pictureUrl.startsWith('blob:')) {
    const downloadUrl = await savePicture(pictureUrl, userId);
    entryData = { ...entryData, pictureUrl: downloadUrl };
  }
  const entryRef = entriesRef.add(entryData);
  console.log(entryRef);
  history.goBack();
};

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
              <IonLabel position='stacked'>Data</IonLabel>
              <IonInput type='date' value={date} onIonChange={(event) => setDate(event.detail.value)}/>
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Title</IonLabel>
              <IonInput value={title} onIonChange={(event) => setTitle(event.detail.value)}/>
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Picture</IonLabel><br />
              <input type='file' accept='image/*' hidden ref={fileInputRef}
              onChange={handleFileChange}
              />
              <img src={pictureUrl} alt='placeholder asset'
              onClick={() => fileInputRef.current.click()}
              />
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
