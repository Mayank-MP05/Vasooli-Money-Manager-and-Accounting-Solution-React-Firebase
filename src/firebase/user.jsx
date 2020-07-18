import fire from "./fire";
const firebase = fire;
export const FBlogin = ({ email, password }, successFn, errorFn) => {
  let res;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      //console.log("User Logged In");
      res = firebase.auth().currentUser;
      successFn(res);
    })
    .catch(function (error) {
      errorFn(error);
    });
};

export const FBlogout = (successFn, errorFn) => {
  firebase.auth().signOut().then(successFn).catch(errorFn);
};

export const FBsignup = ({ email, password }, successFn, errorFn) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("user created");
      successFn(firebase.auth().currentUser);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error);
      errorFn(error);
    });
};
