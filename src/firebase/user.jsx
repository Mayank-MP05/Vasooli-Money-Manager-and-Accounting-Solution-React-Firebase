import fire from "./fire";
const firebase = fire;

//Function to Login the Exsiting user
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

//Function to Logout User
export const FBlogout = (successFn, errorFn) => {
  firebase.auth().signOut().then(successFn).catch(errorFn);
};

//Function to Create New User
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

//Function to get all user data
export const getUserData = (uid, successFn, errorFn) => {
  const db = fire.firestore();
  db.collection("users")
    .doc(uid)
    .get()
    .then((res) => {
      successFn(res.data());
    })
    .catch((err) => errorFn(err));
};

//Updating Document in FB Firestore
export const updateUserData = (
  uid,
  { email, fullName, profilePic, address },
  successFn,
  errorFn
) => {
  const db = fire.firestore();
  db.collection("users")
    .doc(uid)
    .set(
      {
        email,
        fullName,
        profilePic,
        address,
      },
      { merge: true }
    )
    .then(successFn)
    .catch((err) => errorFn(err));
};

//Get Current User
export const getCurrentUser = () => {
  fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      return user;
    } else {
      console.log("NO user AUth Change");
    }
  });
};
