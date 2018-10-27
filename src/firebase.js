import * as firebase from 'firebase'
import { firebaseConfig } from './keys'

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export {
  db,
}