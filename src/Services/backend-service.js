import firebase from "../components/firebase";
import { doc, getDocFromCache } from "firebase/firestore";

const db = firebase.collection("whitelist");
const dbMint = firebase.collection("mint");
const dbForsale = firebase.collection("forsale");

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

  checkForsale(){
    let items = [];
    dbForsale.where('address', '!=',"").onSnapshot((querySnap)=>{
      //return querySnap//.exists;
      querySnap.forEach((doc) => {
      //console.log("checkForsale -> doc.data() :: ",doc.data()["address"])
      console.log("doc.data() :: ",doc.data());
      items.push([doc.data()]);
    });
    })
  return items;
  }

  async checkIdForsale(id){
    let exists = false; //[];
    let finished = false;
    dbForsale.where('nft_id', '==',id).onSnapshot((querySnap)=>{
      //console.log("querySnap :: ", querySnap.doc);
      querySnap.forEach((doc) => {
      if(doc.data()['nft_id'] === id){
        exists = true;
        console.log(exists,"ID :: ",doc.data()['nft_id']);
        //return true;
        
        //items.push([doc.data()]);
      }
    });
    console.log(exists," exists :: ");
    finished = true;
    })//.then(out =>{
      return exists;
    //})
    
    //while(!finished){console.log(" finsihed :: ", finished);}
  }
  async checkId(id){
    var docRef = firebase.collection('forsale').doc('nft_id');
    console.log("Document ID:", id);
    docRef.get().then(doc => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
      console.log("Error getting document:", error);
            });
  }

  create(tutorial) {
    return db.add(tutorial);
  }

  async createListing(tutorial) {
    return dbForsale.add(tutorial);
  }
  update(id, value) {
    return db.doc(id).update(value);
  }
  delete(id) {
    return db.doc(id).delete();
  }
}
export default new BackendService();