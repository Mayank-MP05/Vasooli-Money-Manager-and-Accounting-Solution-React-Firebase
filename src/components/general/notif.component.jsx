import React, { useState, useEffect } from "react";
export default function Notif({ data: { content, type, timestamp } }) {
  const [classNameX, setclassNameX] = useState("");
  const [icon, seticon] = useState("fa fa-info-circle");
  useEffect(() => {
    if (type === "INFO") {
      setclassNameX("alert-info");
    } else {
      setclassNameX("alert-warning");
      seticon("fa fa-credit-card");
    }
  }, []);
  return (
    <div className={"alert p-1 m-2 " + classNameX}>
      <i className={`${icon} p-0 m-1`}></i>
      <b>
        {type}
        {" : "}
      </b>
      {content}

      {timestamp ? (
        <small className='pull-right'>
          {timestamp.toDate().toLocaleDateString()}
        </small>
      ) : (
        ""
      )}
    </div>
  );
}
