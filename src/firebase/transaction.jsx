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
export const getByFilter = (filter) => {
  
};
