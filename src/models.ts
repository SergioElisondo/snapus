export interface Entry {
  id: string;
  date: string;
  title: string;
  description: string;
}

export function toEntry(doc): Entry { // take firestore doc and turn it into an Entry
  return {id: doc.id, ...doc.data()};
}
