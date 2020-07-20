import fire from "./fire";

//Add new transaction
export const addTrans = (
  uid,
  { type, amount, category, date, desc },
  successFn,
  errorFn
) => {
  let obj = {
    user: uid,
    type,
    amount,
    category,
    date,
    desc,
  };
  const db = fire.firestore();
  db.collection("transactions")
    .add(obj)
    .then((res) => successFn(res))
    .catch((err) => errorFn(err));
};

//Get the Cards by Filter - "INC","EXP"
export const getTransactionByFilter = (uid, filter, successFn, errorFn) => {
  const db = fire.firestore();
  //Setting if else as per filter
  if (filter === "INC") {
    //Defailt "ALL" Case
    db.collection("transactions")
      .where("user", "==", uid)

      .where("type", "==", "INC")
      .get()
      .then((res) => successFn(res))
      .catch((err) => errorFn(err));
  } else if (filter === "EXP") {
    //Defailt "ALL" Case
    db.collection("transactions")
      .where("user", "==", uid)

      .where("type", "==", "EXP")
      .get()
      .then((res) => successFn(res))
      .catch((err) => errorFn(err));
  } else {
    //Defailt "ALL" Case
    db.collection("transactions")
      .where("user", "==", uid)

      .get()
      .then((res) => successFn(res))
      .catch((err) => errorFn(err));
  }
};
