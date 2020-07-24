import fire from "./fire";

//Get All Notification for User
export const getNotif = (email, successFn, errorFn) => {
  const db = fire.firestore();
  //console.log(email);
  db.collection("notif")
    .where("private", "==", true)
    .where("user", "==", email)
    .orderBy("timestamp", "desc")
    .get()
    .then((res1) => {
      db.collection("notif")
        .where("private", "==", false)
        .orderBy("timestamp", "desc")
        .get()
        .then((res2) => {
          let Arr = [];
          res1.forEach((doc1) => {
            Arr.push({ ...doc1.data(), ["id"]: doc1.id });
          });
          console.log(Arr);

          res2.forEach((doc2) => {
            Arr.push(doc2.data());
          });
          console.log(Arr);

          successFn(Arr);
        })
        .catch((err) => errorFn(err));
    })
    .catch((err) => errorFn(err));
};
