import React, { useState, useEffect } from "react";
import { getNotif } from "./../firebase/notif";
import { useLocation } from "react-router-dom";
import fire from "./../firebase/fire";
import Notif from "./../components/general/notif.component";
export default function Notifpage() {
  let loc = useLocation();
  const [NotifArr, setNotifArr] = useState([]);
  const [user, setuser] = useState({});

  useEffect(() => {
    console.log("mounted profile");
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("AUTH CHanged");
        setuser(user);
        getNotif(
          user.email,
          (res) => {
            console.log(res);
            setNotifArr(res);
          },
          (err) => console.log(err)
        );
      } else {
        console.log("NO user AUth Change");
      }
    });
    return () => {
      console.log("unmounted profile");
    };
  }, [loc.pathname]);

  return (
    <div className='container p-1 m-2' style={{ marginBottom: "40px" }}>
      {NotifArr.map((notif, index) => (
        <Notif key={index} data={notif} />
      ))}
    </div>
  );
}

/*
Notif Object Structure
{
    private : true/false,
    user : user.email
    content : 
    type : "INFO","PAYMENT","APPROVAL"
    readStatus : true/false
}

if private is false 
    no user
    no readStatus
*/
