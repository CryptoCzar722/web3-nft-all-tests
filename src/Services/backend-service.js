import firebase from "../components/firebase";
import { doc, getDocFromCache } from "firebase/firestore";

const db = firebase.collection("whitelist");
const dbMint = firebase.collection("mint");

class BackendService {
  getAll() {
    return db;
  }
  async checkAddress(address){
    let items = [];
    db.where('account', '==',address).onSnapshot((querySnap)=>{
     querySnap.forEach((doc) => {
      //console.log("doc.data() :: ",doc.data()["account"])
      items.push(doc.data()["account"]);
    });
  })
  return items;
}

  async checkMint(address){
    let items = [];
    dbMint.where('address', '==',address).onSnapshot((querySnap)=>{
     querySnap.forEach((doc) => {
      console.log("checkMint -> doc.data() :: ",doc.data()["address"])
      items.push(doc.data()["address"]);
    });
    })
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