import firebase from "../components/firebase";
import { doc, getDocFromCache } from "firebase/firestore";

const db = firebase.collection("whitelist");

class BackendService {
  getAll() {
    return db;
  }
  async checkAddress(address){
    let items = [];
    await db.where('account', '==',address).onSnapshot((querySnap)=>{
     querySnap.forEach((doc) => {
      console.log("doc.data() :: ",doc.data()["account"])
      items.push(doc.data()["account"]);
    });
  })//.limitToFirst(1);
  //console.log("typeof(items) :: ",items)
  return items;
  }

  create(tutorial) {
    return db.add(tutorial);
  }
  update(id, value) {
    return db.doc(id).update(value);
  }
  delete(id) {
    return db.doc(id).delete();
  }
}
export default new BackendService();