import fire from "./fire";

//Add new transaction
export const addVasooli = (
  email,
  { to, amount, category, date, desc },
  successFn,
  errorFn
) => {
  let obj = {
    from: email,
    to,
    amount,
    category,
    date,
    desc,
  };
  const db = fire.firestore();
  db.collection("vasooli")
    .add(obj)
    .then((res) => successFn(res))
    .catch((err) => errorFn(err));
};

