import fire from "./fire";

//Add new transaction
export const addVasooli = (
  email,
  { to, amount, category, date, desc, status },
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
    status,
  };
  const db = fire.firestore();
  db.collection("vasooli")
    .add(obj)
    .then((res) => successFn(res))
    .catch((err) => errorFn(err));
};

//Get Vasooli's by Filter
export const getVasooliByFilter = (email, filter, successFn, errorFn) => {
  //email : Logged in USER email
  const db = fire.firestore();
  //Setting if else as per filter
  if (filter === "PAY") {
    db.collection("vasooli")
      .where("to", "==", email)
      .get()
      .then((res) => successFn(res))
      .catch((err) => errorFn(err));
  } else if (filter === "ASK") {
    db.collection("vasooli")
      .where("from", "==", email)
      .get()
      .then((res) => successFn(res))
      .catch((err) => errorFn(err));
  } else {
    let Arr = [];
    db.collection("vasooli")
      .where("from", "==", email)
      .get()
      .then((res1) => {
        res1.forEach((item) => {
          if (item.exists) Arr.push(item.data());
        });
        db.collection("vasooli")
          .where("to", "==", email)
          .get()
          .then((res2) => {
            res2.forEach((item) => {
              if (item.exists) Arr.push(item.data());
            });
            //console.log(Arr);
            successFn(Arr);
          })
          .catch((err) => errorFn(err));
      })
      .catch((err) => errorFn(err));
  }
};

//Add new transaction
export const updateVasooliStatus = (id, { status }, successFn, errorFn) => {
  let obj = {
    status,
  };
  const db = fire.firestore();
  //  console.log(id);
  db.collection("vasooli")
    .doc(id)
    .set(obj, {
      merge: true,
    })
    .then((res) => successFn(res))
    .catch((err) => errorFn(err));
};
