import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import AddCollection from "./components/AddCollection";
import Collection from './components/Collection';
import HeadTag from "./components/HeadTag";
import Nav from './components/Nav';
import { db } from '../firebase';

export default function Home() {

  const collectionRef = collection(db, 'collection');
  const q = query(collectionRef, orderBy('created'));
  const [collectionsSnapshot] = useCollection(q);

  const length = collectionsSnapshot?.docs?.length || 0;

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <HeadTag />
      <Nav />
      <div className="max-w-[1200px] px-5 py-6 mx-auto grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
        {collectionsSnapshot?.docs.map(collection =>
          <Collection
            key={collection.id}
            id={collection.id}
            name={collection.data().name}
            created={collection.data().created}
          />
        )}
        {length < 100 && <AddCollection />}
      </div>
    </div>
  )
}
