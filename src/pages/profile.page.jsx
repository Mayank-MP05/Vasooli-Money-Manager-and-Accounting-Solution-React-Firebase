import React, { Fragment, useState, useEffect } from "react";
import { imgArr } from "./../data/userimages";
import fire from "./../firebase/fire";
import { getUserData, updateUserData } from "./../firebase/user";
import Spinner from "react-bootstrap/Spinner";

export default function ProfileV() {
  const [user, setuser] = useState({
    email: "",
    fullName: "",
    profilePic: "",
    address: "",
  });
  const [intialdata, setintialdata] = useState({});
  const [uid, setuid] = useState("");
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  const [errorBody, seterrorBody] = useState({});

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
    //console.log(user);
  };

  const sucessAlert = () => (
    <div className='alert alert-success'>
      Profile updated ! Loading will take time
    </div>
  );

  const errorAlert = () => (
    <div className='alert alert-danger'>
      {errorBody.message
        ? errorBody.message
        : "Something Went Wrong Please Try Again !"}
    </div>
  );

  const resetForm = () => {
    setuser(intialdata);
  };

  const updateData = () => {
    fire.auth().currentUser.updateProfile({
      photoURL: user.profilePic,
    });

    updateUserData(
      uid,
      user,
      () => {
        setsuccess(true);
      },
      (err) => {
        seterrorBody(err);
        seterror(true);
      }
    );
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
        setuid(user.uid);
        getUserData(
          user.uid,
          (data) => {
            setintialdata(data);
            setuser(data);
          },
          (err) => seterror(err)
        );
      } else {
        console.log("No Auth Changed");
      }
    });
  }, []);
  //To Stop displaying the popup after 3 sec
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        seterror(false);
      }, 3000);
    }
  }, [error]);
  //To Stop displaying the popup after 3 sec
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setsuccess(false);
      }, 3000);
    }
  }, [success]);

  return (
    <Fragment>
      {success && sucessAlert()}
      {error && errorAlert()}
      {!user.email ? (
        <div className='w-100 d-flex justify-content-center'>
          <Spinner
            animation='border'
            role='status'
            style={{ width: "70px", height: "70px", margin: "auto" }}>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Fragment>
          <div className='row p-2'>
            {/* Profile pic Section */}
            <div className='col-md-4 d-flex flex-column'>
              <img
                src={imgArr[parseInt(user.profilePic) - 1]}
                alt='Profile Picture of the User'
                className='w-50 m-auto'
              />
              <div className='form-group'>
                <label>Selct the Profile Pic</label>
                <select
                  className='form-control'
                  value={user.profilePic}
                  name='profilePic'
                  onChange={handleChange}>
                  <option value='1'>Man X</option>
                  <option value='2'>Man X</option>
                  <option value='3'>Man X</option>
                  <option value='4'>Man X</option>
                  <option value='5'>Man X</option>
                  <option value='6'>Woman Y</option>
                  <option value='7'>Woman Y</option>
                  <option value='8'>Woman Y</option>
                  <option value='9'>Woman Y</option>
                </select>
              </div>
            </div>
            {/* Card Details Section */}
            <div className='col-md-7'>
              <div className='form-group row'>
                <label className='col-sm-2 col-form-label'>Email</label>
                <div className='col-sm-10'>
                  <input
                    type='email'
                    disabled
                    className='form-control-plaintext'
                    value={user.email}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-sm-2 col-form-label'>Name </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    className='form-control'
                    value={user.fullName}
                    name='fullName'
                    onChange={handleChange}
                    placeholder='John Doe'
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-sm-2 col-form-label'>Address </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    className='form-control'
                    value={user.address}
                    name='address'
                    onChange={handleChange}
                    placeholder='780 Street John Doe house , Dist-Jalgaon,MH'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row text-center justify-content-center'>
            <button className='btn btn-danger m-1' onClick={resetForm}>
              Reset
            </button>
            <button className='btn btn-success m-1' onClick={updateData}>
              Save Changes
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
