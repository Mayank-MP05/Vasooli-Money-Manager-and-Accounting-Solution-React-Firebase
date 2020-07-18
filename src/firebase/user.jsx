import fire from "./fire";
const firebase = fire;
export const FBlogin = (email, password) => {
  let res = undefined,
    err = undefined;
  return fire.auth().signInWithEmailAndPassword(email, password);
  /*.then(() => {
      console.log("User Logged In");
      res = firebase.auth().currentUser;
      return res;
    })
    .catch(function (error) {
      console.log(error);
      err = error;
      return err;
    })
    .finally(() => {
      return { res, err };
    });*/
};

export const FBlogout = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("User Logged Out");
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const FBsignup = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("user created");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error);
    });
};
