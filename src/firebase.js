import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseConfig } from './keys'

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

export {
  db,
}