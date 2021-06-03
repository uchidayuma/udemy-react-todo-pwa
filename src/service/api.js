import firebase from "firebase";
import { db } from "./firebase"

export const initGet = async(uid) => {
  const todo = await db.collection("todo")
  .orderBy("createdAt", "desc")
  .where("uid", "==", uid);

  return todo.get().then((snapShot) => {
    let todos = [];
    snapShot.forEach((doc) => {
      todos.push({
        id: doc.id,
        content: doc.data().content,
        isComplete: doc.data().isComplete,
      });
    });
    return todos;
  });
}

export const addTodo = (content, uid) => {
  db.collection("todo").add({
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export const todoDelete = (id) => {
  db.collection("todo").doc(id).delete();
}

export const toggleComple = async ( id ) => {
  const todo = await db.collection("todo").doc(id).get();
  return db.collection("todo").doc(id).update({
    // もしチェックされたTOdoが未完了 →  isCompleteをtrue
    // もしチェックされたTOdoが完了 →  isCompleteをfalse
    // if(todo.data().isComplete){
    //   false
    // }else{
    //   true
    // }
      isComplete: todo.data().isComplete ? false : true,
    });
}