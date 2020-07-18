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
  //Random Number Gen Logic between 1 to 9 for DP
  let randomProfile = Math.floor(Math.random() * 9) + 1;
  const db = fire.firestore();
  //Firebase Authentication Signup
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("user created");
      let user = firebase.auth().currentUser;
      user
        .updateProfile({
          photoURL: randomProfile.toString(),
        })
        .then(() => {
          successFn(firebase.auth().currentUser);
        })
        .catch(() => {
          console.log("Error Updating Profile Pic");
        });
      // Pushing to Firestore
      db.collection("users")
        .doc(user.uid)
        .set({
          fullName: "",
          address: "",
          email: user.email,
          profilePic: randomProfile.toString(),
        })
        .then(() => {
          console.log("Pushed to Firestore");
        })
        .catch((er) => console.log(er));
    })
    .catch(function (error) {
      console.log(error);
      errorFn(error);
    });
};
