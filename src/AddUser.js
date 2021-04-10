import React, { useState, useEffect } from "react";

export default function AddUser(props) {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {
    console.log(props);
    if (props.isEdit) {
      setfname(props.user.first_name);
      setlname(props.user.last_name);
      setemail(props.user.email);
    }
  }, []);

  const handleSubmit = async () => {
    const res = await fetch(
      `https://reqres.in/api/users${props.isEdit ? `/${props.user.id}` : ""}`,
      {
        method: `${props.isEdit ? "put" : "post"}`,
        body: JSON.stringify({
          first_name: fname,
          last_name: lname,
          email: email,
        }),
      }
    );
    const data = await res.json();
  };

  return (
    <div>
      <button
        style={{ marginBottom: "20px" }}
        onClick={() => props.handleAddUser(false)}
      >
        Go back to Search page
      </button>

      <div>
        <label>
          First Name:
          <input
            type="text"
            name="fname"
            value={fname}
            onChange={(e) => setfname(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lname"
            value={lname}
            onChange={(e) => setlname(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>
          {props.isEdit ? "Update User" : "AddUser"}
        </button>
      </div>
    </div>
  );
}
