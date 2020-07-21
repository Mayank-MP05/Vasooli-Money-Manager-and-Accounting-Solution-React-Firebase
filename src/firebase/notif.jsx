import fire from "./fire";

export const getNotif = (email, successFn, errorFn) => {
  const db = fire.firestore();
  db.collection("notif")
    .where("user", "==", email)
    .get()
    .then((res1) => {
      db.collection("notif")
        .where("private", "==", "false")
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
